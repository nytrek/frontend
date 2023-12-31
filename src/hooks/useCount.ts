import {
  activeAlternativesAtom,
  activeCategoriesAtom,
  areaAtom,
  priceAtom,
  roomAtom,
  selectedFilterAtom,
} from "@/lib/atoms";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";

export const useCount = () => {
  const { query } = useRouter();
  const area = useAtomValue(areaAtom);
  const room = useAtomValue(roomAtom);
  const price = useAtomValue(priceAtom);
  const selectedFilter = useAtomValue(selectedFilterAtom);
  const activeCategories = useAtomValue(activeCategoriesAtom);
  const activeAlternatives = useAtomValue(activeAlternativesAtom);
  return useQuery({
    queryKey: [
      "count",
      selectedFilter.index,
      query?.page,
      query?.city,
      activeAlternatives,
      activeCategories,
      area,
      room,
      price,
    ],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/listings/count?sort=${
          selectedFilter.index
        }${query?.city ? "&city=" + query?.city : ""}&page=${
          Number(query?.page ?? 0) <= 0 ? 1 : query?.page
        }&alternatives=${JSON.stringify(
          activeAlternatives,
        )}&categories=${JSON.stringify(
          activeCategories.map((item) => item.toLowerCase()),
        )}&area=${JSON.stringify(area)}&room=${JSON.stringify(
          room,
        )}&price=${JSON.stringify(price)}`,
      );
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const { error } = await response.json();
          throw new Error(
            error.message ? error.message : "Unable to retrieve count",
          );
        } else {
          throw new Error("Unable to retrieve count");
        }
      }
      return ((await response.json()) as number) ?? null;
    },
    placeholderData: keepPreviousData,
  });
};
