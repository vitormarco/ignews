import Head from "next/head";
import Image from "next/image";

import styles from "./home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about <span>React</span> world.
          </h1>
          <p>
            Get acess to all the publications <br />
            <span>for $9.90 month</span>
          </p>
        </section>
        <div>
          <Image
            src="/images/avatar.svg"
            alt="Girl coding"
            width={500}
            height={500}
          />
        </div>
      </main>
    </>
  );
}
