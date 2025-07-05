"use client";

import { isDemo } from "@/config/app.config";
import { Badge } from "@/components/ui/badge";

export function DemoModeIndicator() {
  if (!isDemo()) {
    return null;
  }

  return (
    <Badge
      variant="outline"
      className="bg-orange-50 border-orange-200 text-orange-600 font-medium"
    >
      🎭 Demo Mode
    </Badge>
  );
}
