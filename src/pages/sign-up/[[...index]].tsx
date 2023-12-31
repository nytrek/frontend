import { useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignUp = dynamic(
  () => import("@/components/forms").then((mod) => mod.SignUp),
  {
    ssr: false,
  },
);

/**
 * @see https://clerk.com/docs/quickstarts/nextjs
 */
export default function Page() {
  const { push } = useRouter();
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (user && isLoaded) push("/");
  }, [user, isLoaded, push]);
  return (
    <>
      <Head>
        <meta content="noindex,nofollow" name="robots" />
      </Head>
      {isLoaded && (
        <div className="flex justify-center">
          <SignUp cb={() => null} type="auth" />
        </div>
      )}
    </>
  );
}
