"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      // Optionally verify the session status here
      setStatus("success");
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Your order has been confirmed and your receipt will be sent to your
          email.
        </p>
        <p className="text-sm text-muted-foreground">
          You can close this window now.
        </p>
      </div>
    </div>
  );
}
