import { SignUp } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { plans } from "@/storage";
import { cn } from "@/utils/cn";
import { useUser } from "@clerk/nextjs";
import { RadioGroup } from "@headlessui/react";
import {
  CheckCircleIcon,
  CreditCardIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { Modal } from "./modal";

const Benefits: React.FC<{
  benefits: string[];
}> = ({ benefits }) => {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {benefits.map((item) => (
        <div className="flex items-center space-x-1" key={item}>
          <CheckCircleIcon className="h-6 w-6 text-primary" />
          <p className="text-xs leading-6 text-gray-600">{item}</p>
        </div>
      ))}
    </div>
  );
};

const MasterCard: React.FC<React.HTMLProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      fill="none"
      height={28}
      width={45}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)">
        <path d="M0 0h45v28H0V0Z" fill="#000" />
        <path
          d="M27.91 4.704H17.093v17.589h10.815V4.704h.002Z"
          fill="#FF5F00"
        />
        <path
          d="M18.208 13.5a11.126 11.126 0 0 1 1.127-4.889 11.175 11.175 0 0 1 3.163-3.904 11.276 11.276 0 0 0-11.852-1.266 11.217 11.217 0 0 0-4.611 4.127 11.15 11.15 0 0 0 0 11.868 11.217 11.217 0 0 0 4.612 4.126 11.276 11.276 0 0 0 11.85-1.266 11.176 11.176 0 0 1-3.162-3.905 11.126 11.126 0 0 1-1.127-4.891Z"
          fill="#EB001B"
        />
        <path
          d="M39.602 20.432v-.36h.156v-.075h-.372v.074h.147v.36l.069.001Zm.72 0v-.435h-.112l-.13.31-.132-.31h-.112v.435h.081v-.33l.122.283h.084l.122-.283v.33h.078-.001Zm.353-6.932a11.15 11.15 0 0 1-1.711 5.934 11.218 11.218 0 0 1-4.613 4.127 11.275 11.275 0 0 1-11.853-1.268 11.194 11.194 0 0 0 3.163-3.906 11.146 11.146 0 0 0 0-9.778 11.193 11.193 0 0 0-3.163-3.905A11.276 11.276 0 0 1 34.35 3.436a11.216 11.216 0 0 1 4.614 4.126 11.149 11.149 0 0 1 1.711 5.935v.003Z"
          fill="#F79E1B"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h45v28H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
};

const Visa: React.FC<React.HTMLProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      fill="none"
      height={28}
      width={45}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)">
        <path d="M0 0h45v28H0V0Z" fill="#fff" />
        <path
          d="m16.714 7.237-5.767 13.578H7.183L4.352 9.979c-.16-.66-.32-.923-.854-1.187-.855-.448-2.27-.896-3.498-1.16l.081-.395h6.06c.775 0 1.468.501 1.628 1.371l1.496 7.857 3.684-9.228h3.765Zm14.712 9.148c.025-3.585-5.02-3.77-4.967-5.377 0-.475.48-1.003 1.494-1.135a7.018 7.018 0 0 1 3.498.607l.614-2.874A9.405 9.405 0 0 0 28.728 7c-3.524 0-5.98 1.845-6.006 4.481-.028 1.951 1.76 3.032 3.096 3.692 1.389.659 1.842 1.081 1.842 1.687 0 .923-1.094 1.318-2.135 1.318-1.789.027-2.83-.475-3.658-.869l-.642 2.978c.829.37 2.378.713 3.952.713 3.792.025 6.248-1.794 6.248-4.615Zm9.29 4.43H44L41.116 7.237h-3.042c-.696 0-1.256.396-1.523 1.002l-5.34 12.576h3.739l.746-2.03h4.567l.453 2.03Zm-3.978-4.799 1.87-5.088 1.067 5.088h-2.937ZM21.786 7.238 18.85 20.815h-3.551l2.936-13.578h3.551Z"
          fill="#1334CB"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h45v28H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
};

const GooglePay: React.FC<React.HTMLProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      fill="none"
      height="32"
      viewBox="0 0 59 32"
      width="59"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M42.83 0.830185H16.1244C7.77884 0.830185 0.950684 7.62264 0.950684 15.9245C0.950684 24.2264 7.77884 31.0189 16.1244 31.0189H42.83C51.1755 31.0189 58.0037 24.2264 58.0037 15.9245C58.0037 7.62264 51.1755 0.830185 42.83 0.830185Z"
        fill="white"
      />
      <path
        d="M42.83 2.05283C44.704 2.05283 46.5248 2.42264 48.2394 3.14717C49.901 3.84905 51.388 4.85283 52.6777 6.1283C53.9599 7.40377 54.969 8.89056 55.6745 10.5434C56.4029 12.2491 56.7746 14.0604 56.7746 15.9245C56.7746 17.7887 56.4029 19.6 55.6745 21.3057C54.969 22.9585 53.9599 24.4377 52.6777 25.7208C51.3956 26.9962 49.901 28 48.2394 28.7019C46.5248 29.4264 44.704 29.7962 42.83 29.7962H16.1244C14.2504 29.7962 12.4296 29.4264 10.7149 28.7019C9.05343 28 7.56641 26.9962 6.27664 25.7208C4.99447 24.4453 3.98542 22.9585 3.27984 21.3057C2.55151 19.6 2.17975 17.7887 2.17975 15.9245C2.17975 14.0604 2.55151 12.2491 3.27984 10.5434C3.98542 8.89056 4.99447 7.41132 6.27664 6.1283C7.55882 4.85283 9.05343 3.84905 10.7149 3.14717C12.4296 2.42264 14.2504 2.05283 16.1244 2.05283H42.83ZM42.83 0.830185H16.1244C7.77884 0.830185 0.950684 7.62264 0.950684 15.9245C0.950684 24.2264 7.77884 31.0189 16.1244 31.0189H42.83C51.1755 31.0189 58.0037 24.2264 58.0037 15.9245C58.0037 7.62264 51.1755 0.830185 42.83 0.830185Z"
        fill="#3C4043"
      />
      <path
        d="M28.1574 16.9962V21.5623H26.7007V10.2868H30.5624C31.5411 10.2868 32.3756 10.6113 33.0585 11.2604C33.7564 11.9094 34.1054 12.7019 34.1054 13.6377C34.1054 14.5962 33.7564 15.3887 33.0585 16.0302C32.3832 16.6717 31.5487 16.9887 30.5624 16.9887H28.1574V16.9962ZM28.1574 11.6755V15.6075H30.5927C31.1693 15.6075 31.6549 15.4113 32.0342 15.0264C32.4212 14.6415 32.6184 14.1736 32.6184 13.6453C32.6184 13.1245 32.4212 12.6641 32.0342 12.2792C31.6549 11.8792 31.1769 11.683 30.5927 11.683H28.1574V11.6755Z"
        fill="#3C4043"
      />
      <path
        d="M37.914 13.5925C38.9913 13.5925 39.8411 13.8792 40.4632 14.4528C41.0853 15.0264 41.3964 15.8113 41.3964 16.8075V21.5623H40.008V20.4906H39.9473C39.3479 21.3736 38.5437 21.8113 37.5422 21.8113C36.6849 21.8113 35.9718 21.5623 35.3952 21.0566C34.8186 20.5509 34.5303 19.9245 34.5303 19.1698C34.5303 18.3698 34.8337 17.7358 35.4407 17.2679C36.0476 16.7925 36.8594 16.5585 37.8685 16.5585C38.7334 16.5585 39.4465 16.717 40.0004 17.034V16.7019C40.0004 16.1962 39.8031 15.7736 39.401 15.4189C38.9989 15.0641 38.5285 14.8906 37.9899 14.8906C37.1781 14.8906 36.5332 15.2302 36.0628 15.917L34.7806 15.117C35.4862 14.0981 36.5332 13.5925 37.914 13.5925ZM36.0325 19.1925C36.0325 19.5698 36.1918 19.8868 36.518 20.1358C36.8367 20.3849 37.216 20.5132 37.6485 20.5132C38.263 20.5132 38.8093 20.2868 39.2872 19.834C39.7652 19.3811 40.008 18.8528 40.008 18.2415C39.5528 17.8868 38.9231 17.7057 38.1113 17.7057C37.5195 17.7057 37.0263 17.8491 36.6318 18.1283C36.2297 18.4226 36.0325 18.7774 36.0325 19.1925Z"
        fill="#3C4043"
      />
      <path
        d="M49.3172 13.8415L44.4616 24.9509H42.9595L44.7651 21.0642L41.5635 13.8415H43.1491L45.4555 19.3811H45.4859L47.7316 13.8415H49.3172Z"
        fill="#3C4043"
      />
      <path
        d="M22.363 16.0755C22.363 15.603 22.3205 15.1509 22.2416 14.7162H16.1357V17.2068L19.6522 17.2075C19.5096 18.0362 19.0506 18.7426 18.3473 19.2136V20.8294H20.4405C21.6628 19.7041 22.363 18.0407 22.363 16.0755Z"
        fill="#4285F4"
      />
      <path
        d="M18.3479 19.2136C17.7652 19.6045 17.0149 19.8332 16.1371 19.8332C14.4414 19.8332 13.003 18.6966 12.4878 17.1645H10.3286V18.8309C11.3984 20.9426 13.597 22.3917 16.1371 22.3917C17.8927 22.3917 19.3676 21.8174 20.4411 20.8287L18.3479 19.2136Z"
        fill="#34A853"
      />
      <path
        d="M12.2847 15.9283C12.2847 15.4981 12.3568 15.0823 12.4881 14.6913V13.0249H10.3289C9.88654 13.8981 9.6377 14.8838 9.6377 15.9283C9.6377 16.9728 9.8873 17.9585 10.3289 18.8317L12.4881 17.1653C12.3568 16.7743 12.2847 16.3585 12.2847 15.9283Z"
        fill="#FABB05"
      />
      <path
        d="M16.1371 12.0226C17.0953 12.0226 17.9534 12.3509 18.6309 12.9924L20.4859 11.1487C19.3592 10.1049 17.8904 9.46414 16.1371 9.46414C13.5978 9.46414 11.3984 10.9132 10.3286 13.0249L12.4878 14.6913C13.003 13.1592 14.4414 12.0226 16.1371 12.0226Z"
        fill="#E94235"
      />
    </svg>
  );
};

const ApplePay: React.FC<React.HTMLProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      fill="none"
      height={19}
      width={44}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.159 2.36c.5-.644.858-1.502.75-2.36-.75.036-1.644.5-2.18 1.108-.464.536-.893 1.43-.786 2.252.858.107 1.68-.358 2.216-1Zm.75 1.214c-1.215-.071-2.251.68-2.823.68-.572 0-1.466-.644-2.43-.644-1.252.036-2.396.715-3.039 1.859-1.287 2.252-.357 5.576.93 7.399.607.893 1.358 1.894 2.323 1.858.93-.035 1.287-.607 2.395-.607s1.43.607 2.43.572c1.001-.036 1.644-.894 2.252-1.823.715-1.037 1-2.038 1-2.073-.035-.036-1.965-.75-1.965-2.967-.036-1.859 1.501-2.752 1.573-2.788-.822-1.287-2.18-1.43-2.645-1.466ZM19.418 1.037c2.646 0 4.468 1.823 4.468 4.432 0 2.645-1.858 4.468-4.54 4.468h-2.894v4.61h-2.11V1.038h5.076Zm-2.966 7.148h2.394c1.823 0 2.86-1 2.86-2.68 0-1.716-1.037-2.681-2.86-2.681h-2.43v5.361h.036Zm7.97 3.61c0-1.715 1.323-2.788 3.682-2.93l2.717-.143V7.97c0-1.108-.75-1.752-1.966-1.752-1.18 0-1.895.572-2.073 1.43h-1.93c.107-1.787 1.644-3.11 4.074-3.11 2.395 0 3.932 1.252 3.932 3.253v6.792h-1.93v-1.609h-.036c-.572 1.108-1.823 1.787-3.11 1.787-2.001 0-3.36-1.215-3.36-2.966Zm6.399-.893v-.786l-2.43.143c-1.216.071-1.895.607-1.895 1.465 0 .858.715 1.43 1.787 1.43 1.43 0 2.538-.965 2.538-2.252Zm3.824 7.327v-1.644c.143.036.5.036.644.036.93 0 1.43-.393 1.751-1.394 0-.036.179-.608.179-.608l-3.575-9.865h2.18l2.503 8.042h.036l2.502-8.042h2.144l-3.681 10.401c-.858 2.395-1.823 3.146-3.86 3.146-.144-.036-.644-.036-.823-.072Z"
        fill="#000"
      />
    </svg>
  );
};

const benefits = [
  "10,000+ Annonser",
  "1000+ Hyresvärdar",
  "Sveriges största utbud!",
];

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Payment: React.FC<Props> = ({ open, setOpen }) => {
  const { user } = useUser();
  const { push } = useRouter();
  const [auth, setAuth] = useState(false);
  const [selected, setSelected] = useState(plans[0]);
  return (
    <Modal open={open} position="center" setOpen={setOpen}>
      {auth ? (
        <div className="flex flex-col">
          <button
            className="ml-auto rounded-md bg-white text-gray-400 hover:text-gray-500"
            onClick={() => setOpen(false)}
            type="button"
          >
            <span className="sr-only">Close</span>
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
          <SignUp cb={() => null} type="payment" />
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h4 className="text-lg font-semibold leading-7 text-gray-900 lg:text-xl">
              Medlemskap
            </h4>
            <button
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
              onClick={() => setOpen(false)}
              type="button"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 space-y-6">
            <RadioGroup onChange={setSelected} value={selected}>
              <RadioGroup.Label className="sr-only">
                Pricing plan
              </RadioGroup.Label>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <RadioGroup.Option
                    className={({ active }) =>
                      cn(
                        active
                          ? "border-primary ring-2 ring-primary"
                          : "border-gray-300",
                        "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between",
                      )
                    }
                    key={plan.name}
                    value={plan}
                  >
                    {({ active, checked }) => (
                      <>
                        <span className="flex items-center">
                          <span className="flex flex-col text-sm">
                            <RadioGroup.Label
                              as="span"
                              className="font-medium text-gray-900"
                            >
                              {plan.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className="text-gray-500"
                            >
                              <span className="block sm:inline">
                                {plan.description}
                              </span>
                            </RadioGroup.Description>
                          </span>
                        </span>
                        <RadioGroup.Description
                          as="span"
                          className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                        >
                          <div className="flex items-center space-x-1.5">
                            <span className="text-gray-500 line-through">
                              {plan.originalPrice}
                            </span>
                            <span className="font-medium text-gray-900">
                              {plan.price}
                            </span>
                          </div>
                          <span className="ml-1 text-gray-500 sm:ml-0">
                            /vecka
                          </span>
                        </RadioGroup.Description>
                        <span
                          aria-hidden="true"
                          className={cn(
                            active ? "border" : "border-2",
                            checked ? "border-primary" : "border-transparent",
                            "pointer-events-none absolute -inset-px rounded-lg",
                          )}
                        />
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
            <Button
              className="flex w-full items-center justify-center space-x-2 py-3"
              intent="primary"
              onClick={() =>
                user
                  ? push(
                      process.env.NEXT_PUBLIC_STRIPE_LINK_PROD +
                        "&prefilled_email=" +
                        user.primaryEmailAddress?.emailAddress,
                      "_blank",
                    )
                  : setAuth(true)
              }
              type="button"
            >
              <CreditCardIcon className="h-6 w-6" />
              <span>Få tillgång nu</span>
            </Button>
            <div className="flex justify-center">
              <Benefits benefits={benefits} />
            </div>
            <p className="text-center text-sm leading-6 text-gray-600">
              Säker betalning genom vår betalningssida
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <MasterCard />
              <Visa />
              <GooglePay />
              <ApplePay />
            </div>
            <p className="text-center text-xs leading-4 text-gray-500">
              Du kommer att få tillgång till samtliga hyresvärdar på vår
              webbsida i 7 dagar för 19kr. Därefter kommer prenumerationen
              förnyas för 79kr/vecka efter att provperioden på 7 dagar
              avslutats. Du är inte bunden till någonting utan kan när som helst
              avsluta din prenumeration via dina personliga inställningar.
            </p>
          </div>
        </>
      )}
    </Modal>
  );
};
