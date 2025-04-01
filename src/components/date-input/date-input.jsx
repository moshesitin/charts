import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./date-input.module.css";
import he from "date-fns/locale/he";
import "./date-input.css";
import { useFilters } from "../../contexts/filters-context";

registerLocale("he", he);

export const DateInput = () => {
    const { selectedFilters, handleFilterChange } = useFilters();
    const [dateRange, setDateRange] = useState([
        selectedFilters.StartDate ? new Date(selectedFilters.StartDate) : null,
        selectedFilters.EndDate ? new Date(selectedFilters.EndDate) : null
    ]);
    const [startDate, endDate] = dateRange;

    // Обновляем локальное состояние, когда изменяется контекст фильтров
    useEffect(() => {
        if (selectedFilters.StartDate && selectedFilters.EndDate) {
            setDateRange([
                new Date(selectedFilters.StartDate), 
                new Date(selectedFilters.EndDate)
            ]);
        }
    }, [selectedFilters.StartDate, selectedFilters.EndDate]);

    // Обработчик изменения дат в датапикере
    const handleDateChange = (update) => {
        setDateRange(update);
        
        // Если обе даты выбраны, обновляем контекст фильтров
        if (update[0] && update[1]) {
            const formattedStartDate = update[0].toISOString().split('T')[0];
            const formattedEndDate = update[1].toISOString().split('T')[0];
            
            // Теперь передаем два параметра, чтобы избежать использования e.target
            handleFilterChange('StartDate', formattedStartDate);
            handleFilterChange('EndDate', formattedEndDate);
        }
    };

    return (
        <div className={styles.dateInput}>
            <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                locale="he"
                dateFormat="dd/MM/yy"
                placeholderText="בחר תאריך"
            />
        </div>
    );
};
