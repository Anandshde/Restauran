"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface PaymentButtonProps {
  orderId: string;
  total: number;
}

export function PaymentButton({ orderId, total }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrImage, setQrImage] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setQrImage(data.qrImage);
        setShowQR(true);
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handlePayment} disabled={isLoading} className="w-full">
        {isLoading ? "Processing..." : `Pay ₮${total.toLocaleString()}`}
      </Button>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan with QPay</DialogTitle>
          </DialogHeader>
          {qrImage && (
            <div className="flex flex-col items-center gap-4">
              <Image
                src={qrImage}
                alt="QPay QR Code"
                width={300}
                height={300}
                className="rounded-lg"
              />
              <p className="text-sm text-muted-foreground">
                Open QPay app and scan this QR code to pay
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
