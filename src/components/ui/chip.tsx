import { cn } from "@/utils/cn";

const A: React.FC<React.AllHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <a
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </a>
  );
};

const Wrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-300 px-4 py-2 hover:bg-gray-50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { A, Wrapper };
