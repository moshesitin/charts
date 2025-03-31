import { useFilters } from "../../../contexts/filters-context";
import styles from "./filters-menu-selections.module.css";

export const FiltersMenuSelections = () => {
    const { 
        filterOptions, 
        selectedFilters, 
        handleFilterChange, 
        handleFilterFocus, 
        isLoading 
    } = useFilters();

    // Эта функция вызывается для отображения правильного значения из объекта опций
    const getDisplayValue = (optionObj, id) => {
        // Специальная обработка для SubCluster - значение находится в ClusterSubDesc
        if (id === "SubCluster" && optionObj.ClusterSubDesc !== undefined) {
            return optionObj.ClusterSubDesc;
        }
        
        // Для остальных фильтров используем маппинг
        const mappings = {
            "Agency": "agency_name",
            "Cluster": "ClusterName",
            "SubCluster": "SubCluster",  // Для обратной совместимости
            "City": "CityName", 
            "RouteNumber": "RouteNumber",
            "LineType": "LineType",
            "linegroup": "descrip"
        };
        
        // Получаем значение по маппингу
        const value = optionObj[mappings[id] || id] || optionObj.value || optionObj;
        
        // Если значение - объект, преобразуем его в строку
        if (value !== null && typeof value === "object") {
            return String(Object.values(value)[0] || '');
        }
        
        return String(value || '');
    };

    // Эта функция вызывается для получения правильного значения для option value
    const getOptionValue = (optionObj, id) => {
        // Специальная обработка для SubCluster - значение находится в ClusterSubDesc
        if (id === "SubCluster" && optionObj.ClusterSubDesc !== undefined) {
            return optionObj.ClusterSubDesc;
        }
        
        const mappings = {
            "Agency": "agency_id",
            "Cluster": "Clusterid",
            "SubCluster": "SubCluster",  // Для обратной совместимости
            "City": "CityName",
            "RouteNumber": "LineID",
            "LineType": "LineType",
            "linegroup": "id"
        };
        
        const value = optionObj[mappings[id] || id] || optionObj.value || optionObj;
        
        // Преобразуем в строку, чтобы избежать проблем с объектами
        if (value !== null && typeof value === "object") {
            return String(Object.values(value)[0] || '');
        }
        
        return String(value || '');
    };

    // Конфигурация для соответствия ID фильтра и типа запроса API
    const filterTypeMapping = {
        "Agency": "Agency",
        "Cluster": "Cluster",
        "SubCluster": "SubCluster",
        "City": "Cities",
        "RouteNumber": "LineID",
        "LineType": "LineType",
        "linegroup": "linegroup"
    };

    return (
        <div className={styles.selections}>
            {[
                { id: "Agency", label: "מפעיל" },
                { id: "Cluster", label: "אשכול (אזורים)" },
                { id: "SubCluster", label: "תת אשכול" },
                { id: "City", label: "עיר" },
                { id: "RouteNumber", label: "קו" },
                { id: "LineType", label: "סוג קו" },
                { id: "linegroup", label: "קבוצת קווים" }
            ].map(({ id, label }) => (
                <div key={id} className={styles.selection}>
                    <label htmlFor={id}>{label}:</label>
                    <select 
                        id={id} 
                        value={selectedFilters[id] || ""} 
                        onChange={handleFilterChange}
                        onFocus={() => handleFilterFocus(filterTypeMapping[id])}
                        disabled={isLoading[filterTypeMapping[id]]}
                    >
                        <option value="">Выберите</option>
                        {filterOptions[filterTypeMapping[id]]?.map((option, index) => (
                            <option 
                                key={`${id}-${index}`} 
                                value={getOptionValue(option, id)}
                            >
                                {getDisplayValue(option, id)}
                            </option>
                        ))}
                    </select>
                    {isLoading[filterTypeMapping[id]] && 
                        <div className={styles.loadingIndicator}>
                            Загрузка...
                        </div>
                    }
                </div>
            ))}
        </div>
    );
};
