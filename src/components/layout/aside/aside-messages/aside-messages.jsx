import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./aside-messages.module.css";
import { AsideMessage } from "../aside-message/aside-message";
import { MessageButton } from "../message-button/message-button";

export const AsideMessages = ({ title, messages }) => {
  return (
    <div className={styles.messages}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.buttonContainer}>
        <div className={styles.container}>
          <Swiper
            direction={"vertical"}
            slidesPerView={5}
            spaceBetween={20}
            style={{
              maxHeight: "880px",
              overflow: "hidden",
            }}
          >
            <MessageButton />
            {messages.map((message) => (
              <SwiperSlide key={message.id}>
                <AsideMessage title={message.title} text={message.text} />
              </SwiperSlide>
            ))}
            <MessageButton isNext={true} />
          </Swiper>
        </div>
      </div>
    </div>
  );
};
