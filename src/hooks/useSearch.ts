import { activeCategoriesAtom } from "@/lib/atoms";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

export const useSearch = (search: string) => {
  const activeCategories = useAtomValue(activeCategoriesAtom);
  return useQuery({
    queryKey: ["search", search, activeCategories],
    queryFn: async () => {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_API
        }/listings/search/${search}?categories=${JSON.stringify(
          activeCategories.map((item) => item.toLowerCase()),
        )}`,
      );
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const { error } = await response.json();
          throw new Error(
            error.message ? error.message : "Unable to retrieve search",
          );
        } else {
          throw new Error("Unable to retrieve search");
        }
      }
      return (
        ((await response.json()) as {
          _id: string;
          count: number;
          city_formatted: string;
        }[]) ?? null
      );
    },
    placeholderData: keepPreviousData,
    staleTime: 300,
  });
};
