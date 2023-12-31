import * as Card from "@/components/ui/card";
import * as Chip from "@/components/ui/chip";
import { NotFound } from "@/components/ui/notfound";
import { Popup } from "@/components/ui/popup";
import { useCities } from "@/hooks/useCities";
import { useDebounce } from "@/hooks/useDebounce";
import { useRecent } from "@/hooks/useRecent";
import { useSearch } from "@/hooks/useSearch";
import { categories } from "@/storage";
import { cn } from "@/utils/cn";
import type { CmsWithRichTextAndColumns } from "@/utils/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import translation from "./_translation.json";

const Listing = dynamic(
  () => import("@/components/listing").then((mod) => mod.Listing),
  { ssr: false },
);

export const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1
      {...props}
      className={cn(
        "break-words text-4xl font-semibold leading-10 lg:text-6xl lg:leading-none",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export const P: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      {...props}
      className={cn("text-lg leading-8 text-gray-600 lg:text-2xl", className)}
    >
      {children}
    </p>
  );
};

export const Search: React.FC<
  React.HTMLAttributes<HTMLInputElement> & { cta: string }
> = (props) => {
  const { locale } = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 300);
  const { data, refetch } = useSearch(debouncedSearchTerm);
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!search) return;
    setTimeout(async () => {
      const city_formatted = (await refetch()).data?.[0].city_formatted;
      window.location.href =
        locale === "en"
          ? `/rent-housing/${city_formatted}`
          : `/hyra-bostad/${city_formatted}`;
    }, 300);
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="group relative z-10 mx-auto -mt-[4.5rem] max-w-5xl rounded-full shadow-xl">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          {...props}
          aria-describedby="search"
          autoComplete="off"
          className="block w-full rounded-full border-0 px-12 py-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
          id="search"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          value={search}
        />
        <button
          className="absolute inset-y-0 right-0 my-2 mr-2 flex items-center rounded-full bg-secondary px-8 py-4 text-white shadow-lg hover:bg-secondary/80"
          id="search"
          type="button"
        >
          {props.cta[0].toUpperCase() + props.cta.slice(1)}
        </button>
        <Popup>
          {!!data?.length && (
            <>
              {data.map((item, index) => (
                <a
                  className="inline-flex w-full items-center justify-between px-6 py-3 hover:bg-gray-100"
                  href={`/${locale === "en" ? "rent-housing" : "hyra-bostad"}/${
                    item.city_formatted
                  }`}
                  key={index}
                  tabIndex={0}
                >
                  <span>{item._id[0].toUpperCase() + item._id.slice(1)}</span>
                  <span>{item.count}</span>
                </a>
              ))}
            </>
          )}
          {data?.length === 0 && <NotFound>Inga städer hittades.</NotFound>}
        </Popup>
      </div>
    </form>
  );
};

export const Subheader: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <span {...props} className={cn("text-lg font-semibold", className)}>
      {children}
    </span>
  );
};

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn("flex flex-col gap-y-4 overflow-hidden", className)}
    >
      {children}
    </div>
  );
};

export const Fluid: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn("flex items-center gap-x-8 overflow-x-auto", className)}
    >
      {children}
    </div>
  );
};

export default function Home({
  cms,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const cities = useCities();
  const recent = useRecent();
  const { asPath, locale } = useRouter();
  const [isLoading, setLoading] = useState(true);
  const canonical = process.env.NEXT_PUBLIC_URL + asPath.split("?")[0];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": process.env.NEXT_PUBLIC_URL + "/#organization",
    name: "Frontend",
    url: process.env.NEXT_PUBLIC_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Uppsala",
      addressCountry: "Sweden",
      postalCode: "75231",
      streetAddress: "Gösta Wahlströms väg 2",
    },
    logo: process.env.NEXT_PUBLIC_URL + "/logo.png",
    description: cms.meta.description,
    sameAs: [],
  };
  return (
    <>
      <NextSeo
        canonical={canonical}
        description={cms.meta.description}
        title={cms.meta.title}
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <div className="grid gap-10">
        <div className="relative -mx-6 -mt-10 min-h-96 w-screen lg:mx-0 lg:mt-0 lg:w-full">
          <span className="absolute inset-0 z-10 bg-gradient-to-b from-gray-900 opacity-40 lg:hidden" />
          <Image
            alt={cms.hero.media.alt}
            className={cn(
              isLoading ? "blur-sm" : "blur-0",
              "object-cover object-bottom transition-all duration-300 lg:rounded-lg",
            )}
            fill
            onLoadingComplete={() => setLoading(false)}
            priority
            sizes="100%"
            src={cms.hero.media.url}
          />
        </div>
        <Search
          cta={translation[locale as keyof typeof translation]["search"]}
          placeholder={cms.layout[0].blockName}
        />
        <Container>
          <Subheader>
            {translation[locale as keyof typeof translation][
              "categories"
            ][0].toUpperCase()}
            {translation[locale as keyof typeof translation][
              "categories"
            ].slice(1)}
          </Subheader>
          <Fluid>
            {categories.map((item) => (
              <a
                className="flex items-center gap-x-3 rounded-xl bg-white px-5 py-2.5 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                href={`/${locale}${
                  item[locale as keyof typeof translation]["href"]
                }`}
                key={item[locale as keyof typeof translation]["name"]}
              >
                <item.icon className="h-6 w-6" />
                <span>{item[locale as keyof typeof translation]["name"]}</span>
              </a>
            ))}
          </Fluid>
        </Container>
        <Container className="lg:gap-y-6">
          <H1>{cms.hero.richText[0].children[0].text}</H1>
          <P>{cms.layout[0].richText[0].children[0].text}</P>
        </Container>
        <Container>
          <Subheader>{cms.layout[1].blockName}</Subheader>
          <Fluid>
            {cms.layout[1].columns.map((item, index) => (
              <div
                className="h-full min-w-full lg:w-1/3 lg:min-w-0"
                key={index}
              >
                <div className="flex h-full flex-col gap-y-4 rounded-2xl border border-gray-300 p-8">
                  <span className="text-2xl">0{index + 1}</span>
                  <P className="text-base lg:text-base">
                    {item.richText[0].children[0].text}
                  </P>
                </div>
              </div>
            ))}
          </Fluid>
        </Container>
        <Container>
          <Subheader>
            {translation[locale as keyof typeof translation][
              "recent listings"
            ][0].toUpperCase()}
            {translation[locale as keyof typeof translation][
              "recent listings"
            ].slice(1)}
          </Subheader>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {recent.data ? (
              <>
                {recent.data?.map((item) => (
                  <Card.Body className="w-full" key={item._id}>
                    {isLoading ? <Card.Skeleton /> : <Listing listing={item} />}
                  </Card.Body>
                ))}
              </>
            ) : (
              <>
                {Array.from({ length: 8 }).map((_, index) => (
                  <Card.Skeleton key={index} />
                ))}
              </>
            )}
          </div>
        </Container>
        <Container>
          <Subheader>
            {translation[locale as keyof typeof translation][
              "popular cities"
            ][0].toUpperCase()}
            {translation[locale as keyof typeof translation][
              "popular cities"
            ].slice(1)}
          </Subheader>
          <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
            {cities.data?.map((item) => (
              <Chip.Wrapper key={item._id}>
                <Chip.A
                  href={`/${locale}/${
                    locale === "en" ? "rent-housing" : "hyra-bostad"
                  }/${item.city_formatted}`}
                >
                  <span>{item._id[0].toUpperCase() + item._id.slice(1)}</span>
                  <span>{item.count}</span>
                </Chip.A>
              </Chip.Wrapper>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps = (async (context) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_API}/pages/6591ae6ddf0ff8a96c6bf86d?locale=${context.locale}&draft=true&depth=1`,
  );
  const cms = await res.json();
  return {
    props: {
      cms,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}) as GetStaticProps<{
  cms: CmsWithRichTextAndColumns;
}>;
