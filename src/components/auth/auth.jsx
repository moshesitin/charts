import { AuthForm } from "../auth-form/auth-form";
import styles from "./auth.module.css";

export const Auth = () => {
    return (
        <section className={styles.auth}>
            <AuthForm />
            <div className={styles.img}></div>
        </section>
    );
};
