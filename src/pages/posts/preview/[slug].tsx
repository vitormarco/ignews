import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { asText, asHTML } from "@prismicio/helpers";

import { createClient } from "src/services/prismicio";
import Head from "next/head";

import styles from "../post.module.scss";
import Link from "next/link";
import { routes } from "src/utils/routes";
import { useEffect } from "react";

type PostType = {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
};

interface PostPreviewProps {
  post: PostType;
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(routes.post(post.slug));
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href={routes.home}>
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  previewData,
}) => {
  const { slug } = params;

  const client = createClient({ previewData });
  const response = await client.getByUID("post", String(slug));

  const post = {
    slug,
    title: asText(response.data.title),
    content: asHTML(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
    redirect: 60 * 30, // 30 minutes
  };
};
