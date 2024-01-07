import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Albert_Sans } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";

const Banner = dynamic(
  () => import("@/components/banner").then((mod) => mod.Banner),
  { ssr: false },
);

const Footer = dynamic(
  () => import("@/components/footer").then((mod) => mod.Footer),
  { ssr: false },
);

const Header = dynamic(
  () => import("@/components/header").then((mod) => mod.Header),
  { ssr: false },
);

const Layout = dynamic(
  () => import("@/components/layout").then((mod) => mod.Layout),
  { ssr: false },
);

const albert_sans = Albert_Sans({
  subsets: ["latin"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const pagesWithHeroImage = [
  "/",
  "/blog",
  "/blogg",
  "/blog/[slug]",
  "/blogg/[slug]",
];

export const PATHS = [
  "hyra-bostad",
  "hyra-lagenhet",
  "hyra-hus",
  "hyra-stuga",
  "hyra-rum",
  "rent-housing",
  "rent-apartment",
  "rent-house",
  "rent-cabin",
  "rent-room",
];

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <style global jsx>{`
        html {
          font-family: ${albert_sans.style.fontFamily};
        }
      `}</style>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-NEM0C7BL54"
        strategy="afterInteractive"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('consent', 'default', {
            'analytics_storage': 'denied'
          });

          gtag('config', 'G-NEM0C7BL54');
        `}
      </Script>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider {...pageProps}>
          <div className="flex flex-col p-6 lg:py-12">
            <Header router={router} />
            <Layout router={router}>
              <Component {...pageProps} />
            </Layout>
            <Banner router={router} />
            <Footer />
          </div>
          <Toaster />
        </ClerkProvider>
      </QueryClientProvider>
    </>
  );
}
