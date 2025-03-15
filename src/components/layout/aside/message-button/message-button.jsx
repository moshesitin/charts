import { useSwiper } from "swiper/react";
import { Arrow } from "../../../../svg/arrow";
import classNames from "classnames";
import styles from "./message-button.module.css";

export const MessageButton = ({ isNext }) => {
  const swiper = useSwiper();

  if (isNext) {
    return (
      <button
        className={classNames(styles.button, styles.next)}
        onClick={() => swiper.slideNext()}
      >
        <Arrow />
      </button>
    );
  } else {
    return (
      <button
        className={classNames(styles.button, styles.prev)}
        onClick={() => swiper.slidePrev()}
      >
        <Arrow />
      </button>
    );
  }
};
