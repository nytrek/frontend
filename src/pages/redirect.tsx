import * as Feedback from "@/components/ui/feedback";
import { cn } from "@/utils/cn";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image, { type ImageProps } from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Loading = dynamic(
  () => import("@/components/loading").then((mod) => mod.Loading),
  { ssr: false },
);

export const Logo: React.FC<ImageProps> = (props) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      {...props}
      alt={props.alt}
      className={cn(
        props.className,
        "h-full w-full object-cover text-[0] duration-300 ease-in-out",
        isLoading ? "blur-sm" : "blur-0",
      )}
      fill
      loading="lazy"
      onLoadingComplete={() => setLoading(false)}
      sizes="100%"
    />
  );
};

export default function Redirect() {
  const { push } = useRouter();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        localStorage.getItem("redirect_url") &&
        typeof window.gtag !== "undefined"
      ) {
        window.gtag("event", "conversion", {
          send_to: "AW-10825314282/ABAgCIOel-oYEOrf9Kko",
          transaction_id: "",
        });
        push(localStorage.getItem("redirect_url") as string);
      } else push("/");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [push]);
  return (
    <>
      <Head>
        <meta content="noindex,nofollow" name="robots" />
      </Head>
      <div className="grid gap-10">
        <div className="relative mx-auto h-10 w-12">
          <Image
            alt="logo"
            className={cn(
              "h-full w-full object-cover text-[0] duration-300 ease-in-out",
              isLoading ? "blur-sm" : "blur-0",
            )}
            fill
            loading="lazy"
            onLoadingComplete={() => setLoading(false)}
            sizes="100%"
            src="/whale-logo.png"
          />
        </div>
        <Feedback.Wrapper>
          <Feedback.Subheader>Välkommen</Feedback.Subheader>
          <Feedback.Header>Tack för ditt köp</Feedback.Header>
          <Feedback.Text>
            Vi ser fram emot att få hjälpa i din resa att hitta en ny bostad
          </Feedback.Text>
        </Feedback.Wrapper>
        <Loading className="text-primary" />
      </div>
    </>
  );
}
