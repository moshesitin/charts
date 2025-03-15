import { useState } from "react";
import { Eye } from "../../svg/eye";
import classNames from "classnames";
import styles from "./input.module.css";

export const Input = ({ isSecure, title, type = "text" }) => {
    const [currentType, setCurrentType] = useState(type);

    const handlerClick = () => {
        currentType === "password"
            ? setCurrentType("text")
            : setCurrentType("password");
    };

    return (
        <label className={styles.label}>
            <span className={styles.title}>{title}</span>
            <div className={styles.container}>
                <input type={currentType} className={styles.input} />
                {isSecure && (
                    <button
                        type="button"
                        className={classNames(styles.eye, {
                            [styles.active]: currentType === "password",
                        })}
                        onClick={handlerClick}
                    >
                        <Eye />
                    </button>
                )}
            </div>
        </label>
    );
};
