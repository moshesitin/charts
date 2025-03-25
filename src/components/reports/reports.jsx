import { Search } from "../../svg/search";
import { File } from "../../svg/file";
import { ReportsTable } from "./reports-table/reports-table";
import styles from "./reports.module.css";
import { useRef, useState, useEffect } from "react";
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

const headData = ["קו", "כמות נסיעות מתוכננת", "אחוז ביצוע", "מדד דיוק", "כמות דיווחים"];
const data = [["{Data}"]];

export const Reports = () => {
    const tableRef = useRef(null);
    const [lineData, setLineData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [countRows, setCountRows] = useState(10);
    const { authData } = useAuth();
    const { selectedFilters } = useFilters();

    useEffect(() => {
        const loadLinePerformanceData = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const apiFilters = {
                    startDate: '2023-01-01',
                    endDate: '2023-12-31',
                    ...selectedFilters
                };
                
                const data = await fetchLinePerformanceDetails(apiFilters, authData);
                
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
        };
        
        loadLinePerformanceData();
    }, [selectedFilters, authData]);

    const handlerSave = () => {
        if (tableRef.current) {
            tableRef.current.style.overflow = "visible";
            tableRef.current.style.width = "max-content";

            html2canvas(tableRef.current, {
                scale: 2,
                useCORS: true,
            }).then((canvas) => {
                tableRef.current.style.overflow = "auto";
                tableRef.current.style.width = "100%";

                canvas.toBlob((blob) => {
                    saveAs(blob, "table.png");
                });
            });
        }
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
            onPageChange={() => {
                console.log(123);
            }}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
        />
    );
};
