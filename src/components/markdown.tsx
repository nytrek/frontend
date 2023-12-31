import { H1 } from "@/pages";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { H2, H3, P } from "./content";

/**
 * @see https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
 */
export const Markdown: React.FC<
  React.PropsWithChildren<{}> & { className?: string }
> = (props) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <ReactMarkdown
      className={cn("whitespace-pre-wrap", props.className)}
      components={{
        a({ href, children, className }) {
          return (
            <a
              className={cn(
                "text-secondary underline hover:no-underline",
                className,
              )}
              href={href as string}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              {children}
            </a>
          );
        },
        h1({ className, children }) {
          return <H1 className={cn("lg:text-4xl", className)}>{children}</H1>;
        },
        h2({ className, children }) {
          return <H2 className={className}>{children}</H2>;
        },
        h3({ className, children }) {
          return <H3 className={className}>{children}</H3>;
        },
        p({ className, children }) {
          return <P className={className}>{children}</P>;
        },
        ul({ children }) {
          return (
            <ul className="list-disc space-y-4 whitespace-normal pl-4">
              {children}
            </ul>
          );
        },
        ol({ children }) {
          return (
            <ol className="list-decimal space-y-4 whitespace-normal pl-4">
              {children}
            </ol>
          );
        },
        li({ children }) {
          return <li className="leading-6 text-gray-600">{children}</li>;
        },
        img({ alt, className, height, src, width }) {
          return (
            <div className="relative">
              <Image
                alt={alt as string}
                className={cn(
                  className,
                  "h-full w-full rounded-lg object-cover text-[0] duration-300 ease-in-out",
                  isLoading ? "blur-sm" : "blur-0",
                )}
                height={height as number}
                loading="lazy"
                onLoadingComplete={() => setLoading(false)}
                sizes="100%"
                src={src as string}
                width={width as number}
              />
            </div>
          );
        },
      }}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
    >
      {props.children as string}
    </ReactMarkdown>
  );
};
