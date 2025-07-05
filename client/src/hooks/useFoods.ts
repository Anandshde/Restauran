import useSWR from "swr";
import { useState, useEffect } from "react";
import type { Food } from "@/types";
import { isDemo, getMockDelay } from "@/config/app.config";
import { DEMO_FOODS } from "@/data/demo-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const fetcher = (url: string) => fetch(API_URL + url).then((res) => res.json());

// Mock fetcher for demo mode
const mockFetcher = async (): Promise<Food[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, getMockDelay()));
  return DEMO_FOODS;
};

export function useFoods() {
  const [demoData, setDemoData] = useState<Food[] | undefined>(undefined);
  const [demoLoading, setDemoLoading] = useState(true);
  const [demoError, setDemoError] = useState<string | null>(null);

  // Use SWR for production mode
  const {
    data: prodData,
    error: prodError,
    mutate,
  } = useSWR<Food[]>(isDemo() ? null : "/api/food", fetcher);

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
      data: demoData,
      isLoading: demoLoading,
      error: demoError,
      mutate: () => Promise.resolve(), // No-op for demo
    };
  }

  return {
    data: prodData,
    isLoading: !prodError && !prodData,
    error: prodError,
    mutate,
  };
}
