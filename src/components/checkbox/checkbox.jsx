import styles from "./checkbox.module.css";

export const Checkbox = ({
    name,
    item,
    value = item,
    type = "checkbox",
    checkboxClick,
    activeFilters,
}) => (
    <label className={styles.label}>
        <input
            className={styles.checkbox}
            name={name}
            value={value}
            type={type}
            onClick={checkboxClick}
            checked={activeFilters.has(value)}
            readOnly
        />
        <span className={styles.checkboxText}>{item}</span>
    </label>
);
