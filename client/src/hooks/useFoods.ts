import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useFoods() {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/food`,
    fetcher
  );

  return {
    foods: data,
    isLoading,
    error,
    mutate,
  };
}
