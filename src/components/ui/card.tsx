import { cn } from "@/utils/cn";
import Image, { type ImageProps } from "next/image";
import { forwardRef, useState } from "react";

const A: React.FC<
  Omit<React.AllHTMLAttributes<HTMLAnchorElement>, "children">
> = ({ className, ...props }) => {
  return <a className={cn("absolute inset-0 z-10", className)} {...props} />;
};

const Body: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative h-full min-h-[18rem] w-72 min-w-[18rem] overflow-hidden rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Container: React.ForwardRefExoticComponent<
  React.PropsWithChildren<{
    className?: string;
    ref?: React.Ref<HTMLDivElement> | undefined;
  }>
> = forwardRef(function Container(
  { children, className, ...props },
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      className={cn("mt-8 flex space-x-6 overflow-x-auto", className)}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </div>
  );
});

const Content: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-0 flex h-72 items-end overflow-hidden rounded-lg p-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Img: React.FC<Omit<ImageProps, "alt"> & { overlay: boolean }> = ({
  overlay,
  ...props
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <>
      <Image
        {...props}
        alt="Annons bild på bostad"
        className={cn(
          props.className,
          "h-full w-full object-cover text-[0] duration-300 ease-in-out",
          isLoading ? "blur-sm" : "blur-0",
        )}
        fill
        loading="lazy"
        onLoadingComplete={() => setLoading(false)}
        sizes="100%"
      />
      {isLoading ? (
        <div className="absolute inset-0 h-full w-full bg-gray-400 motion-safe:animate-pulse" />
      ) : (
        <>
          {overlay && (
            <Overlay className="z-0 bg-gradient-to-b opacity-50 transition duration-300" />
          )}
        </>
      )}
    </>
  );
};

const Overlay: React.FC<
  Omit<React.HTMLAttributes<HTMLDivElement>, "children">
> = ({ className, ...props }) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-x-0 bottom-0 h-72 rounded-lg bg-gradient-to-t from-gray-900 opacity-40",
        className,
      )}
      {...props}
    />
  );
};

const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex flex-col gap-y-6", className)}>
      <div className="h-72 w-full rounded-lg bg-gray-400 motion-safe:animate-pulse" />
      <div className="flex flex-col gap-y-6">
        <div className="h-3 w-3/5 rounded-lg bg-gray-400 motion-safe:animate-pulse" />
        <div className="h-3 w-1/5 rounded-lg bg-gray-400 motion-safe:animate-pulse" />
        <div className="h-3 w-2/5 rounded-lg bg-gray-400 motion-safe:animate-pulse" />
      </div>
    </div>
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

export { A, Body, Container, Content, Img, Overlay, Skeleton, Wrapper };
