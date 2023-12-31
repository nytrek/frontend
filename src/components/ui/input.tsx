import { cn } from "@/utils/cn";
import { forwardRef } from "react";

const Field: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = forwardRef(
  function Field(
    { className, id, ...props },
    ref: React.ForwardedRef<HTMLInputElement>,
  ) {
    return (
      <input
        className={cn(
          "mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6",
          className,
        )}
        id={id}
        name={id}
        ref={ref}
        {...props}
      />
    );
  },
);

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <label
      className={cn(
        "block text-sm font-medium leading-6 text-gray-900",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
};

const Wrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};

export { Field, Label, Wrapper };
