import { ChartCard } from "./chart-card/chart-card";
import styles from "./charts.module.css";

const charts = [
    {
        data: [
            ["Месяц", "Перец", "соль"],
            ["Янв", 100, 90],
            ["Фев", 160, 120],
            ["Мар", 120, 110],
            ["Апр", 110, 100],
            ["Май", 130, 120],
            ["Июн", 140, 130],
        ],
        options: {
            chartArea: { width: "80%", height: "80%" },
            hAxis: { title: "Месяц" },
            vAxis: { title: "Значение" },
            legend: { position: "top" },
            histogram: {
                bucketSize: 1,
                hideBucketItems: true,
            },
            bar: { groupWidth: "75%" },
            isStacked: false,
        },
        thereIsTypeData: true,
        type: "Column",
        isOnline: true,
        title: "Данные\\Данные",
    },
    {
        data: [
            ["Категория", "Значение"],
            ["חלב עם 3% שומן", 406],
            ["חלב 2% שומן", 287],
            ["חלב 1% שומן", 198],
            ["שמנת", 99],
            ["חלב דל שומן", 220],
        ],
        options: {
            legend: { position: "right" },
            chartArea: { width: "100%", height: "100%" },
        },
        thereIsTypeData: false,
        isOnline: false,
        type: "Area",
        title: "Данные\\Данные",
    },
    {
        data: [
            ["Месяц", "Молоко", "Соль", "Перец"],
            ["Янв", 90, 95, 92],
            ["Фев", 85, 90, 92],
            ["Мар", 80, 85, 93],
            ["Апр", 65, 75, 94],
            ["Май", 85, 80, 94],
            ["Июн", 90, 85, 95],
        ],
        options: {
            hAxis: {
                title: "Месяц",
                direction: -1,
                slantedText: false,
            },
            vAxis: {
                title: "Процентов",
                format: "#",
                minValue: 0,
                maxValue: 100,
                ticks: [0, 20, 40, 60, 80, 100],
            },
            legend: { position: "top" },
            chartArea: { width: "70%", height: "70%" },
            series: {
                0: { pointSize: 5 },
                1: { pointSize: 5 },
                2: { pointSize: 5 },
            },
        },
        thereIsTypeData: false,
        isOnline: false,
        type: "Line",
        title: "Данные\\Данные",
    },
];

export const Charts = () => {
    return (
        <section className={styles.charts}>
            {charts.map((chart, ind) => (
                <ChartCard chart={chart} key={ind} />
            ))}
        </section>
    );
};
