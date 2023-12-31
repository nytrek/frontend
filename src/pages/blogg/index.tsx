import { cn } from "@/utils/cn";
import type { CmsWithRichTextAndColumns } from "@/utils/types";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, H1, P } from "..";

export interface Post {
  id: string;
  title: string;
  publishedAt: string;
  hero: {
    type: string;
    richText: [
      {
        children: [
          {
            text: string;
          },
        ];
      },
    ];
    links: [];
    media: {
      id: string;
      alt: string;
      filename: string;
      mimeType: string;
      filesize: number;
      width: number;
      height: number;
      createdAt: string;
      updatedAt: string;
      url: string;
    };
  };
  layout: [
    {
      columns: [
        {
          size: string;
          richText: {
            children: [
              {
                text: string;
              },
            ];
            type: string;
          }[];
          link: {
            type: string;
            appearance: string;
          };
          id: string;
        },
      ];
      id: string;
      blockType: string;
    },
  ];
  premiumContent: [];
  slug: string;
  meta: {
    title: string;
    description: string;
    image: {
      id: string;
      alt: string;
      filename: string;
      mimeType: string;
      filesize: number;
      width: number;
      height: number;
      createdAt: string;
      updatedAt: string;
      url: string;
    };
  };
  _status: string;
  createdAt: string;
  updatedAt: string;
  populatedAuthors: [];
}

export interface Article {
  docs: Post[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: null;
}

export default function Blogg({
  cms,
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { asPath, locale } = useRouter();
  const [isLoading, setLoading] = useState(true);
  const canonical = process.env.NEXT_PUBLIC_URL + asPath.split("?")[0];
  return (
    <>
      <NextSeo
        canonical={canonical}
        description={cms.meta.description}
        title={cms.meta.title}
      />
      <div className="grid gap-10">
        <div className="relative -mx-6 -mt-10 min-h-96 w-screen lg:mx-0 lg:mt-0 lg:w-full">
          <span className="absolute inset-0 z-10 bg-gradient-to-b from-gray-900 opacity-40 lg:hidden" />
          <Image
            alt={cms.hero.media.alt}
            className={cn(
              isLoading ? "blur-sm" : "blur-0",
              "object-cover object-center transition-all duration-300 lg:rounded-lg",
            )}
            fill
            onLoadingComplete={() => setLoading(false)}
            priority
            sizes="100%"
            src={cms.hero.media.url}
          />
        </div>
        <Container>
          <H1 className="lg:text-4xl">
            {cms.hero.richText[0].children[0].text}
          </H1>
          <P className="lg:text-lg">
            {cms.layout[0].richText[0].children[0].text}
          </P>
        </Container>
        <div className="space-y-20">
          {articles.docs.map((post) => (
            <article
              className="relative isolate flex flex-col gap-8 lg:flex-row"
              key={post.id}
            >
              <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                <img
                  alt={post.hero.media.alt}
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                  src={post.hero.media.url}
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div>
                <div className="group relative max-w-xl">
                  <h3 className="mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={`/${locale}${asPath}/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.meta.title}
                    </a>
                  </h3>
                  <p className="mt-5 text-base leading-6 text-gray-600">
                    {post.meta.description}
                  </p>
                </div>
                <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                  <div className="relative flex items-center gap-x-4">
                    <img
                      alt="avatar"
                      className="h-10 w-10 rounded-full bg-gray-50"
                      src="https://media.discordapp.net/attachments/1153301798380118138/1161286819049115678/Author_profile_1.jpg?ex=6537bfa1&is=65254aa1&hm=bc55d617372319fbbefea4709a5999cfaea22b13372155afcb92e894267f54dc&=&width=1372&height=1372"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <span>Alexander Eriksson</span>
                      </p>
                      <p className="text-gray-600">Redaktör</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps = (async (context) => {
  const [page, posts] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_CMS_API}/pages/6591c190df0ff8a96c6bfb77?locale=${context.locale}&draft=true&depth=1`,
    ),
    fetch(`${process.env.NEXT_PUBLIC_CMS_API}/posts?locale=${context.locale}`),
  ]);
  const cms = await page.json();
  const articles = await posts.json();
  return {
    props: {
      cms,
      articles,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}) as GetStaticProps<{
  cms: CmsWithRichTextAndColumns;
  articles: Article;
}>;
