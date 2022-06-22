import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";

type SubscribeButtonProps = {
  priceId: string;
};

const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  const { data: session } = useSession();

  const handleSubscribe = () => {
    if (!session) {
      signIn("github");
      return;
    }
  };

  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe Now
    </button>
  );
};

export default SubscribeButton;
