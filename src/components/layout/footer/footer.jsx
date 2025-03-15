import logo from "../../../img/footer-logo.png";
import styles from "./footer.module.css"

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <span className={styles.text}>Copyright © {`{Current Year}`}</span>
      <img src={logo} alt="logo" className={styles.img} />
    </div>
  );
};
