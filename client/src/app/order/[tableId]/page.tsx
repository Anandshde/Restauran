import { FoodItem } from "@/types";
import { FoodCard } from "@/components/FoodCard";
import { Cart } from "@/components/Cart";
import { CartProvider } from "@/context/CartContext";

async function getFoodItems(): Promise<FoodItem[]> {
  const res = await fetch(`${process.env.API_URL}/api/food`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch food items");
  }

  return res.json();
}

export default async function MenuPage({
  params: { tableId },
}: {
  params: { tableId: string };
}) {
  const foods = await getFoodItems();

  // Group foods by category
  const foodsByCategory = foods.reduce((acc, food) => {
    if (!acc[food.category]) {
      acc[food.category] = [];
    }
    acc[food.category].push(food);
    return acc;
  }, {} as Record<string, FoodItem[]>);

  return (
    <CartProvider>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Table {tableId} - Menu</h1>

        {Object.entries(foodsByCategory).map(([category, foods]) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          </section>
        ))}

        <Cart tableId={tableId} />
      </main>
    </CartProvider>
  );
}
