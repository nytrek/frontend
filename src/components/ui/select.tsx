import { cn } from "@/utils/cn";
import { forwardRef } from "react";

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> =
  forwardRef(function Select(
    { children, className, ...props },
    ref: React.ForwardedRef<HTMLSelectElement>,
  ) {
    return (
      <select
        className={cn("rounded-md border border-gray-300", className)}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  });
