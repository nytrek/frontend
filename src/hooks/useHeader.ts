import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

interface Header {
  navItems: {
    link: {
      type: string;
      url: string;
      label: string;
    };
    id: string;
  }[];
  navItemsAuthenticated: {
    link: {
      type: string;
      url: string;
      label: string;
    };
    id: string;
  }[];
  globalType: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export const useHeader = () => {
  const { locale } = useRouter();
  return useQuery({
    queryKey: ["header", locale],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_API}/globals/header?locale=${locale}&draft=false&depth=1`,
      );
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const { error } = await response.json();
          throw new Error(
            error.message ? error.message : "Unable to header links",
          );
        } else {
          throw new Error("Unable to retrieve header links");
        }
      }
      return ((await response.json()) as Header) ?? null;
    },
    placeholderData: keepPreviousData,
  });
};
