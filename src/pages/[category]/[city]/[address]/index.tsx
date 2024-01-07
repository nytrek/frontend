import { H3 } from "@/components/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Card from "@/components/ui/card";
import { useCustomer } from "@/hooks/useCustomer";
import { useSuggestions } from "@/hooks/useSuggestions";
import { Container, H1, P, Subheader } from "@/pages";
import { PATHS } from "@/pages/_app";
import { details } from "@/storage";
import { cn } from "@/utils/cn";
import { Listing } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon as HeartIconOutline,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAfter } from "date-fns";
import "leaflet/dist/leaflet.css";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Slug } from "../..";

const Breadcrumbs = dynamic(
  () => import("@/pages/[category]").then((mod) => mod.Breadcrumbs),
  { ssr: false },
);

const Carousel = dynamic(() =>
  import("@material-tailwind/react").then((mod) => mod.Carousel),
);

const Listing = dynamic(
  () => import("@/components/listing").then((mod) => mod.Listing),
  { ssr: false },
);

const Loading = dynamic(
  () => import("@/components/loading").then((mod) => mod.Loading),
  { ssr: false },
);

const Map = dynamic(
  () => import("@/components/maps/address").then((mod) => mod.Map),
  { ssr: false },
);

const Markdown = dynamic(
  () => import("@/components/markdown").then((mod) => mod.Markdown),
  { ssr: false },
);

const Modal = dynamic(
  () => import("@/components/modal").then((mod) => mod.Modal),
  { ssr: false },
);

const Payment = dynamic(
  () => import("@/components/payment").then((mod) => mod.Payment),
  { ssr: false },
);

const SignUp = dynamic(
  () => import("@/components/forms").then((mod) => mod.SignUp),
  { ssr: false },
);

export const Prompt: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  return (
    <Modal open={open} position="center" setOpen={setOpen}>
      <div className="flex flex-col">
        <button
          className="ml-auto rounded-md bg-white text-gray-400 hover:text-gray-500"
          onClick={() => setOpen(false)}
          type="button"
        >
          <span className="sr-only">Close</span>
          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
        </button>
        <SignUp cb={() => setOpen(false)} type="like" />
      </div>
    </Modal>
  );
};

export default function Address({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user } = useUser();
  const { asPath, query, locale, replace } = useRouter();
  const [openPayment, setOpenPayment] = useState(false);
  const [openPrompt, setOpenPrompt] = useState(false);
  const customer = useCustomer();
  const suggestions = useSuggestions(data.city);
  const [isLoading, setLoading] = useState(true);
  const category = query.category as string;
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/listings/likes/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.id,
          }),
        },
      );
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const { error } = await response.json();
          throw new Error(
            error.message ? error.message : "Unable to perform like operation",
          );
        } else {
          throw new Error("Unable to perform like operation");
        }
      }
      return (await response.json()) as boolean;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["listing"],
      });
      queryClient.invalidateQueries({
        queryKey: ["listings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["popular"],
      });
      queryClient.invalidateQueries({
        queryKey: ["recent"],
      });
      queryClient.invalidateQueries({
        queryKey: ["suggestions"],
      });
      replace(asPath);
    },
  });
  const center = useMemo(() => {
    return {
      lat: data.lat,
      lng: data.lng,
    };
  }, [data]);
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
      name: data.city[0].toUpperCase() + data.city.slice(1),
      href: "/" + category + "/" + data.city_formatted,
    },
    {
      name: data.address[0].toUpperCase() + data.address.slice(1),
      href: asPath,
    },
  ];
  const breadcrumbData = {
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
        name: data.city[0].toUpperCase() + data.city.slice(1),
        item:
          process.env.NEXT_PUBLIC_URL +
          "/" +
          category +
          "/" +
          data.city_formatted,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: data.address[0].toUpperCase() + data.address.slice(1),
        item: process.env.NEXT_PUBLIC_URL + asPath,
      },
    ],
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@type": data.type,
    name: data.address[0].toUpperCase() + data.address.slice(1),
    description: data?.description ?? "",
    numberOfRooms: data.room,
    floorSize: {
      "@type": "QuantitativeValue",
      value: data.area,
      unitCode: "kvm",
    },
    petsAllowed: data.animal ? "Ja" : "Fråga hyresvärd",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SE",
      addressLocality: data.city,
      streetAddress: data.address,
    },
  };
  useEffect(() => {
    localStorage.setItem("redirect_url", asPath);
  }, [asPath]);
  return (
    <>
      <Head>
        {locale === "en" ||
          (isAfter(
            new Date(),
            new Date(data.expiredAt as string).setDate(
              new Date(data.expiredAt as string).getDate() - 45,
            ),
          ) && <meta content="noindex,nofollow" name="robots" />)}
      </Head>
      <NextSeo
        canonical={canonical}
        description={`Ledig bostad med ${data.room} rum på adressen ${
          data.address[0].toUpperCase() + data.address.slice(1)
        } i ${
          data.city[0].toUpperCase() + data.city.slice(1)
        } finns tillgängligt för uthyrning. Se annonsen här!`}
        title={`Hyr bostad på ${
          data.address[0].toUpperCase() + data.address.slice(1)
        } i ${data.city[0].toUpperCase() + data.city.slice(1)}`}
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <Payment open={openPayment} setOpen={setOpenPayment} />
      <Prompt open={openPrompt} setOpen={setOpenPrompt} />
      <div className="grid gap-10">
        <div className="relative -mx-6 -mt-10 min-h-96 w-screen lg:mx-0 lg:mt-0 lg:w-full">
          <Card.Content className="bottom-2 top-auto z-20 ml-auto h-auto w-fit justify-end p-0">
            <Button
              className="flex h-auto w-auto bg-transparent ring-0 hover:bg-transparent"
              intent="secondary"
              onClick={() =>
                user
                  ? toast.promise(mutateAsync(data._id), {
                      loading: "Laddar...",
                      success: (like) =>
                        like
                          ? "Annonsen har sparats i dina favoriter"
                          : "Annonsen har tagits bort från dina favoriter",
                      error: (err) => err.message,
                    })
                  : setOpenPrompt(true)
              }
            >
              <Badge className="rounded-full py-2">
                {user?.id && data.likes.includes(user?.id) ? (
                  <HeartIconSolid className="h-6 w-6" />
                ) : (
                  <HeartIconOutline className="h-6 w-6" />
                )}
              </Badge>
            </Button>
          </Card.Content>
          {data.images.length ? (
            <Carousel
              className="z-10 rounded-lg"
              loop={true}
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 transition duration-300">
                  {new Array(length >= 5 ? 5 : length).fill("").map((_, i) => (
                    <button
                      className={`h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex % 5 === i
                          ? "w-8 bg-white"
                          : "w-4 bg-white/50"
                      }`}
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      type="button"
                    />
                  ))}
                </div>
              )}
              nextArrow={({ loop, handleNext, lastIndex }) => (
                <button
                  className="!absolute right-4 top-2/4 z-50 grid h-12 max-h-[48px] w-12 max-w-[48px] -translate-y-2/4 select-none place-items-center rounded-full text-white transition-all duration-300 hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  disabled={!loop && lastIndex}
                  onClick={handleNext}
                >
                  <ChevronRightIcon className="ml-1 h-7 w-7" strokeWidth={3} />
                </button>
              )}
              prevArrow={({ loop, handlePrev, firstIndex }) => {
                return (
                  <button
                    className="!absolute left-4 top-2/4 z-50 grid h-12 max-h-[48px] w-12 max-w-[48px] -translate-y-2/4 select-none place-items-center rounded-full text-white transition-all duration-300 hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    disabled={!loop && firstIndex}
                    onClick={handlePrev}
                  >
                    <ChevronLeftIcon
                      className="-ml-1 h-7 w-7"
                      strokeWidth={3}
                    />
                  </button>
                );
              }}
            >
              {data.images.map((image) => (
                <div className="relative h-full min-h-[18rem]" key={image}>
                  <span className="absolute inset-0 z-10 bg-gradient-to-b from-gray-900 opacity-40 lg:hidden" />
                  <Card.Img overlay={false} src={image} />
                </div>
              ))}
            </Carousel>
          ) : (
            <Image
              alt="Annons bild på bostad"
              className={cn(
                isLoading ? "blur-sm" : "blur-0",
                "object-cover object-center transition-all duration-300 lg:rounded-lg",
              )}
              fill
              onLoadingComplete={() => setLoading(false)}
              priority
              sizes="100%"
              src="/thumbnail.png"
            />
          )}
        </div>
        <Breadcrumbs navigation={navigation} />
        <div className="flex items-center justify-between">
          <div>
            <H1 className="lg:text-4xl">
              {data.address[0].toUpperCase() + data.address.slice(1)},{" "}
              {data.city[0].toUpperCase() + data.city.slice(1)}
            </H1>
            <P className="lg:text-lg">{data.price} kr</P>
          </div>
          {customer.data ? (
            <a
              className="hidden flex-shrink-0 justify-center rounded-md bg-secondary px-3.5 py-3 text-base font-semibold text-white shadow-sm ring-0 ring-inset ring-gray-300 hover:bg-secondary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:flex"
              href={data.url}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Kontakta
            </a>
          ) : (
            <Button
              className="hidden flex-shrink-0 justify-center bg-secondary py-3 text-base ring-0 hover:bg-secondary/80 lg:flex"
              disabled={customer.isLoading}
              intent={"primary"}
              onClick={() => setOpenPayment(true)}
            >
              {customer.isLoading ? <Loading /> : <span>Kontakta</span>}
            </Button>
          )}
        </div>
        <div className="grid gap-y-6">
          <Map
            center={center}
            className="relative z-0 h-96 w-full rounded-lg"
            zoom={14}
          />
          <div className="relative grid grid-cols-2 gap-6 sm:grid-cols-5">
            {details.map((item) => (
              <div className="flex flex-col gap-y-1.5" key={item.index}>
                <H3 className="text-sm lg:text-sm">{item.name}</H3>
                <div className="flex items-center gap-x-1.5">
                  <item.icon className="h-5 w-5 sm:hidden" />
                  <P className="whitespace-nowrap text-sm lg:text-sm">
                    {item.detail(
                      data[item.index as keyof Listing] as string | boolean,
                    )}
                  </P>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Container>
          <H3>Beskrivning</H3>
          <Markdown>{data.description}</Markdown>
        </Container>
        <Container>
          <Subheader>
            Fler bostäder i {data.city[0].toUpperCase() + data.city.slice(1)}
          </Subheader>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {suggestions.data ? (
              <>
                {suggestions.data?.map((item) => (
                  <Card.Body className="w-full" key={item._id}>
                    {suggestions.isLoading ? (
                      <Card.Skeleton />
                    ) : (
                      <Listing listing={item} />
                    )}
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
      </div>
      <div className="fixed bottom-0 left-0 z-20 flex w-full items-center justify-between bg-white bg-opacity-75 p-6 backdrop-blur-sm lg:hidden">
        <div>
          <span className="text-sm text-gray-600">Månadshyra</span>
          <H3>{data.price} kr</H3>
        </div>
        {customer.data ? (
          <a
            className="flex flex-shrink-0 justify-center rounded-md bg-secondary px-3.5 py-3 text-base font-semibold text-white shadow-sm ring-0 ring-inset ring-gray-300 hover:bg-secondary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            href={data.url}
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            Kontakta
          </a>
        ) : (
          <Button
            className="flex flex-shrink-0 justify-center bg-secondary py-3 text-base ring-0 hover:bg-secondary/80"
            disabled={customer.isLoading}
            intent={"primary"}
            onClick={() => setOpenPayment(true)}
          >
            {customer.isLoading ? <Loading /> : <span>Kontakta</span>}
          </Button>
        )}
      </div>
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
        destination: `/${category}/${(context.query.city as string | undefined)
          ?.toLowerCase()
          .replaceAll("å", "a")
          .replaceAll("ä", "a")
          .replaceAll("ö", "o")
          .replaceAll(" ", "-")
          .replaceAll(",", "")}`,
      },
    };
  }
  const city = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/cities/${
      Slug[category.split("-")[1] as keyof typeof Slug]
    }/${context.query.city}`,
  );
  if (!city.ok)
    return {
      notFound: true,
      redirect: true,
    };
  const address = context.query.address as string;
  const id = address.split("-")[address.split("-").length - 1].slice(0, 24);
  const response = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + "/listings/" + id,
  );
  if (!response.ok)
    return {
      notFound: true,
      redirect: true,
    };
  try {
    const data = await response.json();
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return {
      notFound: true,
      redirect: true,
    };
  }
}) as GetServerSideProps<{
  data: Listing;
}>;
