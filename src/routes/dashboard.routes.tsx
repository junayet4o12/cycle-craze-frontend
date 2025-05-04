import { dashboardItems } from "@/utils/sidebar-item-and-routes-generator";
import { Navigate } from "react-router-dom";

export const dashboardRoutes = [{
    path: '/dashboard',
    element: <Navigate to="/dashboard/analytics" replace />
},
...dashboardItems.routes,

]