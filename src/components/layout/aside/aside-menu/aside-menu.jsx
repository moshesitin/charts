import { Link } from "react-router-dom";
import { Menu } from "../../../../svg/menu/menu";
import { Dashboard } from "../../../../svg/dashboard";
import { Reports } from "../../../../svg/reports";
import { Changes } from "../../../../svg/changes";
import { Bell } from "../../../../svg/bell";
import { Warnings } from "../../../../svg/warnings";
import { Person } from "../../../../svg/person";
import { Clients } from "../../../../svg/clients";
import { Users } from "../../../../svg/users";
import { Tables } from "../../../../svg/tables";
import { Exit } from "../../../../svg/exit";
import { Arrow } from "../../../../svg/arrow";
import styles from "./aside-menu.module.css";
import classNames from "classnames";

export const AsideMenu = ({ menuIsActive, toggleActive }) => {
    return (
        <menu
            className={classNames(styles.menu, {
                [styles.active]: menuIsActive,
            })}
        >
            <button onClick={toggleActive} className={styles.menuBtn}>
                <span className={styles.menuSvg}>
                    <Menu isActive={menuIsActive} />
                </span>
                <span className={styles.menuBtnText}>תפריט</span>
            </button>
            <div className={styles.linkContainer}>
                <Link to={"/"}>
                    <span className={styles.menuItem}>
                        <span className={styles.svg}>
                            <Dashboard />
                        </span>
                        <span className={styles.linkText}>לוח בקרה</span>
                    </span>
                </Link>
            </div>
            <div className={styles.linkContainer}>
                <Link to={"/"}>
                    <span className={styles.menuInMenu}>
                        <span className={styles.menuItem}>
                            <span className={styles.svg}>
                                <Reports />
                            </span>
                            <span className={styles.linkText}>דוחות</span>
                        </span>
                        <span className={styles.arrow}>
                            <Arrow />
                        </span>
                    </span>
                </Link>
            </div>
            <div className={styles.linkContainer}>
                <Link to={"/"}>
                    <span className={styles.menuItem}>
                        <span className={styles.svg}>
                            <Changes />
                        </span>
                        <span className={styles.linkText}>שינויים מתוכננים</span>
                    </span>
                </Link>
            </div>
            <div className={styles.linkContainer}>
                <Link to={"/"}>
                    <span className={styles.menuItem}>
                        <span className={styles.svg}>
                            <Bell />
                        </span>
                        <span className={styles.linkText}>עדכוני תנועה</span>
                    </span>
                </Link>
            </div>
            <div className={styles.linkContainer}>
                <Link to={"/"}>
                    <span className={styles.menuItem}>
                        <span className={styles.svg}>
                            <Warnings />
                        </span>
                        <span className={styles.linkText}>התראות</span>
                    </span>
                </Link>
            </div>
            <div className={styles.linkContainer}>
                <Link to={"/"}>
                    <span className={styles.menuItem}>
                        <span className={styles.svg}>
                            <Person />
                        </span>
                        <span className={styles.linkText}>פרטים אישיים</span>
                    </span>
                </Link>
            </div>
            <div className={styles.linkContainer}>
                <Link to={"/"}>
                    <span className={styles.menuItem}>
                        <span className={styles.svg}>
                            <Clients />
                        </span>
                        <span className={styles.linkText}>לקוחות</span>
                    </span>
                </Link>
            </div>
            <div className={styles.linkContainer}>
                <Link to={"/"}>
                    <span className={styles.menuItem}>
                        <span className={styles.svg}>
                            <Users />
                        </span>
                        <span className={styles.linkText}>משתמשים</span>
                    </span>
                </Link>
            </div>
            <div className={styles.linkContainer}>
                <Link to={"/"}>
                    <span className={styles.menuItem}>
                        <span className={styles.svg}>
                            <Tables />
                        </span>
                        <span className={styles.linkText}>טבלאות מערכת</span>
                    </span>
                </Link>
            </div>
            <div className={styles.linkContainer}>
                <Link to={"/authorization"}>
                    <span className={styles.menuItem}>
                        <span className={styles.svg}>
                            <Exit />
                        </span>
                        <span className={styles.linkText}>התנתק</span>
                    </span>
                </Link>
            </div>
        </menu>
    );
};
