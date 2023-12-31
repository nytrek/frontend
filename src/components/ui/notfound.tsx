import { cn } from "@/utils/cn";

export const NotFound: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn("inline-block p-4 text-sm leading-6", className)}
      {...props}
    >
      {children}
    </span>
  );
};
