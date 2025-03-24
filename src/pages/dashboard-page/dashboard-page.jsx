import { Charts } from "../../components/charts/charts";
import { FiltersMenu } from "../../components/filters-menu/filters-menu";
import { Reports } from "../../components/reports/reports";

export const DashboardPage = () => {
    return (
        <>
            <FiltersMenu title="לוח בקרה" />
            <Charts />
            <Reports />
        </>
    );
};
