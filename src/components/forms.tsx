import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import * as Card from "@/components/ui/card";
import * as Feedback from "@/components/ui/feedback";
import * as Input from "@/components/ui/input";
import * as Toggle from "@/components/ui/toggle";
import { useRecent } from "@/hooks/useRecent";
import { Container, Subheader } from "@/pages";
import translation from "@/pages/_translation.json";
import { Logo } from "@/pages/redirect";
import { AuthSchema } from "@/utils/schemas";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type z } from "zod";
import { Listing } from "./listing";
import { Form } from "./ui/form";

export const SignUp: React.FC<{
  cb: () => void;
  type: "auth" | "like" | "payment";
}> = ({ cb, type }) => {
  const recent = useRecent();
  const { locale } = useRouter();
  const [error, setError] = useState("");
  const { signUp, setActive } = useSignUp();
  const { push, route } = useRouter();
  const [success, setSuccess] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
  });
  const onSubmit: SubmitHandler<z.infer<typeof AuthSchema>> = async (d) => {
    try {
      if (!enabled)
        return setError(
          "Du måste acceptera våra vilkor och policy innan du kan fortsätta vidare.",
        );
      setLoading(true);
      const response = await signUp?.create({
        emailAddress: d.email,
      });
      if (response?.status === "complete") {
        if (type === "auth") {
          setSuccess(true);
          setActive && setActive({ session: response.createdSessionId });
        } else if (type === "payment")
          push(
            process.env.NEXT_PUBLIC_STRIPE_LINK_PROD +
              "&prefilled_email=" +
              response.emailAddress,
          );
        else {
          cb();
          setActive && setActive({ session: response.createdSessionId });
        }
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.errors[0].longMessage);
    }
  };
  return (
    <>
      {success ? (
        <div className="grid w-full gap-y-12">
          <div className="relative mx-auto h-10 w-12">
            <Logo alt="logo" src="/whale-logo.png" />
          </div>
          <Feedback.Wrapper>
            <Feedback.Subheader>Välkommen</Feedback.Subheader>
            <Feedback.Header>Ditt konto har skapats</Feedback.Header>
            <Feedback.Text>
              Nedan hittar du några av våra senaste annonser.
            </Feedback.Text>
          </Feedback.Wrapper>
          <Container>
            <Subheader>
              {translation[locale as keyof typeof translation][
                "recent listings"
              ][0].toUpperCase()}
              {translation[locale as keyof typeof translation][
                "recent listings"
              ].slice(1)}
            </Subheader>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {recent.data ? (
                <>
                  {recent.data?.map((item) => (
                    <Card.Body className="w-full" key={item._id}>
                      {recent.isLoading ? (
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
      ) : (
        <div className="py-12">
          <div className="relative mx-auto h-10 w-12">
            <Logo alt="logo" src="/whale-logo.png" />
          </div>
          <h4 className="mt-10 text-center text-lg font-semibold leading-7 text-gray-900 lg:text-xl">
            Skapa ditt konto
          </h4>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Input.Wrapper className="sm:col-span-2">
                <Input.Label htmlFor="email" id="email">
                  E-postadress
                </Input.Label>
                <Input.Field {...register("email")} required type="email" />
              </Input.Wrapper>
              {errors.email?.message && (
                <p className="text-sm leading-4 text-red-500 sm:col-span-2">
                  {errors.email.message}
                </p>
              )}
              <Toggle.Wrapper className="sm:col-span-2">
                <Toggle.Body
                  enabled={enabled}
                  setEnabled={setEnabled}
                ></Toggle.Body>
                <Toggle.Label>
                  <span className="font-medium text-gray-900">
                    Jag accepterar
                  </span>{" "}
                  <a className="text-secondary underline" href="/villkor">
                    Användarvillkoren
                  </a>{" "}
                  och{" "}
                  <a
                    className="text-secondary underline"
                    href="/integritetspolicy"
                  >
                    Integritetspolicyn
                  </a>
                </Toggle.Label>
              </Toggle.Wrapper>
              <div className="sm:col-span-2">
                <Button className="w-full" intent="primary">
                  {loading ? <Loading className="text-white" /> : "Skapa konto"}
                </Button>
              </div>
              <div className="flex items-center space-x-1.5 text-sm sm:col-span-2">
                <p className="leading-4 text-gray-700">
                  Har du redan ett konto?
                </p>
                <a className="text-secondary underline" href="/sign-in">
                  Logga in
                </a>
              </div>
              {error && (
                <p className="text-sm leading-4 text-red-500 sm:col-span-2">
                  {error}
                </p>
              )}
              {!route.includes("/sign-up") && (
                <p className="text-sm leading-4 text-gray-500 sm:col-span-2">
                  Du kommer att omdirigeras till vår betalningssida efter att
                  kontot är skapat.
                </p>
              )}
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
