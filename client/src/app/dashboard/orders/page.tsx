"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/useOrders";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const { orders, isLoading, error, mutate } = useOrders();

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

      if (response.ok) {
        mutate();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Table</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order._id}>
              <TableCell>Table {order.tableNumber}</TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.quantity}x {item.name}
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>₮{order.total.toLocaleString()}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "served"
                      ? "default"
                      : order.status === "preparing"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={order.paid ? "success" : "destructive"}>
                  {order.paid ? "Paid" : "Unpaid"}
                </Badge>
                {order.barimt && (
                  <div className="text-xs text-gray-500 mt-1">
                    Barimt: {order.barimt.billId}
                  </div>
                )}
              </TableCell>
              <TableCell>
                {order.status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => handleStatusUpdate(order._id, "preparing")}
                  >
                    Start Preparing
                  </Button>
                )}
                {order.status === "preparing" && (
                  <Button
                    size="sm"
                    onClick={() => handleStatusUpdate(order._id, "served")}
                  >
                    Mark as Served
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
