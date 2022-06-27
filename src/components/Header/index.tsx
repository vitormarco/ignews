import Image from "next/image";

import { routes } from "src/utils/routes";

import { SignInButton } from "../SignInButton";
import { ActiveLink } from "../ActiveLink";

import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src="/images/logo.svg" alt="ig.news" width={108} height={30} />
        <nav>
          <ActiveLink href={routes.home} activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href={routes.posts}>
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
};
