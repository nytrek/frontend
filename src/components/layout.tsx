import { pagesWithHeroImage } from "@/pages/_app";
import { cn } from "@/utils/cn";
import type { Router } from "next/router";

export const Layout: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { router: Router }
> = ({ children, className, router, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        !pagesWithHeroImage.includes(router.route) ||
          (router.route.includes("[address]") && "mt-20 lg:mt-0"),
        (router.asPath.includes("/hyra") || router.asPath.includes("/rent")) &&
          !router.route.includes("[address]")
          ? "mt-0 max-w-none"
          : "max-w-screen-2xl",
        "mx-auto w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};
