import { consentAtom } from "@/lib/atoms";
import { cn } from "@/utils/cn";
import { useAtom } from "jotai";
import type { Router } from "next/router";
import { useEffect, useState } from "react";

const translation = {
  en: {
    cookies: "cookies",
    description: `This website uses cookies. Cookies enable us to provide a more tailored service to you as a visitor and save anonymized user data. Some cookies are used for statistics, and others are used by third-party services. By clicking Accept, you consent to the use of cookies.`,
    "about cookies": "about cookies",
    accept: "accept",
    decline: "decline",
  },
  sv: {
    cookies: "kakor",
    description: `Den här hemsidan använder cookies. Cookies gör det möjligt för oss att erbjuda en bättre anpassad tjänst till dig som besökare samt sparandet av anonymiserad användardata. Några cookies används till statistik och andra av tredjepartstjänster. Genom att klicka Acceptera godkänner du användandet av cookies.`,
    "about cookies": "om kakor",
    accept: "acceptera",
    decline: "neka",
  },
};

export const Banner: React.FC<{ router: Router }> = ({ router }) => {
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useAtom(consentAtom);
  useEffect(() => {
    if (typeof consent === "boolean") {
      if (consent) {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
        });
      } else {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
        });
      }
      setShow(false);
    } else {
      setShow(true);
    }
  }, [consent, setConsent]);
  const handleAccept = () => {
    setShow(false);
    setConsent(true);
  };
  const handleReject = () => {
    setShow(false);
    setConsent(false);
  };
  return (
    <>
      {show && (
        <div
          className={cn(
            consent && "hidden",
            "pointer-events-none fixed inset-x-0 bottom-0 z-[60] px-6 pb-6",
          )}
        >
          <div className="pointer-events-auto mx-auto max-w-xl rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/10">
            <p className="text-sm leading-6 text-gray-900">
              {
                translation[router.locale as keyof typeof translation][
                  "description"
                ]
              }{" "}
              <a
                className="font-semibold text-secondary"
                href={`/${router.locale}/${
                  translation[router.locale as keyof typeof translation][
                    "cookies"
                  ]
                }`}
              >
                {translation[router.locale as keyof typeof translation][
                  "about cookies"
                ][0].toUpperCase() +
                  translation[router.locale as keyof typeof translation][
                    "about cookies"
                  ].slice(1)}
              </a>
              .
            </p>
            <div className="mt-4 flex flex-row-reverse items-center gap-x-5">
              <button
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                onClick={handleAccept}
                type="button"
              >
                {translation[router.locale as keyof typeof translation][
                  "accept"
                ][0].toUpperCase() +
                  translation[router.locale as keyof typeof translation][
                    "accept"
                  ].slice(1)}
              </button>
              <button
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={handleReject}
                type="button"
              >
                {translation[router.locale as keyof typeof translation][
                  "decline"
                ][0].toUpperCase() +
                  translation[router.locale as keyof typeof translation][
                    "decline"
                  ].slice(1)}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
