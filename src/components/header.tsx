import { useDebounce } from "@/hooks/useDebounce";
import { useHeader } from "@/hooks/useHeader";
import { useSearch } from "@/hooks/useSearch";
import { pagesWithHeroImage } from "@/pages/_app";
import { cn } from "@/utils/cn";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import type { Router } from "next/router";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Locale } from "./locale";
import { NotFound } from "./ui/notfound";

const translation = {
  en: {
    "create account": "create account",
    login: "login",
  },
  sv: {
    "create account": "skapa konto",
    login: "logga in",
  },
};

export const Command: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const { push, query, locale } = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 300);
  const { data } = useSearch(debouncedSearchTerm);
  const handleOnChange = (city_formatted: string) => {
    setOpen(false);
    if(query.category){
      push("/" + query.category + "/" + city_formatted);
    }
    else if(locale === "en"){
      push("/rent-housing/" + city_formatted)
    }
    else{
      push("/hyra-bostad/" + city_formatted)
    }
  };
  return (
    <Transition.Root
      afterLeave={() => setSearch("")}
      appear
      as={Fragment}
      show={open}
    >
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(city: string) => handleOnChange(city)}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Sök stad"
                  />
                </div>

                {!!data?.length && (
                  <Combobox.Options
                    className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-gray-800"
                    static
                  >
                    {data.map((item) => (
                      <Combobox.Option
                        className={({ active }) =>
                          cn(
                            "flex cursor-pointer items-center justify-between px-6 py-3",
                            active && "bg-gray-100",
                          )
                        }
                        key={item.city_formatted}
                        value={item.city_formatted}
                      >
                        <span>
                          {item._id[0].toUpperCase() + item._id.slice(1)}
                        </span>
                        <span>{item.count}</span>
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {search !== "" && data?.length === 0 && (
                  <NotFound>Inga städer hittades.</NotFound>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export const Header: React.FC<{ router: Router }> = ({ router }) => {
  const { data } = useHeader();
  const { asPath } = useRouter();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <Command open={open} setOpen={setOpen} />
      <div
        className={cn(
          pagesWithHeroImage.includes(router.route) ||
            router.route.includes("[address]")
            ? "absolute left-0 top-6 px-6 text-white lg:static lg:mb-10 lg:text-gray-900"
            : "mb-10 text-gray-900",
          (router.asPath.includes("/hyra") ||
            router.asPath.includes("/rent")) &&
            !router.route.includes("[address]")
            ? "sticky top-0 bg-white py-6"
            : "max-w-screen-2xl",
          "z-30 mx-auto w-full lg:z-40 lg:px-0",
        )}
      >
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between lg:items-start">
          <a
            className="relative hidden h-7 w-48 lg:inline"
            href={`/${router.locale}`}
          >
            <Image alt="logo" fill sizes="100%" src="/logo.png" />
          </a>
          <a
            className="relative -mt-1.5 inline h-6 w-10 lg:hidden"
            href={`/${router.locale}`}
          >
            <Image alt="logo" fill sizes="100%" src="/whale-logo.png" />
          </a>
          <div className="flex items-center gap-x-4">
            <div className="mr-6 hidden gap-x-6 lg:flex">
              {data?.navItems.map((item) => (
                <a
                  className="font-medium text-secondary"
                  href={item.link.url}
                  key={item.link.label}
                >
                  <span className="group">
                    <span>{item.link.label}</span>
                    <hr className="w-0 border-secondary transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              ))}
              <SignedIn>
                {data?.navItemsAuthenticated.map((item) => (
                  <a
                    className="font-medium text-secondary"
                    href={item.link.url}
                    key={item.link.label}
                  >
                    <span className="group">
                      <span>{item.link.label}</span>
                      <hr className="w-0 border-secondary transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                ))}
              </SignedIn>
            </div>
            <button onClick={() => setOpen(true)} type="button">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            <Locale asPath={router.asPath} locale={router.locale} />
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              type="button"
            >
              <Bars3Icon className="h-7 w-7" />
            </button>
            <SignedOut>
              <div className="hidden items-center gap-x-6 lg:flex">
                <a
                  className="rounded-full bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
                  href={`/${router.locale}/sign-up`}
                >
                  {translation[router.locale as keyof typeof translation][
                    "create account"
                  ][0].toUpperCase() +
                    translation[router.locale as keyof typeof translation][
                      "create account"
                    ].slice(1)}
                </a>
                <a
                  className="font-medium text-secondary"
                  href={`/${router.locale}/sign-in`}
                >
                  <span className="group">
                    <span>
                      {translation[router.locale as keyof typeof translation][
                        "login"
                      ][0].toUpperCase() +
                        translation[router.locale as keyof typeof translation][
                          "login"
                        ].slice(1)}
                    </span>
                    <hr className="w-0 border-secondary transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              </div>
            </SignedOut>
            <div className="hidden lg:block">
              <UserButton afterSignOutUrl={asPath} />
            </div>
          </div>
          <Dialog
            as="div"
            className="lg:hidden"
            onClose={setMobileMenuOpen}
            open={mobileMenuOpen}
          >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div
                className={cn(
                  (router.asPath.includes("/hyra") ||
                    router.asPath.includes("/rent")) &&
                    !router.route.includes("[address]")
                    ? "mt-7"
                    : "mt-1",
                  "flex items-center justify-between",
                )}
              >
                <a
                  className="relative -mt-1.5 inline h-6 w-10 lg:hidden"
                  href={`/${router.locale}`}
                >
                  <Image alt="logo" fill sizes="100%" src="/whale-logo.png" />
                </a>
                <button
                  className="rounded-md text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                  type="button"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-7 w-7" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 flex h-[90vh] flex-col">
                  <div className="space-y-2 py-6">
                    {data?.navItems.map((item) => (
                      <a
                        className="-mx-2 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        href={item.link.url}
                        key={item.link.label}
                      >
                        {item.link.label}
                      </a>
                    ))}
                    <SignedIn>
                      {data?.navItemsAuthenticated.map((item) => (
                        <a
                          className="-mx-2 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          href={item.link.url}
                          key={item.link.label}
                        >
                          {item.link.label}
                        </a>
                      ))}
                    </SignedIn>
                  </div>
                  <SignedOut>
                    <div className="mt-auto flex flex-col gap-y-4">
                      <a
                        className="-mx-2 block rounded-full bg-secondary px-3 py-2 text-center text-base font-semibold leading-7 text-white hover:bg-secondary/80"
                        href={`/${router.locale}/sign-up`}
                      >
                        {translation[router.locale as keyof typeof translation][
                          "create account"
                        ][0].toUpperCase() +
                          translation[
                            router.locale as keyof typeof translation
                          ]["create account"].slice(1)}
                      </a>
                      <a
                        className="-mx-2 block rounded-lg px-3 py-2 text-center text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        href={`/${router.locale}/sign-in`}
                      >
                        {translation[router.locale as keyof typeof translation][
                          "login"
                        ][0].toUpperCase() +
                          translation[
                            router.locale as keyof typeof translation
                          ]["login"].slice(1)}
                      </a>
                    </div>
                  </SignedOut>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </div>
      </div>
    </>
  );
};
