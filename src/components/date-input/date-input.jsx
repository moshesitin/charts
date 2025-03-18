import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./date-input.module.css";
import he from "date-fns/locale/he";
import "./date-input.css";

registerLocale("he", he);

export const DateInput = () => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <div className={styles.dateInput}>
            <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    setDateRange(update);
                }}
                locale="he"
                dateFormat="dd/MM/yy"
                placeholderText="Выберите Дату"
            />
        </div>
    );
};
