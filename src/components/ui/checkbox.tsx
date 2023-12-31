import { cn } from "@/utils/cn";
import { forwardRef } from "react";

const Content: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("ml-3 text-sm leading-6", className)} {...props}>
      {children}
    </div>
  );
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = forwardRef(
  function Input(
    { className, id, ...props },
    ref: React.ForwardedRef<HTMLInputElement>,
  ) {
    return (
      <div className="flex h-6 items-center">
        <input
          className={cn(
            "text-secondary focus:ring-secondary h-4 w-4 rounded border-gray-300",
            className,
          )}
          id={id}
          name={id}
          ref={ref}
          type="checkbox"
          {...props}
        />
      </div>
    );
  },
);

const Wrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("relative flex", className)} {...props}>
      {children}
    </div>
  );
};

export { Content, Input, Wrapper };
