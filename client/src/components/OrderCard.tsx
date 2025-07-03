"use client";

import { IOrder } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface OrderCardProps {
  order: IOrder;
  onStatusUpdate: (orderId: string, status: string) => void;
}

export function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (status: string) => {
    setIsUpdating(true);
    try {
      await onStatusUpdate(order._id, status);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card
      className={`border-l-4 ${
        order.status === "pending"
          ? "border-l-yellow-500"
          : order.status === "preparing"
          ? "border-l-blue-500"
          : "border-l-green-500"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="font-bold">Table {order.tableNumber}</h3>
          <p className="text-sm text-muted-foreground">
            Status: {order.status}
          </p>
        </div>
        <div className="space-x-2">
          {order.status === "pending" && (
            <Button
              onClick={() => handleStatusUpdate("preparing")}
              disabled={isUpdating}
            >
              Start Preparing
            </Button>
          )}
          {order.status === "preparing" && (
            <Button
              onClick={() => handleStatusUpdate("served")}
              disabled={isUpdating}
            >
              Mark as Served
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>₮{(item.price * item.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t">
          <p className="font-bold text-right">
            Total: ₮{order.total.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
