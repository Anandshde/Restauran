"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Loader2 } from "lucide-react";
import { isDemo, canResetDemo } from "@/config/app.config";

export function DemoResetButton() {
  const [isResetting, setIsResetting] = useState(false);

  // Only show in demo mode
  if (!isDemo() || !canResetDemo()) {
    return null;
  }

  const handleReset = async () => {
    const confirmed = window.confirm(
      "This will reset all demo data to its initial state. All current orders, changes, and customizations will be lost. Continue?"
    );

    if (!confirmed) return;

    setIsResetting(true);

    try {
      // In a real implementation, this would call an API
      // For now, we'll just simulate the reset
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reload the page to reset local state
      window.location.reload();
    } catch (error) {
      console.error("Failed to reset demo:", error);
      alert("Failed to reset demo data. Please try again.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleReset}
      disabled={isResetting}
      className="bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100"
    >
      {isResetting ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Resetting...
        </>
      ) : (
        <>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Demo
        </>
      )}
    </Button>
  );
}
