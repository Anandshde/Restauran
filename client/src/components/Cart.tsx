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
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Loader2,
  Clock,
  ChefHat,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

export function Cart({ tableId }: { tableId: string }) {
  const { items, total, updateQuantity, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { toast } = useToast();

  const estimatedTime = Math.max(items.length * 5, 15); // 5 mins per item, minimum 15 mins

  const handleQuantityUpdate = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
    if (newQuantity === 0) {
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Cart updated",
        description: "Your cart has been updated",
      });
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setIsLoading(true);
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
              notes: notes[item._id] || "",
            })),
            total,
          }),
        }
      );

      if (response.ok) {
        clearCart();
        setIsOpen(false);
        router.push(`/order/${tableId}/success`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="lg"
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-orange-500 hover:bg-orange-600 border-none text-white"
          >
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-white text-orange-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {items.length}
                </motion.span>
              )}
            </div>
          </Button>
        </motion.div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="space-y-2 pb-4 border-b">
          <SheetTitle className="text-2xl">Your Order</SheetTitle>
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-500 mb-4">Your cart is empty</p>
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Estimated preparation time: {estimatedTime} mins</span>
            </div>
          )}
        </SheetHeader>

        {items.length > 0 && (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <ul className="divide-y">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.li
                      key={item._id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="py-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 pr-4">
                          <h4 className="font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            ₮{item.price.toLocaleString()} each
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              if (item.quantity === 1) {
                                handleQuantityUpdate(item._id, 0);
                              } else {
                                handleQuantityUpdate(
                                  item._id,
                                  item.quantity - 1
                                );
                              }
                            }}
                            className="h-8 w-8"
                          >
                            {item.quantity === 1 ? (
                              <Trash2 className="h-4 w-4 text-red-500" />
                            ) : (
                              <Minus className="h-4 w-4" />
                            )}
                          </Button>
                          <span className="w-4 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleQuantityUpdate(item._id, item.quantity + 1)
                            }
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900 text-right">
                        ₮{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <div className="mt-2">
                        <Textarea
                          placeholder="Add special instructions..."
                          value={notes[item._id] || ""}
                          onChange={(e) =>
                            setNotes((prev) => ({
                              ...prev,
                              [item._id]: e.target.value,
                            }))
                          }
                          className="text-sm resize-none"
                          rows={2}
                        />
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </ScrollArea>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4 border-t space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-gray-900">
                  Total
                </span>
                <motion.span
                  key={total}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-lg font-bold text-orange-500"
                >
                  ₮{total.toLocaleString()}
                </motion.span>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <ChefHat className="mr-2 h-4 w-4" />
                      Place Order
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    clearCart();
                    toast({
                      title: "Cart cleared",
                      description: "All items have been removed from your cart",
                    });
                  }}
                  disabled={isLoading}
                  className="w-full"
                >
                  Clear Cart
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
