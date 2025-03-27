import { useState } from "react";
import { Cross } from "../../svg/cross";
import { FiltersMenuTop } from "./filters-menu-top/filters-menu-top";
import styles from "./filters-menu.module.css";
import classNames from "classnames";
import { FiltersMenuSelections } from "./filters-menu-selections/filters-menu-selections";
import { FiltersMenuButtons } from "./filters-menu-button/filters-menu-buttons";

export const FiltersMenu = ({ title }) => {
    const [menuIsActive, setMenuIsActive] = useState(false);

    const handlerActive = () => setMenuIsActive(!menuIsActive);

    return (
        <div
            className={classNames(styles.menu, {
                [styles.active]: menuIsActive,
            })}
        >
            <FiltersMenuTop handlerActive={handlerActive} title={title} />
            {menuIsActive && <FiltersMenuSelections />}
            {menuIsActive && <FiltersMenuButtons handlerActive={handlerActive} />}
            <button onClick={handlerActive} className={styles.cross}>
                <Cross />
            </button>
        </div>
    );
};
