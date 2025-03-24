import { ChartCard } from "./chart-card/chart-card";
import styles from "./charts.module.css";

const charts = [
    {
        data: [
            ["חודש", "בוצע", "מתוכנן"],
            ["ינו", 100, 90],
            ["פברואר", 160, 120],
            ["מרץ", 120, 110],
            ["אפריל", 110, 100],
            ["מאי", 130, 120],
            ["יוני", 140, 130],
        ],
        options: {
            chartArea: { width: "80%", height: "60%" },
            rtl: true,
            hAxis: {
                title: "תאיריכים",
                direction: -1,
                slantedText: true,
             },
            vAxis: { 
                title: "נסיעות",
                // direction: -1,
                //  position: "right",
             },
            legend: { 
                position: "top",
                alignment: "center",
                reverseCategories: false,
            },
            histogram: {
                bucketSize: 1,
                hideBucketItems: true,
            },
            bar: { groupWidth: "75%" },
            series: {
                0: { pointSize: 5 },
                1: { pointSize: 5 },
                2: { pointSize: 5 },
            },
            isStacked: false,
        },
        thereIsTypeData: false,
        type: "Line",
        isOnline: true,
        title: "תכנון / ביצוע",
    },

    {
        data: [
            ["חודש", "עירוני", "בינעירוני", "כללי"],
            ["ינו", 20, 90, 75],
            ["פברואר", 40, 62, 45],
            ["מרץ", 70, 91, 76],
            ["אפריל", 50, 80, 87],
            ["מאי", 60, 70, 98],
            ["יוני", 40, 30, 76],
        ],
        options: {
            chartArea: { width: "80%", height: "60%" },
            hAxis: {
                title: "תאיריכים",
                direction: -1,
                slantedText: true,
             },
            vAxis: { 
                title: "אחוזים",
                format: '#\'%\'',
                minValue: 0,
                maxValue: 100,
                ticks: [0, 20, 40, 60, 80, 100],
            },
            legend: { 
                position: "top",
                alignment: "center",
            },
            histogram: {
                bucketSize: 1,
                hideBucketItems: true,
            },
            bar: { groupWidth: "75%" },
            series: {
                0: { pointSize: 5 },
                1: { pointSize: 5 },
                2: { pointSize: 5 },
            },
            isStacked: false,
        },
        thereIsTypeData: false,
        type: "Line",
        isOnline: true,
        title: "אחוז ביצוע",
    },
    
    {
        data: [
            ["חודש", "עירוני", "בינעירוני", "כללי"],
            ["ינו", 20, 90, 75],
            ["פברואר", 40, 62, 45],
            ["מרץ", 70, 91, 76],
            ["אפריל", 50, 80, 87],
            ["מאי", 60, 70, 98],
            ["יוני", 40, 30, 76],
        ],
        options: {
            chartArea: { width: "80%", height: "60%" },
            hAxis: {
                title: "תאיריכים",
                direction: -1,
                slantedText: true,
             },
            vAxis: { 
                title: "אחוזים",
                format: '#\'%\'',
                minValue: 0,
                maxValue: 100,
                ticks: [0, 20, 40, 60, 80, 100],
            },
            legend: { 
                position: "top",
                alignment: "center",
            },
            histogram: {
                bucketSize: 1,
                hideBucketItems: true,
            },
            series: {
                0: { pointSize: 5 },
                1: { pointSize: 5 },
                2: { pointSize: 5 },
            },
            bar: { groupWidth: "75%" },
            isStacked: false,
        },
        thereIsTypeData: false,
        type: "Line",
        isOnline: false,
        title: "שינויים מתוכננים",
    },

    {
        data: [
            ["חודש", "עירוני", "בינעירוני", "כללי"],
            ["ינו", 20, 90, 75],
            ["פברואר", 40, 62, 45],
            ["מרץ", 70, 91, 76],
            ["אפריל", 50, 80, 87],
            ["מאי", 60, 70, 98],
            ["יוני", 40, 30, 76],
        ],
        options: {
            chartArea: { width: "80%", height: "60%" },
            hAxis: {
                title: "תאיריכים",
                direction: -1,
                slantedText: true,
             },
            vAxis: { 
                title: "אחוזים",
                format: '#\'%\'',
                minValue: 0,
                maxValue: 100,
                ticks: [0, 20, 40, 60, 80, 100],
            },
            legend: { 
                position: "top",
                alignment: "center",
            },
            histogram: {
                bucketSize: 1,
                hideBucketItems: true,
            },
            series: {
                0: { pointSize: 5 },
                1: { pointSize: 5 },
                2: { pointSize: 5 },
            },
            bar: { groupWidth: "75%" },
            isStacked: false,
        },
        thereIsTypeData: true,
        type: "Line",
        isOnline: false,
        title: "תלונות לפי תאריך",
    },

    {
        data: [
            ["חודש", "עירוני", "בינעירוני", "כללי"],
            ["ינו", 20, 90, 75],
            ["פברואר", 40, 62, 45],
            ["מרץ", 70, 91, 76],
            ["אפריל", 50, 80, 87],
            ["מאי", 60, 70, 98],
            ["יוני", 40, 30, 76],
        ],
        options: {
            chartArea: { width: "80%", height: "60%" },
            hAxis: {
                title: "תאיריכים",
                direction: -1,
                slantedText: true,
             },
            vAxis: { 
                title: "אחוזים",
                format: '#\'%\'',
                minValue: 0,
                maxValue: 100,
                ticks: [0, 20, 40, 60, 80, 100],
            },
            legend: { 
                position: "top",
                alignment: "center",
            },
            histogram: {
                bucketSize: 1,
                hideBucketItems: true,
            },
            series: {
                0: { pointSize: 5 },
                1: { pointSize: 5 },
                2: { pointSize: 5 },
            },
            bar: { groupWidth: "75%" },
            isStacked: false,
        },
        thereIsTypeData: false,
        type: "Line",
        isOnline: false,
        title: "סוג נסיעות מתוכנן",
    },

    {
        data: [
            ["Категория", "Значение"],
            ["הקדמה 3 דקות ומעלה", 406],
            ["הקדמה עד 2 דקות", 287],
            ["עד 5 דקות", 198],
            ["6-10 דקות", 99],
            ["11-20 דקות", 220],
            ["מעל 20 דקות", 220],
            ["לא בוצע", 220],
        ],
        options: {
            legend: { position: "left" },
            chartArea: { width: "100%", height: "100%" },
        },
        thereIsTypeData: false,
        isOnline: false,
        type: "Area",
        title: "איחורים / הקדמות לתקופה",
    },

    {
        data: [
            ["חודש", "עירוני", "בינעירוני", "כללי"],
            ["ינו", 20, 90, 75],
            ["פברואר", 40, 62, 45],
            ["מרץ", 70, 91, 76],
            ["אפריל", 50, 80, 87],
            ["מאי", 60, 70, 98],
            ["יוני", 40, 30, 76],
        ],
        options: {
            chartArea: { width: "80%", height: "60%" },
            hAxis: {
                title: "תאיריכים",
                direction: -1,
                slantedText: true,
             },
            vAxis: { 
                title: "אחוזים",
                format: '#\'%\'',
                minValue: 0,
                maxValue: 100,
                ticks: [0, 20, 40, 60, 80, 100],
            },
            legend: { 
                position: "top",
                alignment: "center",
            },
            histogram: {
                bucketSize: 1,
                hideBucketItems: true,
            },
            series: {
                0: { pointSize: 5 },
                1: { pointSize: 5 },
                2: { pointSize: 5 },
            },
            bar: { groupWidth: "75%" },
            isStacked: false,
        },
        thereIsTypeData: false,
        type: "Line",
        isOnline: false,
        title: "תלונות לפי סוג",
    },

    // {
    //     data: [
    //         ["Месяц", "Молоко", "Соль", "Перец"],
    //         ["Янв", 90, 95, 92],
    //         ["Фев", 85, 90, 92],
    //         ["Мар", 80, 85, 93],
    //         ["Апр", 65, 75, 94],
    //         ["Май", 85, 80, 94],
    //         ["Июн", 90, 85, 95],
    //     ],
    //     options: {
    //         hAxis: {
    //             title: "Месяц",
    //             direction: -1,
    //             slantedText: true,
    //         },
    //         vAxis: {
    //             title: "Процентов",
    //             format: "#",
    //             minValue: 0,
    //             maxValue: 100,
    //             ticks: [0, 20, 40, 60, 80, 100],
    //         },
    //         legend: { position: "top" },
    //         chartArea: { width: "70%", height: "70%" },
    //         series: {
    //             0: { pointSize: 5 },
    //             1: { pointSize: 5 },
    //             2: { pointSize: 5 },
    //         },
    //     },
    //     thereIsTypeData: false,
    //     isOnline: false,
    //     type: "Line",
    //     title: "Данные\\Данные",
    // },
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
