import styles from "./aside-message.module.css"

export const AsideMessage = ({ title, text }) => {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
