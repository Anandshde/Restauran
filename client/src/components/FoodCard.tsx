"use client";

import { FoodItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, Minus, Flame, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export function FoodCard({ food }: { food: FoodItem }) {
  const { addToCart, items, updateQuantity } = useCart();
  const { toast } = useToast();
  const cartItem = items.find((item) => item._id === food._id);

  const handleAddToCart = () => {
    addToCart(food);
    toast({
      title: "Added to cart",
      description: `${food.name} has been added to your cart`,
    });
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(food._id, newQuantity);
    if (newQuantity === 0) {
      toast({
        title: "Removed from cart",
        description: `${food.name} has been removed from your cart`,
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden group">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={food.image}
            alt={food.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {food.isSpicy && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Badge className="bg-red-500 text-white border-none">
                  <Flame className="h-3 w-3 mr-1" />
                  Spicy
                </Badge>
              </motion.div>
            )}
            {food.prepTime && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge variant="secondary" className="bg-white/90 border-none">
                  <Clock className="h-3 w-3 mr-1" />
                  {food.prepTime} min
                </Badge>
              </motion.div>
            )}
            {food.rating && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="bg-yellow-400 text-yellow-900 border-none">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {food.rating}
                </Badge>
              </motion.div>
            )}
          </div>
        </div>
        <motion.div
          className="p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{food.name}</h3>
              {food.description && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {food.description}
                </p>
              )}
            </div>
            <motion.p
              className="font-medium text-orange-500"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              ₮{food.price.toLocaleString()}
            </motion.p>
          </div>

          <div className="mt-4">
            <AnimatePresence mode="wait">
              {cartItem ? (
                <motion.div
                  key="quantity"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-between"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (cartItem.quantity === 1) {
                        handleUpdateQuantity(0);
                      } else {
                        handleUpdateQuantity(cartItem.quantity - 1);
                      }
                    }}
                    className="h-8 w-8"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-medium text-gray-900">
                    {cartItem.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="add"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}
