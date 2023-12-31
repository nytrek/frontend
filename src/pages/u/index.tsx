import { H2, P } from "@/components/content";
import { cn } from "@/utils/cn";
import { useUser } from "@clerk/nextjs";
import {
  CreditCardIcon,
  HeartIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const translation = {
  en: {
    "my listings": "my listings",
    description: "Here, your listings will be visible.",
  },
  sv: {
    "my listings": "mina annonser",
    description: "Här kommer dina annonser att synas.",
  },
};

export const Sidenav: React.FC = () => {
  const { route, locale } = useRouter();
  const navigation = [
    {
      en: {
        name: "My listings",
        href: "/en/u",
      },
      sv: {
        name: "Mina annonser",
        href: "/u",
      },
      icon: Squares2X2Icon,
      current: route === "/u",
    },
    {
      en: {
        name: "Saved listings",
        href: "/en/u/saved",
      },
      sv: {
        name: "Sparade annonser",
        href: "/u/sparade",
      },
      icon: HeartIcon,
      current: route === "/u/sparade" || route === "/u/saved",
    },
    {
      en: {
        name: "Billing",
        href: "/en/u/billing",
      },
      sv: {
        name: "Prenumeration",
        href: "/u/prenumeration",
      },
      icon: CreditCardIcon,
      current: route === "/u/prenumeration" || route === "/u/subscription",
    },
  ];
  return (
    <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:mt-0 lg:block lg:w-64 lg:flex-none lg:border-0">
      <nav className="flex-none">
        <ul className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
          {navigation.map((item, index) => (
            <li key={index}>
              <a
                className={cn(
                  item.current
                    ? "bg-gray-50 text-secondary"
                    : "text-gray-700 hover:bg-gray-50 hover:text-secondary",
                  "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6",
                )}
                href={item[locale as keyof typeof translation]["href"]}
              >
                <item.icon
                  aria-hidden="true"
                  className={cn(
                    item.current
                      ? "text-secondary"
                      : "text-gray-400 group-hover:text-secondary",
                    "h-6 w-6 shrink-0",
                  )}
                />
                {item[locale as keyof typeof translation]["name"]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default function Index() {
  const { user, isLoaded } = useUser();
  const { push, locale } = useRouter();
  useEffect(() => {
    if (!user && isLoaded) push("/sign-in");
  }, [user, isLoaded, push]);
  return (
    <>
      <Head>
        <meta content="noindex,nofollow" name="robots" />
      </Head>
      {isLoaded && (
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-16">
          <Sidenav />
          <div>
            <H2>
              {translation[locale as keyof typeof translation][
                "my listings"
              ][0].toUpperCase() +
                translation[locale as keyof typeof translation][
                  "my listings"
                ].slice(1)}
            </H2>
            <P>
              {translation[locale as keyof typeof translation][
                "description"
              ][0].toUpperCase() +
                translation[locale as keyof typeof translation][
                  "description"
                ].slice(1)}
            </P>
          </div>
        </div>
      )}
    </>
  );
}
