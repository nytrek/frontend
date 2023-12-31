import { Content } from "@/components/content";
import type { CmsWithColumns } from "@/utils/types";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Container, H1, P } from "..";

export default function OmOss({
  cms,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { asPath } = useRouter();
  const canonical = process.env.NEXT_PUBLIC_URL + asPath.split("?")[0];
  return (
    <>
      <NextSeo
        canonical={canonical}
        description={cms.meta.description}
        title={cms.meta.title}
      />
      <div className="grid gap-10">
        <Container>
          <H1 className="lg:text-4xl">{cms.meta.title}</H1>
          <P className="lg:text-lg">{cms.meta.description}</P>
        </Container>
        <Container>
          {cms.layout[0].columns.map((item, layoutIndex) => (
            <Fragment key={layoutIndex}>
              {item.richText.map((text, textIndex) => (
                <Content
                  key={textIndex}
                  type={text.type as "h2" | "h3" | undefined}
                >
                  {text.children[0].text}
                </Content>
              ))}
            </Fragment>
          ))}
        </Container>
      </div>
    </>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps = (async (context) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_API}/pages/6591ce00df0ff8a96c6bfced?locale=${context.locale}&draft=true&depth=1`,
  );
  const cms = await res.json();
  return {
    props: {
      cms,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}) as GetStaticProps<{
  cms: CmsWithColumns;
}>;
