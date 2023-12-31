import { H2, P } from "@/components/content";
import { useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Sidenav = dynamic(() => import(".").then((mod) => mod.Sidenav), {
  ssr: false,
});

const translation = {
  en: {
    billing: "billing",
    description: "manage your subscriptions and other payment methods.",
    "manage subscription": "manage subscription",
  },
  sv: {
    billing: "prenumeration",
    description: "hantera dina prenumerationer och andra betalningsmetoder.",
    "manage subscription": "hantera pernumeration",
  },
};

export default function Prenumeration() {
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
                "billing"
              ][0].toUpperCase() +
                translation[locale as keyof typeof translation][
                  "billing"
                ].slice(1)}
            </H2>
            <P className="mt-1">
              {translation[locale as keyof typeof translation][
                "description"
              ][0].toUpperCase() +
                translation[locale as keyof typeof translation][
                  "description"
                ].slice(1)}
            </P>

            <div className="flex pt-6">
              <a
                className="font-semibold leading-6 text-secondary hover:text-secondary/80"
                href={
                  process.env.NEXT_PUBLIC_STRIPE_PORTAL +
                  "?prefilled_email=" +
                  user?.primaryEmailAddress?.emailAddress
                }
              >
                {translation[locale as keyof typeof translation][
                  "manage subscription"
                ][0].toUpperCase() +
                  translation[locale as keyof typeof translation][
                    "manage subscription"
                  ].slice(1)}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
