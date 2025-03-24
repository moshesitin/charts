import { Link } from "react-router-dom";
import logo from "../../../img/לוגו.png";
import { Button } from "../../button/button";
import { Help } from "../../../svg/help";
import styles from "./header.module.css";

export const Header = ({ thereAreActivities = true }) => {
    return (
        <div className={styles.header}>
            <Link className={styles.home} to={"/"}>
                <img src={logo} className={styles.img} alt="Logo" />
            </Link>
            {thereAreActivities && (
                <div className={styles.active}>
                    <Button color={"grey"}>
                        <span className={styles.btnText}>תמיכה</span>
                        <span className={styles.svg}>
                            <Help />
                        </span>
                    </Button>
                    <span className={styles.user}>שלום, יענקי!</span>
                    <span className={styles.status}>מחובר</span>
                </div>
            )}
        </div>
    );
};
