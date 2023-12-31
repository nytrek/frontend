import { useFooter } from "@/hooks/useFooter";
import { useRouter } from "next/router";

const translation = {
  en: {
    "Discover Sweden's rental housings all in one place!":
      "Discover Sweden's rental housings all in one place!",
  },
  sv: {
    "Discover Sweden's rental housings all in one place!":
      "Upptäck Sveriges hyresbostäder på ett och samma ställe!",
  },
};

export const Footer: React.FC = () => {
  const { data } = useFooter();
  const { locale } = useRouter();
  return (
    <footer className="mx-auto grid w-full max-w-screen-2xl gap-8 py-12 text-base lg:grid-cols-4">
      <div>
        <mark className="bg-transparent">© 2023 frontend.nytrek.dev</mark>
        <p>
          {
            translation[locale as keyof typeof translation][
              "Discover Sweden's rental housings all in one place!"
            ]
          }
        </p>
        <a
          className="text-secondary underline hover:no-underline"
          href="https://locationiq.com"
          rel="nofollow"
        >
          Search by LocationIQ.com
        </a>
      </div>
      <div className="col-span-3 grid grid-cols-2 gap-10 font-medium lg:grid-cols-3">
        <ul className="space-y-4 lg:ml-auto">
          {data?.navItemsNytrek.map((item) => (
            <li className="w-fit" key={item.link.label}>
              <a
                aria-label={item.link.label}
                className="text-secondary"
                href={item.link.url}
              >
                <span className="group">
                  <span>{item.link.label}</span>
                  <hr className="w-0 border-secondary transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <ul className="space-y-4 lg:ml-auto">
          {data?.navItemsCategories.map((item) => (
            <li className="w-fit" key={item.link.label}>
              <a
                aria-label={item.link.label}
                className="text-secondary"
                href={item.link.url}
              >
                <span className="group">
                  <span>{item.link.label}</span>
                  <hr className="w-0 border-secondary transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <ul className="space-y-4 lg:ml-auto">
          {data?.navItemsTerms.map((item) => (
            <li className="w-fit" key={item.link.label}>
              <a
                aria-label={item.link.label}
                className="text-secondary"
                href={item.link.url}
              >
                <span className="group">
                  <span>{item.link.label}</span>
                  <hr className="w-0 border-secondary transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
