import { Content } from "@/components/content";
import { cn } from "@/utils/cn";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import qs from "qs";
import { Fragment, useState } from "react";
import type { Article, Post } from ".";
import { Container, H1, P } from "..";

export default function Slug({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { asPath } = useRouter();
  const [isLoading, setLoading] = useState(true);
  const canonical = process.env.NEXT_PUBLIC_URL + asPath.split("?")[0];
  return (
    <>
      <NextSeo
        canonical={canonical}
        description={post.meta.description}
        title={post.meta.title}
      />
      <div className="grid gap-10">
        <div className="relative -mx-6 -mt-10 min-h-96 w-screen lg:mx-0 lg:mt-0 lg:w-full">
          <span className="absolute inset-0 z-10 bg-gradient-to-b from-gray-900 opacity-40 lg:hidden" />
          <Image
            alt={post.meta.image.alt}
            className={cn(
              isLoading ? "blur-sm" : "blur-0",
              "object-cover object-center transition-all duration-300 lg:rounded-lg",
            )}
            fill
            onLoadingComplete={() => setLoading(false)}
            priority
            sizes="100%"
            src={post.meta.image.url}
          />
        </div>
        <Container>
          <H1 className="lg:text-4xl">{post.meta.title}</H1>
          <P className="lg:text-lg">{post.meta.description}</P>
        </Container>
        <Container>
          {post.layout.map((item, postIndex) => (
            <Fragment key={postIndex}>
              {item.columns.map((column, columnIndex) => (
                <Fragment key={columnIndex}>
                  {column.richText.map((text, textIndex) => (
                    <Content
                      key={textIndex}
                      type={text.type as "h2" | "h3" | undefined}
                    >
                      {text.children[0].text}
                    </Content>
                  ))}
                </Fragment>
              ))}
            </Fragment>
          ))}
        </Container>
      </div>
    </>
  );
}

export const getStaticPaths = (async (context) => {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
  // Call an external API endpoint to get posts
  const paths: { params: { slug: string }; locale?: string }[] = [];
  for (const locale of context.locales ?? []) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_API}/posts?locale=${locale}`,
    );
    const posts = (await res.json()) as Article;
    posts.docs.forEach((post) => {
      if (post.slug) {
        paths.push({
          params: {
            slug: post.slug,
          },
          locale,
        });
      }
    });
  }
  // { fallback: false } means other routes should 404
  return { paths, fallback: "blocking" };
}) as GetStaticPaths;

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps = (async (context) => {
  const query = {
    slug: {
      equals: context.params?.slug,
    },
    // This query could be much more complex
    // and QS would handle it beautifully
  };
  const stringifiedQuery = qs.stringify(
    {
      where: query, // ensure that `qs` adds the `where` property, too!
    },
    { addQueryPrefix: true },
  );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_API}/posts${stringifiedQuery}&locale=${context.locale}`,
  );
  const post = await res.json();
  return {
    props: {
      post: post.docs[0],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}) as GetStaticProps<{
  post: Post;
}>;
