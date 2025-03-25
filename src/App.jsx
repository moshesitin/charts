import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { DashboardPage } from "./pages/dashboard-page/dashboard-page";
import { FiltersProvider } from "./contexts/filters-context";
import { AuthLayout } from "./components/layout/auth-layout";
import { AuthorizationPage } from "./pages/authorization-page/authorization-page";
import { AuthProvider } from "./components/auth/auth-context";

export const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [{ index: true, element: <DashboardPage /> }],
        },
        {
            path: "/authorization",
            element: <AuthLayout />,
            children: [{ index: true, element: <AuthorizationPage /> }],
        },
    ]);

    return (
        <AuthProvider>
            <FiltersProvider>
                <RouterProvider router={router} />
            </FiltersProvider>
        </AuthProvider>
    );
};
