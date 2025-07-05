"use client";

import { motion } from "framer-motion";
import { CheckCircle, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderSuccessPage({
  params,
}: {
  params: { tableId: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="flex justify-center"
        >
          <div className="relative">
            <CheckCircle
              className="h-32 w-32 text-green-500"
              strokeWidth={1.5}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -right-4 -bottom-4"
            >
              <ChefHat className="h-12 w-12 text-orange-500" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Order Placed Successfully!
          </h1>
          <p className="mt-4 text-gray-600">
            Your order has been received and is being prepared. Please wait at
            your table and we'll bring your food shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-600">
              Table Number: <span className="font-bold">{params.tableId}</span>
            </p>
          </div>

          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href={`/order/${params.tableId}`}>Place Another Order</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
