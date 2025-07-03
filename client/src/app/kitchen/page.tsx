"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { OrderCard } from "@/components/OrderCard";
import { IOrder } from "@/types";

export default function KitchenPage() {
  const { socket, isConnected } = useSocket();
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    // Fetch initial active orders
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/order/active`
        );
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("newOrder", (order: IOrder) => {
      setOrders((prev) => [order, ...prev]);
    });

    socket.on("orderUpdated", (updatedOrder: IOrder) => {
      setOrders((prev) =>
        prev
          .map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
          .filter((order) => order.status !== "served")
      );
    });

    return () => {
      socket.off("newOrder");
      socket.off("orderUpdated");
    };
  }, [socket]);

  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Kitchen View</h1>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-sm text-muted-foreground">
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        {orders
          .filter((order) => order.status !== "served")
          .map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
      </div>
    </main>
  );
}
