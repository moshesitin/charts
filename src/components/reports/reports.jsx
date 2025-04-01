import { Search } from "../../svg/search";
import { File } from "../../svg/file";
import { ReportsTable } from "./reports-table/reports-table";
import styles from "./reports.module.css";
import { useRef, useState, useEffect, useCallback } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { Select } from "../select/select";
import ReactPaginate from "react-paginate";
import { Arrow } from "../../svg/arrow";
import { BackArrow } from "../../svg/back-arrow/back-arrow";
import { NextArrow } from "../../svg/next-arrow/next-arrow";
import { fetchLinePerformanceDetails } from "../../services/charts-api";
import { useAuth } from "../auth/auth-context";
import { useFilters } from "../../contexts/filters-context";
import ExcelJS from "exceljs";

const headData = ["קו", "כמות נסיעות מתוכננת", "אחוז ביצוע", "מדד דיוק", "כמות דיווחים"];

export const Reports = () => {
    const tableRef = useRef(null);
    const [lineData, setLineData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [countRows, setCountRows] = useState(10);
    const { authData } = useAuth();
    const { selectedFilters } = useFilters();

    const loadLinePerformanceData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const apiFilters = {
                ...selectedFilters,
                // Use the dates from selectedFilters directly
                startDate: selectedFilters.StartDate,
                endDate: selectedFilters.EndDate
            };
            
            const data = await fetchLinePerformanceDetails(apiFilters, authData);
            
            if (!data || data.length === 0) {
                console.log('No data received from API');
                setLineData([]);
                return;
            }
            
            const sortedData = data.sort((a, b) => 
                b.PerformancePercentage - a.PerformancePercentage
            );
            
            const tableData = sortedData.map(line => [
                line.LineID.toString(),
                line.Planned.toLocaleString(),
                `${line.PerformancePercentage.toFixed(2)}%`,
                line.AccuracyIndex || "N/A",
                line.ReportsCount || "N/A"
            ]);
            
            setLineData(tableData);
        } catch (err) {
            console.error("Ошибка при загрузке данных о линиях:", err);
            setError(err.message || "Ошибка при загрузке данных");
        } finally {
            setIsLoading(false);
        }
    }, [selectedFilters, authData]);

    useEffect(() => {
        loadLinePerformanceData();
    }, [loadLinePerformanceData]);

    const handlerSave = async () => {
        if (!lineData || lineData.length === 0) {
            alert("אין נתונים להורדה");
            return;
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Line Performance");

        // Добавляем заголовки таблицы
        worksheet.addRow(headData);

        // Добавляем данные
        lineData.forEach((row) => {
            worksheet.addRow(row);
        });

        // Настраиваем ширину колонок
        worksheet.columns.forEach((column) => {
            column.width = column.header ? column.header.length + 5 : 15;
        });

        // Генерируем файл Excel
        const buffer = await workbook.xlsx.writeBuffer();

        // Создаём Blob и инициируем скачивание
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "line-performance.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlerRadio = (event) => {
        setCountRows(+event.target.value);
    };

    return (
        <section className={styles.reports}>
            <h2 className={styles.title}>סיכום לפי קו</h2>
            <ReportsHead
                handlerSave={handlerSave}
                countRows={countRows}
                handlerRadio={handlerRadio}
            />
            
            {isLoading ? (
                <div className={styles.loading}>טוען נתונים...</div>
            ) : error ? (
                <div className={styles.error}>שגיאה: {error}</div>
            ) : (
                <ReportsTable
                    ref={tableRef}
                    headData={headData}
                    data={lineData}
                    countRows={countRows}
                />
            )}
            
            <ReportsPagination />
        </section>
    );
};

const ReportsHead = ({ handlerSave, countRows, handlerRadio }) => {
    return (
        <div className={styles.head}>
            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="חיפוש"
                    className={styles.input}
                />
                <div className={styles.svg}>
                    <Search />
                </div>
            </div>
            <div className={styles.activities}>
                <Select
                    name={"כמות שורות לתצוגה"}
                    items={[10, 20, 30]}
                    activeFilters={new Set([countRows])}
                    type={"radio"}
                    thereIsSearch={false}
                    size={"small"}
                    thereIsAgree={false}
                    style={"round"}
                    onClick={handlerRadio}
                />
                <button onClick={handlerSave} className={styles.download}>
                    <span className={styles.downloadSvg}>
                        <File />
                    </span>
                </button>
            </div>
        </div>
    );
};

const ReportsPagination = () => {
    return (
        <ReactPaginate
            previousLabel={<BackArrow />}
            nextLabel={<NextArrow />}
            breakLabel={"..."}
            pageCount={10}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={(data) => {
                console.log(`Page selected: ${data.selected}`);
            }}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
        />
    );
};
