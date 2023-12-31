import * as Card from "@/components/ui/card";
import { useListings } from "@/hooks/useListings";
import { useWindowSize } from "@/hooks/useWindowSize";
import { H1 } from "@/pages";
import { PATHS } from "@/pages/_app";
import { cn } from "@/utils/cn";
import type { Listing as ListingType } from "@/utils/types";
import "leaflet/dist/leaflet.css";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Slug } from "..";

const Breadcrumbs = dynamic(
  () => import("@/pages/[category]").then((mod) => mod.Breadcrumbs),
  {
    ssr: false,
  },
);

const Filter = dynamic(
  () => import("@/components/filter").then((mod) => mod.Filter),
  {
    ssr: false,
  },
);

const Float = dynamic(
  () => import("@/pages/[category]").then((mod) => mod.Float),
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

const Pagination = dynamic(
  () => import("@/components/pagination").then((mod) => mod.Pagination),
  {
    ssr: false,
  },
);

const Seo = dynamic(() => import("@/pages/[category]").then((mod) => mod.Seo), {
  ssr: false,
});

export default function City({
  seo,
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { asPath, query, locale } = useRouter();
  const { data, isLoading } = useListings();
  const [listing, setListing] = useState<ListingType | null>(null);
  const category = query.category as string;
  const { width } = useWindowSize();
  const [open, setOpen] = useState<boolean | undefined>();
  const coordinates = useMemo(() => {
    return {
      center: {
        lat: data?.[0]?.lat ?? 63.128161,
        lng: data?.[0]?.lng ?? 18.643501,
      },
      zoom: seo && data ? 10 : 5,
    };
  }, [seo, data]);
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
    {
      name: seo.city.city[0].toUpperCase() + seo.city.city.slice(1),
      href: asPath,
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
        item: process.env.NEXT_PUBLIC_URL! + query.category,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: seo.city.title,
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
        description={seo.city.description}
        title={seo.city.title}
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <div className="grid gap-10">
        <div className={cn(open && "lg:grid lg:grid-cols-3 lg:gap-6")}>
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-6">
              <Breadcrumbs navigation={navigation} />
              <H1 className="lg:text-4xl">{seo.city.h1}</H1>
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
              center={coordinates.center}
              className="fixed inset-0 z-30 col-span-2 h-full w-full rounded-lg lg:sticky lg:top-[5.5rem] lg:z-20 lg:h-[calc(100vh-7.5rem)]"
              listing={listing}
              zoom={coordinates.zoom}
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
  const containsUppercase = (str: string | undefined) => {
    if (!str) return false;
    return /[A-Z]/.test(str);
  };
  if (
    containsUppercase(context.query.city as string | undefined) ||
    (context.query.city as string | undefined)?.toLowerCase().includes("å") ||
    (context.query.city as string | undefined)?.toLowerCase().includes("ä") ||
    (context.query.city as string | undefined)?.toLowerCase().includes("ö") ||
    (context.query.city as string | undefined)?.toLowerCase().includes(" ") ||
    (context.query.city as string | undefined)?.toLowerCase().includes(",")
  ) {
    return {
      redirect: {
        permanent: true,
        destination: `/hyra-bostad/${(context.query.city as string | undefined)
          ?.toLowerCase()
          .replaceAll("å", "a")
          .replaceAll("ä", "a")
          .replaceAll("ö", "o")
          .replaceAll(" ", "-")
          .replaceAll(",", "")}`,
      },
    };
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/cities/${
      Slug[category.split("-")[1] as keyof typeof Slug]
    }/${context.query.city}`,
  );
  if (!response.ok)
    return {
      notFound: true,
      redirect: true,
    };
  const seo = await response.json();
  return {
    props: {
      seo,
      slug: Slug[category.split("-")[1] as keyof typeof Slug],
      city_formatted: context.query.city,
    },
  };
}) as GetServerSideProps<{
  seo: {
    city: {
      _id: null;
      count: number;
      city: string;
      avg_price: number;
      h1: string;
      title: string;
      description: string;
    };
    faqs: { question: string; answer: string }[];
    article: string;
  };
  slug: Slug;
  city_formatted: string;
}>;
