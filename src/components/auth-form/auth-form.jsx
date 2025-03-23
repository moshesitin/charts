import { useState } from "react";
import { Checkbox } from "../checkbox/checkbox";
import { Input } from "../input/input";
import { Button } from "../button/button";
import google from "../../img/google.png";
import styles from "./auth-form.module.css";

export const AuthForm = () => {
    const [remember, setRemember] = useState(new Set());
    const checkboxClick = () => {
        if (remember.has("remember")) {
            setRemember(new Set());
        } else {
            setRemember(new Set(["remember"]));
        }
    };

    return (
        <form className={styles.form}>
            <div className={styles.formContainer}>
                <h3 className={styles.title}>התחברות</h3>
                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <Input
                            title={"שם משתמש או כתובת אימייל"}
                            type={"email"}
                        />
                    </div>
                    <div className={styles.input}>
                        <Input
                            title={"סיסמא"}
                            type={"password"}
                            isSecure={true}
                        />
                    </div>
                </div>
                <div className={styles.remember}>
                    <Checkbox
                        checkboxClick={checkboxClick}
                        name={"remember"}
                        value={"remember"}
                        item={"זכור אותי"}
                        activeFilters={remember}
                    />
                    <a href="#" className={styles.text}>
                    שכחתי סיסמא?
                    </a>
                </div>
                <div className={styles.buttons}>
                    <button type="submit" className={styles.sign}>
                    התחבר
                    </button>
                    <p className={styles.or}>או</p>
                    <button className={styles.googleBtn}>
                        <span className={styles.google}>Google</span>
                        <img className={styles.img} src={google} alt="google" />
                    </button>
                </div>
                <div className={styles.no}>
                    <span className={styles.noText}>אין לכם חשבון? </span>
                    <a href="#" className={styles.reg}>
                    הרשמו
                    </a>
                </div>
            </div>
        </form>
    );
};
