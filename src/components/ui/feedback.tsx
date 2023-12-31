import { H1, Subheader } from "@/pages";
import { cn } from "@/utils/cn";
import { P } from "../content";

const Header: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>
> = ({ children, className, ...props }) => {
  return (
    <H1 className={cn("lg:text-4xl", className)} {...props}>
      {children}
    </H1>
  );
};

const Text: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>
> = ({ children, className, ...props }) => {
  return (
    <P className={className} {...props}>
      {children}
    </P>
  );
};

const Wrapper: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("mx-auto max-w-2xl space-y-2 text-center", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Header, Subheader, Text, Wrapper };
