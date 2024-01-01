import { H2, H3 } from "@/components/content";
import * as Card from "@/components/ui/card";
import { useListings } from "@/hooks/useListings";
import { useWindowSize } from "@/hooks/useWindowSize";
import { cn } from "@/utils/cn";
import type { Listing as ListingType } from "@/utils/types";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  HomeIcon,
  MapIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import "leaflet/dist/leaflet.css";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useMemo, useState } from "react";
import { H1 } from "..";
import { PATHS } from "../_app";

const Filter = dynamic(
  () => import("@/components/filter").then((mod) => mod.Filter),
  {
    ssr: false,
  },
);

const Listing = dynamic(
  () => import("@/components/listing").then((mod) => mod.Listing),
  { ssr: false },
);

const Map = dynamic(
  () => import("@/components/maps/global").then((mod) => mod.Map),
  {
    ssr: false,
  },
);

const Markdown = dynamic(
  () => import("@/components/markdown").then((mod) => mod.Markdown),
  {
    ssr: false,
  },
);

const Pagination = dynamic(
  () => import("@/components/pagination").then((mod) => mod.Pagination),
  {
    ssr: false,
  },
);

const Resizable = dynamic(
  () => import("@/components/ui/resizable").then((mod) => mod.Resizable),
  {
    ssr: false,
  },
);

export enum Slug {
  "bostad" = "bostad",
  "lagenhet" = "lagenhet",
  "hus" = "hus",
  "stuga" = "stuga",
  "rum" = "rum",
  "housing" = "bostad",
  "apartment" = "lagenhet",
  "house" = "hus",
  "cabin" = "stuga",
  "room" = "rum",
}

export const Float: React.FC<{
  open: boolean | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}> = ({ open, setOpen }) => {
  return (
    <div className="fixed bottom-10 left-0 z-30 flex w-full justify-center">
      <div className="inline-flex items-center rounded-2xl bg-secondary px-1.5 transition duration-300">
        <button
          aria-label="toggle map"
          className="inline-flex items-center gap-x-1.5 rounded-l-md p-3 text-sm font-semibold text-white"
          onClick={() => setOpen(!open)}
          type="button"
        >
          {open ? (
            <>
              <XMarkIcon aria-hidden="true" className="-ml-0.5 h-5 w-5" />
              <span>Stäng karta</span>
            </>
          ) : (
            <>
              <MapIcon aria-hidden="true" className="-ml-0.5 h-5 w-5" />
              <span>Öppna karta</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export const Breadcrumbs: React.FC<{
  navigation: {
    name: string;
    href: string;
  }[];
}> = ({ navigation }) => {
  const { locale } = useRouter();
  return (
    <nav aria-label="Breadcrumb" className="grid">
      <ol className="flex w-full items-center space-x-4 overflow-x-auto">
        <li>
          <a className="text-gray-600 hover:text-gray-700" href={`/${locale}`}>
            <HomeIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
            <span className="sr-only">Home</span>
          </a>
        </li>
        {navigation.map((item) => (
          <li key={item.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-gray-600"
              />
              <a
                className="ml-4 text-sm font-medium text-gray-600 hover:text-gray-700"
                href={`/${locale}/${item.href}`}
              >
                <span className="inline whitespace-nowrap">{item.name}</span>
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export const Seo: React.FC<{
  seo: {
    city?: {
      _id: null;
      count: number;
      city: string;
      avg_price: number;
      h1: string;
      title: string;
      description: string;
    };
    type?: {
      count: number;
      avg_price: number;
      h1: string;
      title: string;
      description: string;
    };
    faqs: { question: string; answer: string }[];
    article: string;
  };
}> = ({ seo }) => {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-y-6">
      <H2>Vanliga frågor</H2>
      <hr />
      <dl className="space-y-6 divide-y divide-gray-900/10">
        {seo.faqs.map((faq, index) => (
          <Fragment key={faq.question}>
            <Resizable>
              <Disclosure as="div" className={cn(!!index && "pt-6")}>
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <H3>{faq.question}</H3>
                        {open ? (
                          <MinusIcon aria-hidden="true" className="h-6 w-6" />
                        ) : (
                          <PlusIcon aria-hidden="true" className="h-6 w-6" />
                        )}
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-6">
                      <Markdown>{faq.answer}</Markdown>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </Resizable>
          </Fragment>
        ))}
      </dl>
      <hr />
      <Markdown className="max-w-2xl">
        {seo.article.replaceAll("{{ count }}", String(seo.city?.count))}
      </Markdown>
    </div>
  );
};

export default function Category({
  seo,
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { asPath, query, locale } = useRouter();
  const { data, isLoading } = useListings();
  const [listing, setListing] = useState<ListingType | null>(null);
  const category = query.category as string;
  const { width } = useWindowSize();
  const [open, setOpen] = useState<boolean | undefined>();
  const center = useMemo(() => {
    return {
      lat: 63.128161,
      lng: 18.643501,
    };
  }, []);
  const canonical = process.env.NEXT_PUBLIC_URL + asPath.split("?")[0];
  const navigation = [
    {
      name:
        category.split("-")[0][0].toUpperCase() +
        category.split("-")[0].slice(1) +
        " " +
        category.split("-")[1],
      href: category,
    },
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: process.env.NEXT_PUBLIC_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name:
          category.split("-")[0][0].toUpperCase() +
          category.split("-")[0].slice(1) +
          " " +
          category.split("-")[1],
        item: process.env.NEXT_PUBLIC_URL! + asPath,
      },
    ],
  };
  useEffect(() => {
    if (typeof open === "undefined" && width) {
      if (width >= 960) setOpen(true);
      else setOpen(false);
    }
  }, [open, width]);
  return (
    <>
      {locale === "en" && (
        <Head>
          <meta content="noindex,nofollow" name="robots" />
        </Head>
      )}
      <NextSeo
        canonical={canonical}
        description={seo.type.description}
        title={seo.type.title}
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <div className="grid gap-10">
        <div className={cn(open && "lg:grid lg:grid-cols-3 lg:gap-6")}>
          <div className="grid gap-y-8">
            <div className="grid gap-y-6">
              <Breadcrumbs navigation={navigation} />
              <H1 className="lg:text-4xl">{seo.type.h1}</H1>
              <Filter type_formatted={slug === "bostad" ? "alla" : slug} />
            </div>
            <div
              className={cn(
                open ? "3xl:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-4",
                "grid grid-cols-1 gap-8",
              )}
            >
              {data ? (
                <>
                  {data.map((item) => (
                    <Card.Body
                      className="w-full"
                      key={item._id}
                      onMouseEnter={() => setListing(item)}
                      onMouseLeave={() => setListing(null)}
                    >
                      {isLoading ? (
                        <Card.Skeleton />
                      ) : (
                        <Listing listing={item} />
                      )}
                    </Card.Body>
                  ))}
                </>
              ) : (
                <>
                  {Array.from({ length: 28 }).map((_, index) => (
                    <Card.Skeleton key={index} />
                  ))}
                </>
              )}
            </div>
            <Pagination />
          </div>
          {open && (
            <Map
              center={center}
              className="fixed inset-0 z-30 col-span-2 h-full w-full rounded-lg lg:sticky lg:top-[5.5rem] lg:z-20 lg:h-[calc(100vh-7.5rem)]"
              listing={listing}
              zoom={5}
            />
          )}
        </div>
        <Seo seo={seo} />
      </div>
      <Float open={open} setOpen={setOpen} />
    </>
  );
}

export const getServerSideProps = (async (context) => {
  const category = context.query.category as string | undefined;
  if (!category) {
    return {
      notFound: true,
      redirect: true,
    };
  }
  const categoryIsValid = PATHS.includes(category);
  if (!categoryIsValid) {
    return {
      notFound: true,
      redirect: true,
    };
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/cities/${
      Slug[category.split("-")[1] as keyof typeof Slug]
    }`,
  );
  if (!response.ok)
    return {
      notFound: true,
      redirect: true,
    };
  const seo = await response.json();
  return {
    props: { seo, slug: Slug[category.split("-")[1] as keyof typeof Slug] },
  };
}) as GetServerSideProps<{
  seo: {
    type: {
      count: number;
      avg_price: number;
      h1: string;
      title: string;
      description: string;
    };
    faqs: { question: string; answer: string }[];
    article: string;
  };
  slug: Slug;
}>;
