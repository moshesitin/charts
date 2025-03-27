import { useFilters } from "../../../contexts/filters-context";
import styles from "./filters-menu-selections.module.css";

export const FiltersMenuSelections = () => {
    const { filters, selectedFilters, handleFilterChange, error, isLoading } = useFilters();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                    <select id={id} value={selectedFilters[id]} onChange={handleFilterChange}>
                        <option value="">Выберите</option>
                        {filters[id]?.map((option, index) => (
                            <option key={`${id}-${index}`} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};
