import Chart from "react-google-charts";
import { File } from "../../../svg/file";
import { Select } from "../../select/select";
import styles from "./chart-card.module.css";
import { useRef, useState } from "react";
import classNames from "classnames";

const chartsTypes = {
    Column: "ColumnChart",
    Bar: "BarChart",
    Area: "PieChart",
    Line: "LineChart",
};

export const ChartCard = ({ chart }) => {
    const { data, options, title, type, isOnline, thereIsTypeData } = chart;
    const [chartsType, setChartsType] = useState(type);
    const [chartsTypeData, setChartsTypeData] = useState("1");
    const chartRef = useRef(null);

    const handlerTypeClick = (event) => {
        setChartsType(event.target.value);
    };
    const handlerTypeDataClick = (event) => {
        setChartsTypeData(event.target.value);
    };

    const downloadChart = () => {
        if (!chartRef.current) {
            alert("התרשים עדיין לא מוכן. אנא המתן.");
            return;
        }

        const chart = chartRef.current.getChart();
        if (!chart) {
            alert("הצגת תרשים נכשלה, אנא נסה שוב.");
            return;
        }

        const imageURI = chart.getImageURI();

        const link = document.createElement("a");
        link.href = imageURI;
        link.download = "line-chart.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div
            className={classNames(styles.chart, {
                [styles.data]: thereIsTypeData,
            })}
        >
            <div className={styles.head}>
                <div className={styles.headTitle}>
                    <h3 className={styles.title}>{title}</h3>
                    {isOnline && <p className={styles.subtitle}>(זמן אמת)</p>}
                </div>
                <div className={styles.activities}>
                    <div className={styles.selects}>
                        {thereIsTypeData && (
                            <Select
                                name="סוג תלונה"
                                items={["1", "2", "3"]}
                                style="round"
                                size="small"
                                type="radio"
                                activeFilters={new Set([chartsTypeData])}
                                thereIsSearch={false}
                                thereIsAgree={false}
                                onClick={handlerTypeDataClick}
                            />
                        )}
                        <Select
                            name="תצוגת נתונים"
                            items={["Column", "Bar", "Line", "Area"]}
                            style="round"
                            size="small"
                            type="radio"
                            activeFilters={new Set([chartsType])}
                            thereIsSearch={false}
                            thereIsAgree={false}
                            onClick={handlerTypeClick}
                        />
                    </div>
                    <button onClick={downloadChart} className={styles.download}>
                        <span className={styles.svg}>
                            <File />
                        </span>
                    </button>
                </div>
            </div>
            <Chart
                chartType={chartsTypes[chartsType]}
                width="100%"
                height="400px"
                data={data}
                className={styles.mainChart}
                options={options}
                getChartWrapper={(chartWrapper) => {
                    chartRef.current = chartWrapper;
                }}
            />
        </div>
    );
};
