"use client";

import DashboardStats from "@/components/dashboard/DashboardStats";
import DemoResetButton from "@/components/demo/DemoResetButton";
import { useDemoMode } from "@/hooks/useDemoMode";

export default function DashboardPage() {
  const { isDemoMode } = useDemoMode();

  return (
    <div className="space-y-6 p-6">
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-blue-800 font-medium">
              Демо горимд ажиллаж байна
            </span>
          </div>
          <DemoResetButton />
        </div>
      )}

      {/* Main Dashboard Content */}
      <DashboardStats />
    </div>
  );
}
