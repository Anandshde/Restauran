import useSWR from "swr";
import type { Food } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const fetcher = (url: string) => fetch(API_URL + url).then((res) => res.json());

export function useFoods() {
  const { data, error, mutate } = useSWR<Food[]>("/api/food", fetcher);

  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
