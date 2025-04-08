import MainLayout from "@/components/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./auth.routes";
import AuthLayout from "@/components/layout/AuthLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />
    },
    {
        path: 'auth',
        element: <AuthLayout/>,
        children: authRoutes
    }

]);

export default router;