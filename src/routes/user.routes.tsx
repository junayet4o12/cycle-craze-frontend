import MyOrders from "@/pages/user/MyOrders";
import Profile from "@/pages/user/Profile";

export const userRoutes = [
    {
        path: 'profile',
        element: <Profile />
    },
    {
        path: 'my-orders',
        element: <MyOrders />
    },
]