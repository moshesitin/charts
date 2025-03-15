import { Outlet } from "react-router-dom";
import { Header } from "./header/header";

export const AuthLayout = () => {
    return (
        <>
            <header>
                <Header thereAreActivities={false} />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};
