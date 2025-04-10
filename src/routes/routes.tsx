import MainLayout from "@/components/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./auth.routes";
import AuthLayout from "@/components/layout/AuthLayout";
import { userRoutes } from "./user.routes";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            ...userRoutes
        ]
    },
    {
        path: 'auth',
        element: <AuthLayout/>,
        children: authRoutes
    }

]);

export default router;