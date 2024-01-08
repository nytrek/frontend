import { H2, P } from "@/components/content";
import * as Card from "@/components/ui/card";
import { useLikes } from "@/hooks/useLikes";
import { useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Listing = dynamic(
  () => import("@/components/listing").then((mod) => mod.Listing),
  {
    ssr: false,
  },
);

const Sidenav = dynamic(() => import(".").then((mod) => mod.Sidenav), {
  ssr: false,
});

const translation = {
  en: {
    "saved listings": "saved listings",
    description: "Here, your saved listings will be visible.",
  },
  sv: {
    "saved listings": "sparade annonser",
    description: "Här kommer dina sparade annonser att synas.",
  },
};

export default function Saved() {
  const { user, isLoaded } = useUser();
  const { push, locale } = useRouter();
  const { data, isLoading } = useLikes(user?.id);
  useEffect(() => {
    if (!user && isLoaded) push("/sign-in");
  }, [user, isLoaded, push]);
  return (
    <>
      <Head>
        <meta content="noindex,nofollow" name="robots" />
      </Head>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-16">
        <Sidenav />
        <div className="flex flex-col gap-y-10">
          <div>
            <H2>
              {translation[locale as keyof typeof translation][
                "saved listings"
              ][0].toUpperCase() +
                translation[locale as keyof typeof translation][
                  "saved listings"
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
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {data ? (
              <>
                {data?.map((item) => (
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
        </div>
      </div>
    </>
  );
}
