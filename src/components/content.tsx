import { cn } from "@/utils/cn";

export const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h2
      {...props}
      className={cn(
        "text-2xl font-semibold tracking-tight text-gray-900",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      {...props}
      className={cn(
        "text-xl font-semibold tracking-tight text-gray-900",
        className,
      )}
    >
      {children}
    </h3>
  );
};

export const P: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p {...props} className={cn("text-lg leading-8 text-gray-700", className)}>
      {children}
    </p>
  );
};

export const Content: React.FC<
  React.PropsWithChildren<{}> & { className?: string; type?: "h2" | "h3" }
> = (props) => {
  if (props.type === "h2") {
    return <H2>{props.children}</H2>;
  }
  if (props.type === "h3") {
    return <H3>{props.children}</H3>;
  }
  return <P>{props.children}</P>;
};
