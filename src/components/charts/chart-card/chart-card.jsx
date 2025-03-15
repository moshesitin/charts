import Chart from "react-google-charts";
import { File } from "../../../svg/file";
import { Select } from "../../select/select";
import styles from "./chart-card.module.css";
import { useRef, useState } from "react";

const chartsTypes = {
    Column: "ColumnChart",
    Bar: "BarChart",
    Area: "PieChart",
    Line: "LineChart",
};

export const ChartCard = ({ chart }) => {
    const { data, options, title, type } = chart;
    const [chartsType, setChartsType] = useState(type);
    const chartRef = useRef(null);

    const handlerRadioClick = (event) => {
        setChartsType(event.target.value);
    };

    const downloadChart = () => {
        if (!chartRef.current) {
            alert("Диаграмма ещё не готова. Пожалуйста, подождите.");
            return;
        }

        const chart = chartRef.current.getChart();
        if (!chart) {
            alert("Не удалось получить диаграмму. Попробуйте снова.");
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
        <div className={styles.chart}>
            <div className={styles.head}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.activities}>
                    <Select
                        name="Вид отчета"
                        items={["Column", "Bar", "Line", "Area"]}
                        style="round"
                        size="small"
                        type="radio"
                        activeFilters={new Set([chartsType])}
                        thereIsSearch={false}
                        thereIsAgree={false}
                        onClick={handlerRadioClick}
                    />
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
                options={options}
                getChartWrapper={(chartWrapper) => {
                    chartRef.current = chartWrapper;
                }}
            />
        </div>
    );
};
