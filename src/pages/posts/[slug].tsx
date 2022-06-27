import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { asText, asHTML } from "@prismicio/helpers";

import { createClient } from "src/services/prismicio";
import Head from "next/head";

import styles from "./post.module.scss";

type PostType = {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
};

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {
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
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
  previewData,
}) => {
  const client = createClient({ previewData });
  const session = await getSession({ req });
  const { slug } = params;

  const response = await client.getByUID("post", String(slug));

  console.log(JSON.stringify(response, null, 2));

  const post = {
    slug,
    title: asText(response.data.title),
    content: asHTML(response.data.content),
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
  };
};
