import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useOrders() {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/order`,
    fetcher,
    {
      refreshInterval: 5000, // Poll every 5 seconds for new orders
    }
  );

  return {
    orders: data,
    isLoading,
    error,
    mutate,
  };
}
