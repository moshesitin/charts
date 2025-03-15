import { useFilters } from "../../contexts/filters-context/use-filters";
import { Select } from "../../select/select";
import styles from "./filters-menu-selections.module.css";

const selectData = [
    {
        name: "Select 1",
        items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"],
    },
    {
        name: "Select 2",
        items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"],
    },
    {
        name: "Select 3",
        items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"],
    },
    {
        name: "Select 4",
        items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"],
    },
    {
        name: "Select 5",
        items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"],
    },
    {
        name: "Select 6",
        items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"],
    },
    {
        name: "Select 7",
        items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"],
    },
];

export const FiltersMenuSelections = () => {
    const { toggleFilter, filters } = useFilters();

    return (
        <div className={styles.selections}>
            {selectData.map((e, ind) => (
                <Select
                    onClick={toggleFilter}
                    key={ind}
                    name={e.name}
                    items={e.items}
                    activeFilters={filters[e.name] || new Set()}
                />
            ))}
        </div>
    );
};
