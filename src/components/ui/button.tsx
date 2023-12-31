import { cn } from "@/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  [
    "px-3.5 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 rounded-md",
  ],
  {
    variants: {
      intent: {
        primary:
          "bg-primary text-white hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        secondary: "bg-white text-gray-900 hover:bg-gray-50",
      },
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button: React.FC<ButtonProps> = forwardRef(function Button(
  { children, className, intent, ...props },
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      className={cn(buttonVariants({ className, intent }))}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
