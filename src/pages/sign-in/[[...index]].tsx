import dynamic from "next/dynamic";
import Head from "next/head";

const SignIn = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignIn),
  {
    ssr: false,
  },
);

/**
 * @see https://clerk.com/docs/quickstarts/nextjs
 */
export default function Page() {
  return (
    <>
      <Head>
        <meta content="noindex,nofollow" name="robots" />
      </Head>
      <div className="flex justify-center">
        <SignIn />
      </div>
    </>
  );
}
