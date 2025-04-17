import MainLayout from "@/components/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./auth.routes";
import AuthLayout from "@/components/layout/AuthLayout";
import { userRoutes } from "./user.routes";
import UserLayout from "@/components/layout/UserLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { dashboardRoutes } from "./dashboard.routes";
import ProtectedRoutes from "@/components/private_routes/protected-routes";
import Home from "@/pages/base-pages/Home";
import Shop from "@/pages/base-pages/Shop";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'shop',
                element: <Shop />
            },
            {
                path: '',
                element: <ProtectedRoutes><UserLayout /></ProtectedRoutes>,
                children: userRoutes
            },
        ]
    },
    {
        path: 'auth',
        element: <AuthLayout />,
        children: authRoutes
    },
    {
        path: '/dashboard',
        element: <ProtectedRoutes AdminRoutes={true}><DashboardLayout /></ProtectedRoutes>,
        children: dashboardRoutes
    },

]);

export default router;