import { Outlet } from "react-router-dom";
import { Header } from "./header/header";
import { Aside } from "./aside/aside";
import { Footer } from "./footer/footer";
import styles from "./layout.module.css";

export const Layout = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Header />
      </header>
      <aside className={styles.aside}>
        <Aside />
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
};
