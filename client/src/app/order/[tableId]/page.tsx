"use client";

import { use } from "react";
import { useState } from "react";
import { FoodCard } from "@/components/FoodCard";
import { Cart } from "@/components/Cart";
import { CartProvider } from "@/context/CartContext";
import { useFoods } from "@/hooks/useFoods";
import { FoodCardSkeletonGrid } from "@/components/FoodCardSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Food } from "@/types";

interface TableData {
  id: string;
  name: string;
  seats: number;
}

type TablesRecord = Record<string, TableData>;

// Mock data for demo
const MOCK_TABLES: TablesRecord = {
  "1": { id: "1", name: "Table 1", seats: 4 },
  "2": { id: "2", name: "Table 2", seats: 2 },
  "3": { id: "3", name: "Table 3", seats: 6 },
  "4": { id: "4", name: "Table 4", seats: 8 },
};

const categories = ["All", "Main", "Side", "Dessert", "Drink"];

export default function OrderPage({ params }: { params: { tableId: string } }) {
  // Use React.use() to unwrap params
  const { tableId } = use(Promise.resolve(params));

  // Validate table exists (for demo)
  if (!MOCK_TABLES[tableId]) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Table Not Found
          </h1>
          <p className="text-gray-500">The requested table does not exist.</p>
        </div>
      </div>
    );
  }

  const { data: foods, isLoading } = useFoods();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFoods = foods?.filter(
    (food: Food) =>
      selectedCategory === "All" || food.category === selectedCategory
  );

  return (
    <CartProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {MOCK_TABLES[tableId].name}
          </h1>
          <p className="text-gray-500">{MOCK_TABLES[tableId].seats} Seats</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <FoodCardSkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredFoods?.map((food: Food) => (
                <motion.div
                  key={food._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <FoodCard food={food} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <Cart tableId={tableId} />
      </div>
    </CartProvider>
  );
}
