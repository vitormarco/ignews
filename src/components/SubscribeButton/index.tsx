import styles from "./styles.module.scss";

type SubscribeButtonProps = {
  priceId: string;
};

const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe Now
    </button>
  );
};

export default SubscribeButton;
