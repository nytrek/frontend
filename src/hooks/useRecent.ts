import type { Listing } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useRecent = () => {
  return useQuery({
    queryKey: ["recent"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/listings/recent`,
      );
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const { error } = await response.json();
          throw new Error(
            error.message
              ? error.message
              : "Unable to retrieve recent listings",
          );
        } else {
          throw new Error("Unable to retrieve recent listings");
        }
      }
      return ((await response.json()) as Listing[]) ?? null;
    },
    placeholderData: keepPreviousData,
  });
};
