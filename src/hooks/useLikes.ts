import type { Listing } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useLikes = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["likes", userId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/listings/likes/${userId}`,
      );
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const { error } = await response.json();
          throw new Error(
            error.message ? error.message : "Unable to retrieve liked listings",
          );
        } else {
          throw new Error("Unable to retrieve liked listings");
        }
      }
      return ((await response.json()) as Listing[]) ?? null;
    },
    placeholderData: keepPreviousData,
  });
};
