import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export const useCustomer = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: ["customer", user?.primaryEmailAddress?.emailAddress],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/stripe/${user?.primaryEmailAddress?.emailAddress}`,
      );
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const { error } = await response.json();
          throw new Error(
            error.message ? error.message : "Unable to retrieve customer",
          );
        } else {
          throw new Error("Unable to retrieve customer");
        }
      }
      return (await response.json()) as boolean;
    },
    enabled: !!user?.primaryEmailAddress?.emailAddress,
  });
};
