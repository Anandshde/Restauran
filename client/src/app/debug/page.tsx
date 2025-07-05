"use client";

import { useEffect, useState } from "react";
import { isDemo, config, logConfig } from "@/config/app.config";
import { DEMO_FOODS } from "@/data/demo-data";
import { useFoods } from "@/hooks/useFoods";

export default function DebugPage() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({});
  const { data: foods, isLoading, error } = useFoods();

  useEffect(() => {
    // Log configuration
    logConfig();

    // Get environment variables
    setEnvVars({
      NEXT_PUBLIC_APP_MODE: process.env.NEXT_PUBLIC_APP_MODE || "undefined",
      NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE || "undefined",
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "undefined",
      NEXT_PUBLIC_ADMIN_AUTH_ENABLED:
        process.env.NEXT_PUBLIC_ADMIN_AUTH_ENABLED || "undefined",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">🐛 Debug Page</h1>

        {/* Environment Variables */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2">
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-mono text-sm">{key}:</span>
                <span className="font-mono text-sm text-blue-600">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* App Configuration */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">App Configuration</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Mode:</span>
              <span
                className={`font-semibold ${
                  isDemo() ? "text-blue-600" : "text-green-600"
                }`}
              >
                {config.mode}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Is Demo:</span>
              <span
                className={`font-semibold ${
                  isDemo() ? "text-blue-600" : "text-red-600"
                }`}
              >
                {isDemo() ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>API URL:</span>
              <span className="font-mono text-sm">{config.api.baseUrl}</span>
            </div>
            <div className="flex justify-between">
              <span>Admin Auth:</span>
              <span
                className={`font-semibold ${
                  config.features.adminAuth ? "text-green-600" : "text-red-600"
                }`}
              >
                {config.features.adminAuth ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>

        {/* Demo Data */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Demo Data</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Demo Foods Count:</span>
              <span className="font-semibold">{DEMO_FOODS.length}</span>
            </div>
            <div className="flex justify-between">
              <span>First Food:</span>
              <span className="font-mono text-sm">
                {DEMO_FOODS[0]?.name || "None"}
              </span>
            </div>
          </div>
        </div>

        {/* Foods Hook */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Foods Hook</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Loading:</span>
              <span
                className={`font-semibold ${
                  isLoading ? "text-yellow-600" : "text-green-600"
                }`}
              >
                {isLoading ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Error:</span>
              <span
                className={`font-semibold ${
                  error ? "text-red-600" : "text-green-600"
                }`}
              >
                {error ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Foods Count:</span>
              <span className="font-semibold">{foods?.length || 0}</span>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded">
              <strong>Error:</strong> {error.toString()}
            </div>
          )}

          {foods && foods.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Foods:</h3>
              <div className="space-y-1">
                {foods.slice(0, 3).map((food) => (
                  <div key={food._id} className="text-sm">
                    {food.name} - ₮{food.price.toLocaleString()}
                  </div>
                ))}
                {foods.length > 3 && (
                  <div className="text-sm text-gray-500">
                    ... and {foods.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
