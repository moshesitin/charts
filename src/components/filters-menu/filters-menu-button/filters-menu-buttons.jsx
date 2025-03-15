import { Button } from "../../button/button";
import { useFilters } from "../../contexts/filters-context/use-filters";
import styles from "./filters-menu-buttons.module.css";

export const FiltersMenuButtons = ({ handlerActive }) => {
    const { clearFilters } = useFilters();

    return (
        <div className={styles.container}>
            <Button onClick={clearFilters} color={"blue"}>
                Сбросить
            </Button>
            <Button onClick={handlerActive} color={"fullBlue"}>
                Фильтр
            </Button>
        </div>
    );
};
