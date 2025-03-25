import { ChartCard } from "./chart-card/chart-card";
import styles from "./charts.module.css";
import { useEffect, useState } from "react";
import { useFilters } from "../../contexts/filters-context";
import { 
    fetchPlanVsPerformance, 
    fetchPerformancePercentage, 
    fetchPlannedTrips, 
    fetchLinePerformanceDetails, 
    fetchPlannedChanges 
} from "../../services/charts-api";

export const Charts = () => {
    const { selectedFilters, filteredData } = useFilters();
    const [chartsData, setChartsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = import.meta.env.VITE_URL;
    const userId = import.meta.env.VITE_USERID;
    const user = import.meta.env.VITE_USER;
    const password = import.meta.env.VITE_PASSWORD;

    const authData = { url, user, password, userId };

    useEffect(() => {
        const loadChartData = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                // Поменять даты на прошедший период
                const apiFilters = {
                    startDate: '2025-01-01', // Подставьте реальную логику для дат
                    endDate: '2025-03-24',   // Подставьте реальную логику для дат
                    groupBy: 'MONTH',
                    City: selectedFilters.City,
                    AgencyId: selectedFilters.Agency,
                    ClusterId: selectedFilters.Cluster,
                    SubCluster: selectedFilters.SubCluster,
                    LineType: selectedFilters.LineType,
                    LineId: selectedFilters.RouteNumber,
                    linegroup: selectedFilters.linegroup
                };
                
                // Выводим логи для отладки
                console.log('Отправка запросов с параметрами:', apiFilters);
                
                // Выполняем запросы индивидуально с обработкой ошибок
                const results = await Promise.allSettled([
                    fetchPlanVsPerformance(apiFilters, authData),
                    fetchPerformancePercentage(apiFilters, authData),
                    fetchPlannedTrips(apiFilters, authData),
                    fetchLinePerformanceDetails(apiFilters, authData),
                    fetchPlannedChanges(apiFilters, authData)
                ]);
                
                // Извлекаем данные или null для каждого запроса
                const planVsPerformanceData = results[0].status === 'fulfilled' ? results[0].value : null;
                const performancePercentageData = results[1].status === 'fulfilled' ? results[1].value : null;
                const plannedTripsData = results[2].status === 'fulfilled' ? results[2].value : null;
                const linePerformanceData = results[3].status === 'fulfilled' ? results[3].value : null;
                const plannedChangesData = results[4].status === 'fulfilled' ? results[4].value : null;
                
                // Добавим отладочные логи для трансформации
                console.log('Полученные данные из API:');
                console.log('planVsPerformanceData:', planVsPerformanceData);
                console.log('performancePercentageData:', performancePercentageData);
                console.log('plannedTripsData:', plannedTripsData);
                console.log('linePerformanceData:', linePerformanceData);
                console.log('plannedChangesData:', plannedChangesData);
                
                // Преобразуем имеющиеся данные в графики
                const charts = transformDataToCharts(
                    planVsPerformanceData, 
                    performancePercentageData, 
                    plannedTripsData, 
                    linePerformanceData, 
                    plannedChangesData
                );
                
                // Проверяем результат трансформации
                console.log('Преобразованные графики:', charts);
                
                // Проверяем, есть ли хоть какие-то полученные данные
                if (charts.length === 0) {
                    // Если все API вернули ошибки, используем дефолтные графики
                    console.warn("Все API-запросы завершились ошибкой, используем дефолтные графики");
                    setChartsData([]); // Это активирует условие для отображения defaultCharts
                } else {
                    setChartsData(charts);
                }
                
                // Записываем ошибки в консоль для отладки
                results.forEach((result, index) => {
                    if (result.status === 'rejected') {
                        const endpoints = [
                            'TripsPlannedVSPerformed', 
                            'TripsPlannedVSPerformedPercentage', 
                            'TripsPlanned', 
                            'PerformanceDetailsForLine', 
                            'TripsPlannedChanges'
                        ];
                        console.error(`Ошибка при запросе ${endpoints[index]}:`, result.reason);
                    }
                });
            } catch (err) {
                console.error("Ошибка при загрузке данных для графиков:", err);
                setError(err.message || "Ошибка при загрузке данных");
            } finally {
                setIsLoading(false);
            }
        };
        
        loadChartData();
    }, [selectedFilters]);

    // Вспомогательная функция для форматирования месяцев
    const formatMonth = (monthStr) => {
        const monthNames = {
            '01': 'ינו',
            '02': 'פבר',
            '03': 'מרץ',
            '04': 'אפר',
            '05': 'מאי',
            '06': 'יוני',
            '07': 'יולי',
            '08': 'אוג',
            '09': 'ספט',
            '10': 'אוק',
            '11': 'נוב',
            '12': 'דצמ'
        };
        
        const [year, month] = monthStr.split('-');
        return `${monthNames[month]} ${year}`;
    };

    // Функция для преобразования данных API в формат для графиков
    const transformDataToCharts = (
        planVsPerformanceData, 
        performancePercentageData, 
        plannedTripsData, 
        linePerformanceData, 
        plannedChangesData
    ) => {
        const charts = [];
        
        // 1. График "תכנון / ביצוע" (План / Выполнение)
        if (planVsPerformanceData && planVsPerformanceData.length > 0) {
            // Преобразуем данные API в формат для графика
            const planVsPerformanceChart = {
                data: [
                    ["חודש", "בוצע", "מתוכנן"],
                    // Преобразуем данные из planVsPerformanceData
                    ...planVsPerformanceData.map(item => [
                        item.Month || item.Date || 'חודש', // Заголовок
                        item.ActualTrips || 0,             // Выполнено 
                        item.PlannedTrips || 0            // План
                    ])
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
                    },
                    legend: { 
                        position: "top",
                        alignment: "center",
                    },
                    series: {
                        0: { pointSize: 5 },
                        1: { pointSize: 5 }
                    },
                    isStacked: false,
                },
                type: "Line",
                isOnline: true,
                title: "תכנון / ביצוע",
            };
            charts.push(planVsPerformanceChart);
        }
        
        // 2. График "אחוז ביצוע" (Процент выполнения)
        if (performancePercentageData && performancePercentageData.length > 0) {
            const performancePercentageChart = {
                data: [
                    ["חודש", "אחוז ביצוע"],
                    // Преобразуем данные из performancePercentageData
                    ...performancePercentageData.map(item => [
                        item.Month || item.Date || 'חודש',   // Заголовок
                        item.PerformancePercentage || 0      // Процент выполнения
                    ])
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
                    },
                    legend: { 
                        position: "top",
                        alignment: "center",
                    },
                    series: {
                        0: { pointSize: 5 }
                    },
                    isStacked: false,
                },
                type: "Line",
                isOnline: true,
                title: "אחוז ביצוע",
            };
            charts.push(performancePercentageChart);
        }
        
        // 3. График "שינויים מתוכננים" (Запланированные изменения)
        if (plannedChangesData && plannedChangesData.length > 0) {
            console.log('Начало обработки данных для графика "שינויים מתוכננים"');
            
            // Группируем данные по месяцам
            const monthlyData = {};
            
            plannedChangesData.forEach(item => {
                const month = item.GroupBy;
                if (!monthlyData[month]) {
                    monthlyData[month] = {
                        Times: 0,
                        Weekly: 0,
                        Daily: 0,
                        Stops: 0
                    };
                }
                
                // Добавляем количество для соответствующей категории
                monthlyData[month][item.CombinedCategory] = item.Amount;
            });
            
            console.log('Сгруппированные данные по месяцам для изменений:', monthlyData);
            
            // Преобразуем сгруппированные данные в формат для графика
            const chartData = [
                ["חודש", "Times", "Weekly", "Daily", "Stops"]
            ];
            
            Object.entries(monthlyData).forEach(([month, data]) => {
                const monthDisplay = formatMonth(month);
                chartData.push([
                    monthDisplay,
                    data.Times || 0,
                    data.Weekly || 0,
                    data.Daily || 0,
                    data.Stops || 0
                ]);
            });
            
            console.log('Финальные данные для графика изменений:', chartData);
            
            const plannedChangesChart = {
                data: chartData,
                options: {
                    chartArea: { width: "80%", height: "60%" },
                    hAxis: {
                        title: "תאיריכים",
                        direction: -1,
                        slantedText: true,
                    },
                    vAxis: { 
                        title: "כמות שינויים",
                    },
                    legend: { 
                        position: "top",
                        alignment: "center",
                    },
                    series: {
                        0: { pointSize: 5 },
                        1: { pointSize: 5 },
                        2: { pointSize: 5 },
                        3: { pointSize: 5 }
                    },
                    isStacked: false,
                },
                type: "Line",
                isOnline: true,
                title: "שינויים מתוכננים",
            };
            
            charts.push(plannedChangesChart);
            console.log('График изменений добавлен, текущее количество графиков:', charts.length);
        }
        
        // 4. График "סוג נסיעות מתוכנן" (Типы запланированных поездок)
        if (plannedTripsData && plannedTripsData.length > 0) {
            console.log('Начало обработки данных для графика "סוג נסיעות מתוכנן"');
            
            // Данные уже сгруппированы по месяцам в ответе API
            const chartData = [
                ["חודש", "עירוני", "בינעירוני"]
            ];
            
            // Преобразуем данные в формат для графика
            plannedTripsData.forEach(item => {
                const monthDisplay = formatMonth(item.GroupBy);
                chartData.push([
                    monthDisplay,
                    item.City || 0,     // городские (עירוני)
                    item.InterCity || 0 // междугородние (בינעירוני)
                ]);
            });
            
            console.log('Финальные данные для графика запланированных поездок:', chartData);
            
            const plannedTripsChart = {
                data: chartData,
                options: {
                    chartArea: { width: "80%", height: "60%" },
                    hAxis: {
                        title: "תאיריכים",
                        direction: -1,
                        slantedText: true,
                    },
                    vAxis: { 
                        title: "כמות נסיעות",
                    },
                    legend: { 
                        position: "top",
                        alignment: "center",
                    },
                    series: {
                        0: { pointSize: 5 },
                        1: { pointSize: 5 }
                    },
                    isStacked: false,
                },
                type: "Line",
                isOnline: true,
                title: "סוג נסיעות מתוכנן",
            };
            
            charts.push(plannedTripsChart);
            console.log('График запланированных поездок добавлен, текущее количество графиков:', charts.length);
        }
        
        // 5. График "איחורים / הקדמות לתקופה" (Опоздания/опережения за период)
        if (linePerformanceData && linePerformanceData.length > 0) {
            // Агрегируем данные по задержкам
            const delayCategories = {
                "הקדמה 3 דקות ומעלה": 0,   // Опережение на 3 минуты и более
                "הקדמה עד 2 דקות": 0,      // Опережение до 2 минут
                "עד 5 דקות": 0,            // До 5 минут
                "6-10 דקות": 0,            // 6-10 минут
                "11-20 דקות": 0,           // 11-20 минут
                "מעל 20 דקות": 0,          // Более 20 минут
                "לא בוצע": 0               // Не выполнено
            };
            
            // Заполняем данные из linePerformanceData
            linePerformanceData.forEach(item => {
                if (item.Delay <= -3) delayCategories["הקדמה 3 דקות ומעלה"]++;
                else if (item.Delay < 0) delayCategories["הקדמה עד 2 דקות"]++;
                else if (item.Delay <= 5) delayCategories["עד 5 דקות"]++;
                else if (item.Delay <= 10) delayCategories["6-10 דקות"]++;
                else if (item.Delay <= 20) delayCategories["11-20 דקות"]++;
                else if (item.Delay > 20) delayCategories["מעל 20 דקות"]++;
                else if (item.Status === "NotPerformed") delayCategories["לא בוצע"]++;
            });
            
            const delayChartData = [
                ["Категория", "Значение"],
                ...Object.entries(delayCategories).map(([key, value]) => [key, value])
            ];
            
            const delayPerformanceChart = {
                data: delayChartData,
                options: {
                    legend: { position: "left" },
                    chartArea: { width: "100%", height: "100%" },
                },
                type: "Area",
                isOnline: true,
                title: "איחורים / הקדמות לתקופה",
            };
            charts.push(delayPerformanceChart);
        }
        
        // 6-7. Для остальных графиков, которым нет данных из API, можно добавить заглушки
        // или не добавлять их вовсе, тогда будут отображаться тестовые данные
        
        return charts;
    };

    if (isLoading) {
        return <div className={styles.loading}>טוען נתונים...</div>;
    }

    if (error) {
        return <div className={styles.error}>שגיאה: {error}</div>;
    }

    // Используем тестовые данные, пока не реализована полная логика трансформации
    const defaultCharts = [
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
                bar: { groupWidth: "75%" },
                series: {
                    0: { pointSize: 5 },
                    1: { pointSize: 5 },
                    2: { pointSize: 5 },
                },
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
            isOnline: false,
            title: "תלונות לפי סוג",
        },
    ];

    return (
        <section className={styles.charts}>
            {(chartsData && chartsData.length > 0) ? chartsData.map((chart, ind) => (
                <ChartCard chart={chart} key={ind} />
            )) : defaultCharts.map((chart, ind) => (
                <ChartCard chart={chart} key={ind} />
            ))}
        </section>
    );
};
