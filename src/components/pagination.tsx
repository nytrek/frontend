import { useCount } from "@/hooks/useCount";
import { cn } from "@/utils/cn";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";

const PAGES = 28;

export const Pagination: React.FC = () => {
  const { asPath, query } = useRouter();
  const page =
    isNaN(Number(query?.page)) || !query?.page || Number(query.page ?? 0) <= 0
      ? 1
      : query?.page;
  const { data } = useCount();
  const pagination =
    Math.ceil((data ?? 0) / PAGES) <= 0 ? 0 : Math.ceil((data ?? 0) / PAGES);
  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <a
          className={cn(
            Number(page) <= 1 && "pointer-events-none",
            "inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-900",
          )}
          href={`${asPath.split("?")[0]}?page=${Number(page) - 1}`}
        >
          <ArrowLongLeftIcon
            aria-hidden="true"
            className="mr-3 h-5 w-5 text-gray-600 md:hidden"
          />
          <span>Föregående</span>
        </a>
      </div>
      <div className="hidden md:-mt-px md:flex">
        <a
          className={cn(
            Math.ceil(Number(page) / 6) * 6 - 5 === Number(page)
              ? "border-secondary text-secondary"
              : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-900",
            "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium",
          )}
          href={`${asPath.split("?")[0]}?page=${
            Math.ceil(Number(page) / 6) * 6 - 5
          }`}
        >
          {Math.ceil(Number(page) / 6) * 6 - 5}
        </a>
        {Math.ceil(Number(page) / 6) * 6 - 4 <= pagination && (
          <a
            className={cn(
              Math.ceil(Number(page) / 6) * 6 - 4 === Number(page)
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-900",
              "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium",
            )}
            href={`${asPath.split("?")[0]}?page=${
              Math.ceil(Number(page) / 6) * 6 - 4
            }`}
          >
            {Math.ceil(Number(page) / 6) * 6 - 4}
          </a>
        )}
        {Math.ceil(Number(page) / 6) * 6 - 3 <= pagination && (
          <a
            className={cn(
              Math.ceil(Number(page) / 6) * 6 - 3 === Number(page)
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-900",
              "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium",
            )}
            href={`${asPath.split("?")[0]}?page=${
              Math.ceil(Number(page) / 6) * 6 - 3
            }`}
          >
            {Math.ceil(Number(page) / 6) * 6 - 3}
          </a>
        )}
        {Math.ceil(Number(page) / 6) * 6 - 2 <= pagination && (
          <a
            className={cn(
              Math.ceil(Number(page) / 6) * 6 - 2 === Number(page)
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-900",
              "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium",
            )}
            href={`${asPath.split("?")[0]}?page=${
              Math.ceil(Number(page) / 6) * 6 - 2
            }`}
          >
            {Math.ceil(Number(page) / 6) * 6 - 2}
          </a>
        )}
        {Math.ceil(Number(page) / 6) * 6 - 1 <= pagination && (
          <a
            className={cn(
              Math.ceil(Number(page) / 6) * 6 - 1 === Number(page)
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-900",
              "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium",
            )}
            href={`${asPath.split("?")[0]}?page=${
              Math.ceil(Number(page) / 6) * 6 - 1
            }`}
          >
            {Math.ceil(Number(page) / 6) * 6 - 1}
          </a>
        )}
        {Math.ceil(Number(page) / 6) * 6 <= pagination && (
          <a
            className={cn(
              Math.ceil(Number(page) / 6) * 6 === Number(page)
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-900",
              "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium",
            )}
            href={`${asPath.split("?")[0]}?page=${
              Math.ceil(Number(page) / 6) * 6
            }`}
          >
            {Math.ceil(Number(page) / 6) * 6}
          </a>
        )}
        {Math.ceil(Number(page) / 6) * 6 + 1 <= pagination && (
          <a
            className={cn(
              Math.ceil(Number(page) / 6) * 6 + 1 === Number(page)
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-900",
              "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium",
            )}
            href={`${asPath.split("?")[0]}?page=${
              Math.ceil(Number(page) / 6) * 6 + 1
            }`}
          >
            {Math.ceil(Number(page) / 6) * 6 + 1}
          </a>
        )}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <a
          className={cn(
            Number(page) >= pagination && "pointer-events-none",
            "inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-900",
          )}
          href={`${asPath.split("?")[0]}?page=${Number(page) + 1}`}
        >
          <span>Nästa</span>
          <ArrowLongRightIcon
            aria-hidden="true"
            className="ml-3 h-5 w-5 text-gray-600 md:hidden"
          />
        </a>
      </div>
    </nav>
  );
};
