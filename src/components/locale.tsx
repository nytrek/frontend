import { languages } from "@/storage";
import { cn } from "@/utils/cn";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Fragment } from "react";

export const Locale: React.FC<{
  asPath: string;
  locale: string | undefined;
}> = ({ asPath, locale }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold">
          <img
            alt={locale}
            className="h-4 w-6"
            src={languages.find((item) => item.code === locale)?.flag}
          />
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {languages?.map((item) => (
              <Menu.Item key={item.code}>
                {({ active }) => (
                  <Link
                    className={cn(
                      active || locale === item.code
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700",
                      "flex items-center gap-x-2 px-4 py-2 text-sm font-semibold",
                    )}
                    href={asPath}
                    locale={item.code}
                  >
                    <img alt={locale} className="h-4 w-6" src={item.flag} />
                    <span className="text-base">{item.locale}</span>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
