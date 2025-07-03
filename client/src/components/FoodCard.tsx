"use client";

import { FoodItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function FoodCard({ food }: { food: FoodItem }) {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={food.image} alt={food.name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{food.name}</h3>
        <p className="text-sm text-muted-foreground">
          ₮{food.price.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => addToCart(food)} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
