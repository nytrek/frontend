import type { Listing } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const useSuggestions = (city: string) => {
  return useQuery({
    queryKey: ["suggestions", city],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/listings/suggestions/${city}`,
      );
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const { error } = await response.json();
          throw new Error(
            error.message ? error.message : "Unable to retrieve suggestions",
          );
        } else {
          throw new Error("Unable to retrieve suggestions");
        }
      }
      return ((await response.json()) as Listing[]) ?? null;
    },
  });
};
