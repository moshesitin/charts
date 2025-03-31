import { DateInput } from "../../date-input/date-input";
import { Button } from "../../button/button";
import { FilterSvg } from "../../../svg/filter-svg";
import { Cross } from "../../../svg/cross";
import { Pen } from "../../../svg/pen";
import styles from "./filters-menu-top.module.css";
import { useFilters } from "../../../contexts/filters-context";

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
    const { selectedFilters } = useFilters();
    
    // Фильтруем, чтобы показывать только те, для которых есть значения
    const activeFilters = Object.entries(selectedFilters)
        .filter(([key, value]) => value && key !== 'StartDate' && key !== 'EndDate')
        .map(([key]) => {
            return { id: key, name: getFilterLabel(key) };
        });
    
    return (
        <div className={styles.filters}>
            {activeFilters.map((filter) => (
                <Filter key={filter.id} id={filter.id} name={filter.name} />
            ))}
        </div>
    );
};

// Вспомогательная функция для получения понятного имени фильтра
const getFilterLabel = (filterId) => {
    const labels = {
        'Agency': 'מפעיל',
        'Cluster': 'אשכול',
        'SubCluster': 'תת אשכול',
        'City': 'עיר',
        'RouteNumber': 'קו',
        'LineType': 'סוג קו',
        'linegroup': 'קבוצת קווים'
    };
    return labels[filterId] || filterId;
};

const Filter = ({ id, name }) => {
    const { selectedFilters, handleFilterChange, filterOptions } = useFilters();
    
    // Если нет выбранного значения, не показываем фильтр
    if (!selectedFilters[id]) {
        return null;
    }
    
    // Получаем отображаемое значение
    let displayValue = selectedFilters[id];
    
    // Для некоторых фильтров нужно искать отображаемое значение в опциях
    const filterTypeMapping = {
        "Agency": "Agency",
        "Cluster": "Cluster",
        "SubCluster": "SubCluster",
        "City": "Cities",
        "RouteNumber": "LineID",
        "LineType": "LineType",
        "linegroup": "linegroup"
    };
    
    const apiType = filterTypeMapping[id];
    
    if (filterOptions[apiType]) {
        // Ищем соответствующий объект в опциях
        const mappingFields = {
            "Agency": { valueField: "agency_id", displayField: "agency_name" },
            "Cluster": { valueField: "Clusterid", displayField: "ClusterName" },
            "SubCluster": { valueField: "SubCluster", displayField: "SubCluster" },
            "City": { valueField: "CityName", displayField: "CityName" },
            "RouteNumber": { valueField: "LineID", displayField: "RouteNumber" },
            "LineType": { valueField: "LineType", displayField: "LineType" },
            "linegroup": { valueField: "id", displayField: "descrip" }
        };
        
        const field = mappingFields[id];
        if (field) {
            const option = filterOptions[apiType].find(
                opt => String(opt[field.valueField]) === String(selectedFilters[id])
            );
            
            if (option) {
                displayValue = option[field.displayField];
            }
        }
    }
    
    return (
        <div className={styles.filter}>
            <span className={styles.filterName}>{name}: </span>
            <span className={styles.filterText}>
                {displayValue}
                <button
                    onClick={() => {
                        handleFilterChange({ target: { id: id, value: '' } });
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
                <span className={styles.buttonText}>סנן</span>
                <span className={styles.svg}>
                    <FilterSvg />
                </span>
            </Button>
            <Button color={"blue"}>
                <span className={styles.buttonText}>סדר</span>
                <span className={styles.svg}>
                    <Pen />
                </span>
            </Button>
        </div>
    );
};
