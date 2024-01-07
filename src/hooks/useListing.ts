import type { Listing } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const useListing = (id: string | null) => {
  return useQuery({
    queryKey: ["listing", id],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/listings/${id}`,
      );
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const { error } = await response.json();
          throw new Error(
            error.message ? error.message : "Unable to retrieve listing",
          );
        } else {
          throw new Error("Unable to retrieve listing");
        }
      }
      return ((await response.json()) as Listing) ?? null;
    },
    enabled: !!id,
  });
};