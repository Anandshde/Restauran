"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { OrderCard } from "@/components/OrderCard";
import { motion, AnimatePresence } from "framer-motion";
import { IOrder } from "@/types";
import { useOrders } from "@/hooks/useOrders";
import { OrderCardSkeletonGrid } from "@/components/OrderCardSkeleton";
import { Utensils, Clock, Check } from "lucide-react";

const statusIcons = {
  pending: Clock,
  preparing: Utensils,
  served: Check,
};

export default function KitchenPage() {
  const socket = useSocket();
  const { orders, mutate, isLoading } = useOrders();
  const [activeOrders, setActiveOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    if (orders) {
      setActiveOrders(
        orders.filter((order: { status: string }) =>
          ["pending", "preparing"].includes(order.status)
        )
      );
    }
  }, [orders]);

  useEffect(() => {
    if (!socket) return;

    socket.on("orderUpdated", () => {
      mutate();
    });

    socket.on("newOrder", () => {
      mutate();
    });

    return () => {
      socket.off("orderUpdated");
      socket.off("newOrder");
    };
  }, [socket, mutate]);

  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      mutate();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Kitchen Display</h1>
          <p className="text-gray-500 mt-2">
            View and manage active orders in real-time
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <OrderCardSkeletonGrid />
          ) : (
            <AnimatePresence>
              {activeOrders.map((order) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <OrderCard
                    order={order}
                    onStatusUpdate={handleStatusUpdate}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {!isLoading && activeOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              No Active Orders
            </h3>
            <p className="text-gray-500 mt-2">
              New orders will appear here automatically
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
