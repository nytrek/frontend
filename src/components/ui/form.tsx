import { cn } from "@/utils/cn";
import { forwardRef } from "react";

export const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> =
  forwardRef(function Form(
    { children, className, ...props },
    ref: React.ForwardedRef<HTMLFormElement>,
  ) {
    return (
      <form
        className={cn("grid gap-6 sm:grid-cols-2", className)}
        ref={ref}
        {...props}
      >
        {children}
      </form>
    );
  });
