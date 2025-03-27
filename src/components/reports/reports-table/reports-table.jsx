import styles from "./reports-table.module.css";
import React from "react";

export const ReportsTable = React.forwardRef(({ headData, data, countRows }, ref) => {
    return (
        <div ref={ref} className={styles.table}>
            <div className={styles.tableContainer}>
                <div className={styles.head}>
                    {headData.map((e) => (
                        <div className={styles.headItem} key={e}>
                            {e}
                        </div>
                    ))}
                </div>
                {data.length === 0 ? (
                    <div className={styles.noData}>אין נתונים לתצוגה</div>
                ) : (
                    data.slice(0, countRows).map((row, rowI) => (
                        <div className={styles.row} key={rowI}>
                            {row.map((cell, columnI) => (
                                <div className={styles.item} key={columnI}>
                                    {cell}
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
});
