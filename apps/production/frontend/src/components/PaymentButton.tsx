"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CreditCard, Loader2 } from "lucide-react";
import Image from "next/image";

interface PaymentButtonProps {
  orderId: string;
  amount: number;
}

export function PaymentButton({ orderId, amount }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/qpay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            amount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Payment initiation failed");
      }

      const data = await response.json();
      window.location.href = data.qpayUrl;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm mx-auto"
    >
      <div className="bg-white rounded-xl border p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Total Amount</h3>
            <p className="text-2xl font-bold text-orange-500">
              ₮{amount.toLocaleString()}
            </p>
          </div>
          <Image
            src="/qpay-logo.svg"
            alt="QPay"
            width={80}
            height={40}
            className="object-contain"
          />
        </div>

        <div className="space-y-2">
          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 h-12 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Pay with QPay
              </>
            )}
          </Button>
          <p className="text-xs text-center text-gray-500">
            You will be redirected to QPay to complete your payment
          </p>
        </div>
      </div>
    </motion.div>
  );
}
