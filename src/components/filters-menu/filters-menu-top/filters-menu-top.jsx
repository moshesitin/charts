import { DateInput } from "../../date-input/date-input";
import { Button } from "../../button/button";
import { FilterSvg } from "../../../svg/filter-svg";
import { Cross } from "../../../svg/cross";
import { Pen } from "../../../svg/pen";
import styles from "./filters-menu-top.module.css";
import { useFilters } from "../../contexts/filters-context/use-filters";

export const FiltersMenuTop = ({ title, handlerActive }) => {
    return (
        <div className={styles.top}>
            <h2 className={styles.title}>{title}</h2>
            <Filters />
            <MenuButtons handlerActive={handlerActive} />
        </div>
    );
};

const Filters = () => {
    const names = [
        "Select 1",
        "Select 2",
        "Select 3",
        "Select 4",
        "Select 5",
        "Select 6",
        "Select 7",
    ];

    return (
        <div className={styles.filters}>
            {names.map((name, ind) => (
                <Filter key={ind} name={name} />
            ))}
        </div>
    );
};

const Filter = ({ name }) => {
    const { filters, deleteFilter } = useFilters();
    let filterItems = filters[name];

    if (!filterItems) {
        return null;
    }

    filterItems = Array.from(filterItems).join(", ");

    return (
        <div className={styles.filter}>
            <span className={styles.filterName}>{name}: </span>
            <span className={styles.filterText}>
                {filterItems}
                <button
                    onClick={() => {
                        deleteFilter(name);
                    }}
                    className={styles.cross}
                >
                    <Cross />
                </button>
            </span>
        </div>
    );
};

const MenuButtons = ({ handlerActive }) => {
    return (
        <div className={styles.buttons}>
            <DateInput />
            <Button onClick={handlerActive} color={"blue"}>
                <span className={styles.buttonText}>Фильтр</span>
                <span className={styles.svg}>
                    <FilterSvg />
                </span>
            </Button>
            <Button color={"blue"}>
                <span className={styles.buttonText}>Упорядочить</span>
                <span className={styles.svg}>
                    <Pen />
                </span>
            </Button>
        </div>
    );
};
