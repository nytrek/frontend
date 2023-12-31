import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

interface Footer {
  navItemsNytrek: {
    link: {
      type: string;
      url: string;
      label: string;
    };
    id: string;
  }[];

  navItemsCategories: {
    link: {
      type: string;
      url: string;
      label: string;
    };
    id: string;
  }[];
  navItemsTerms: {
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

export const useFooter = () => {
  const { locale } = useRouter();
  return useQuery({
    queryKey: ["footer", locale],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_API}/globals/footer?locale=${locale}&draft=false&depth=1`,
      );
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const { error } = await response.json();
          throw new Error(
            error.message ? error.message : "Unable to footer links",
          );
        } else {
          throw new Error("Unable to retrieve footer links");
        }
      }
      return ((await response.json()) as Footer) ?? null;
    },
    placeholderData: keepPreviousData,
  });
};
