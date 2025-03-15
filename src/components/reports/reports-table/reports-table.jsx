import styles from "./reports-table.module.css";

export const ReportsTable = ({ headData, data, countRows, ref }) => {
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
                {[...new Array(countRows)].map((_, rowI) => {
                    return (
                        <div className={styles.row} key={rowI}>
                            {headData.map((_, columnI) => {
                                let rowData;
                                if (data[rowI]) {
                                    if (data[rowI][columnI]) {
                                        rowData = data[rowI][columnI];
                                    }
                                }

                                return (
                                    <div className={styles.item} key={columnI}>
                                        {rowData}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
