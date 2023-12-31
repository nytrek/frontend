import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/cities/count`,
      );
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const { error } = await response.json();
          throw new Error(
            error.message ? error.message : "Unable to retrieve popular cities",
          );
        } else {
          throw new Error("Unable to retrieve popular cities");
        }
      }
      return (
        ((await response.json()) as {
          _id: string;
          city_formatted: string;
          count: number;
        }[]) ?? null
      );
    },
    placeholderData: keepPreviousData,
  });
};
