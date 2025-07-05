"use client";

import { IOrder } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChefHat, Check, AlertCircle } from "lucide-react";
import { format } from "date-fns";

const statusIcons = {
  pending: Clock,
  preparing: ChefHat,
  served: Check,
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  preparing: "bg-blue-100 text-blue-800 border-blue-200",
  served: "bg-green-100 text-green-800 border-green-200",
};

const statusMessages = {
  pending: "Waiting for kitchen",
  preparing: "Being prepared",
  served: "Order served",
};

interface OrderCardProps {
  order: IOrder;
  onStatusUpdate: (orderId: string, status: string) => void;
}

export function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  const Icon = statusIcons[order.status as keyof typeof statusIcons];
  const total = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl border shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                statusColors[order.status as keyof typeof statusColors]
              }`}
            >
              <Icon className="h-5 w-5" />
            </motion.div>
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-medium"
              >
                Table {order.tableNumber ?? order.tableId}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <p className="text-sm text-gray-500">
                  {format(new Date(order.createdAt), "HH:mm")}
                </p>
                <span className="text-gray-300">•</span>
                <p className="text-sm text-gray-500">{itemCount} items</p>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Badge
              className={`${
                statusColors[order.status as keyof typeof statusColors]
              } capitalize`}
            >
              {statusMessages[order.status as keyof typeof statusMessages]}
            </Badge>
          </motion.div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-4">
        <ul className="space-y-2">
          <AnimatePresence>
            {order.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.quantity}x</span>
                  <div>
                    <span>{item.name}</span>
                    {item.notes && (
                      <p className="text-sm text-gray-500 mt-0.5">
                        Note: {item.notes}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-gray-600">
                  ₮{(item.price * item.quantity).toLocaleString()}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 pt-4 border-t"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Total</span>
            <span className="font-medium">₮{total.toLocaleString()}</span>
          </div>
        </motion.div>

        {order.status !== "served" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 flex gap-2"
          >
            {order.status === "pending" && (
              <Button
                onClick={() => onStatusUpdate(order._id, "preparing")}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                <ChefHat className="h-4 w-4 mr-2" />
                Start Preparing
              </Button>
            )}
            {order.status === "preparing" && (
              <Button
                onClick={() => onStatusUpdate(order._id, "served")}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark as Served
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
