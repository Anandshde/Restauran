import useSWR from "swr";
import { useState, useEffect } from "react";
import type { Order } from "@/types";
import { isDemo, getMockDelay } from "@/config/app.config";
import { DEMO_ORDERS } from "@/data/demo-data";

const fetcher = (url: string) =>
  fetch(url, {
    credentials: "include",
  }).then((res) => res.json());

// Mock fetcher for demo mode
const mockFetcher = async (): Promise<Order[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, getMockDelay()));
  return DEMO_ORDERS;
};

export function useOrders() {
  const [demoData, setDemoData] = useState<Order[] | undefined>(undefined);
  const [demoLoading, setDemoLoading] = useState(true);
  const [demoError, setDemoError] = useState<string | null>(null);

  // Use SWR for production mode
  const {
    data: prodData,
    error: prodError,
    isLoading: prodLoading,
    mutate,
  } = useSWR(
    isDemo() ? null : `${process.env.NEXT_PUBLIC_API_URL}/api/order`,
    fetcher,
    {
      refreshInterval: isDemo() ? 0 : 5000, // No polling in demo mode
    }
  );

  // Handle demo mode
  useEffect(() => {
    if (isDemo()) {
      setDemoLoading(true);
      mockFetcher()
        .then((data) => {
          setDemoData(data);
          setDemoLoading(false);
        })
        .catch((err) => {
          setDemoError(err.message);
          setDemoLoading(false);
        });
    }
  }, []);

  if (isDemo()) {
    return {
      orders: demoData,
      isLoading: demoLoading,
      error: demoError,
      mutate: () => Promise.resolve(), // No-op for demo
    };
  }

  return {
    orders: prodData,
    isLoading: prodLoading,
    error: prodError,
    mutate,
  };
}
