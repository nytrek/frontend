import { cn } from "@/utils/cn";

export const Popup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "absolute top-16 z-30 hidden max-h-64 w-full overflow-auto rounded-xl bg-white py-3 shadow-xl group-focus-within:block",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
