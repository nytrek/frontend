import { cn } from "@/utils/cn";

export const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        "rounded-lg bg-white bg-opacity-25 px-2 py-1 text-sm font-semibold text-white backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
