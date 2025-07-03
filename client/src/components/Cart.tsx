"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Cart({ tableId }: { tableId: string }) {
  const { items, total, updateQuantity, clearCart } = useCart();

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tableNumber: parseInt(tableId),
            items: items.map((item) => ({
              foodId: item._id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          }),
        }
      );

      if (response.ok) {
        clearCart();
        alert("Order placed successfully!");
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      alert("Error placing order");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed bottom-4 right-4 z-50">
          Cart ({items.length}) - ₮{total.toLocaleString()}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Order</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-200px)] mt-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between py-4"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  ₮{item.price.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total:</span>
            <span>₮{total.toLocaleString()}</span>
          </div>
          <Button
            className="w-full"
            onClick={handlePlaceOrder}
            disabled={items.length === 0}
          >
            Place Order
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
