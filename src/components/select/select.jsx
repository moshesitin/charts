import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "../../svg/arrow";
import { Search } from "../../svg/search";
import styles from "./select.module.css";
import classNames from "classnames";
import { Checkbox } from "../checkbox/checkbox";

export const Select = ({
    name,
    items,
    onClick,
    activeFilters,
    type,
    thereIsSearch = true,
    style,
    size,
    thereIsAgree = true,
}) => {
    const [selectActive, setSelectActive] = useState(false);
    const selectRef = useRef(null);

    const handlerClick = () => {
        setSelectActive(!selectActive);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectActive &&
                selectRef.current &&
                !selectRef.current.contains(event.target)
            ) {
                setSelectActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectActive]);

    return (
        <div
            className={classNames(styles.select, {
                [styles.active]: selectActive,
            })}
            ref={selectRef}
        >
            <ButtonOpen
                style={style}
                size={size}
                name={name}
                onClick={handlerClick}
            />
            <Window
                items={items}
                checkboxClick={onClick}
                activeFilters={activeFilters}
                handlerClick={handlerClick}
                name={name}
                type={type}
                thereIsSearch={thereIsSearch}
                thereIsAgree={thereIsAgree}
            />
        </div>
    );
};

const ButtonOpen = ({ onClick, name, style, size }) => {
    return (
        <button
            onClick={onClick}
            className={classNames(styles.button, styles[style], styles[size])}
        >
            <span className={styles.buttonName}>{name}</span>
            <span className={styles.arrow}>
                <Arrow color="#7C7C7C" />
            </span>
        </button>
    );
};

const Window = ({
    name,
    items,
    checkboxClick,
    activeFilters,
    handlerClick,
    type,
    thereIsSearch,
    thereIsAgree,
}) => {
    const [foundItems, setFoundItems] = useState(items);
    const handlerInput = (event) => {
        const regexp = new RegExp(event.target.value, "i");
        setFoundItems(items.filter((e) => e.match(regexp)));
    };

    return (
        <div className={styles.window}>
            {thereIsSearch && <SearchFiled handlerInput={handlerInput} />}
            {!thereIsSearch && <p className={styles.head}>בחר תצוגה </p>}
            <Results
                foundItems={foundItems}
                checkboxClick={checkboxClick}
                activeFilters={activeFilters}
                name={name}
                type={type}
            />
            {thereIsAgree && <Submit handlerClick={handlerClick} />}
        </div>
    );
};

const SearchFiled = ({ handlerInput }) => {
    return (
        <div className={styles.customInput}>
            <input
                className={styles.input}
                placeholder="חיפוש"
                type="text"
                onInput={handlerInput}
            />
            <span className={styles.search}>
                <Search />
            </span>
        </div>
    );
};

const Results = ({ foundItems, checkboxClick, activeFilters, name, type }) => {
    const uniqueId = uuidv4();

    return (
        <div className={styles.checkboxContainer}>
            {foundItems.map((item, ind) => (
                <Checkbox
                    name={`${name}/${uniqueId}`}
                    item={item}
                    key={ind}
                    type={type}
                    checkboxClick={checkboxClick}
                    activeFilters={activeFilters}
                />
            ))}
        </div>
    );
};

const Submit = ({ handlerClick }) => {
    return (
        <div className={styles.submitContainer}>
            <button onClick={handlerClick} className={styles.submit}>
                <span className={styles.submitText}>לבחור</span>
            </button>
        </div>
    );
};
