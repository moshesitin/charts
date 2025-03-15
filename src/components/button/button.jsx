import classNames from "classnames";
import styles from "./button.module.css";

export const Button = ({ children, color, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={classNames(styles[color], styles.button)}
        >
            {children}
        </button>
    );
};
