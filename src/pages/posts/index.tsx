import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import { asText as RichTextAsText } from "@prismicio/helpers";

import { createClient } from "src/services/prismicio";
import styles from "./styles.module.scss";
import { routes } from "src/utils/routes";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Array<Post>;
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`${routes.posts}/${post.slug}`}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const publication = await client.getAllByType("post", {
    fetch: ["post.title", "post.content"],
    pageSize: 100,
  });

  const posts = publication.map((post) => ({
    slug: post.uid,
    title: RichTextAsText(post.data.title),
    excerpt:
      post.data.content.find((content) => content.type === "paragraph")?.text ??
      "",
    updatedAt: new Date(post.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  }));

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
