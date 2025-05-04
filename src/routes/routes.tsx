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
import ProductDetails from "@/pages/product-details/ProductDetails";
import Services from "@/pages/base-pages/Services";
import Contact from "@/pages/base-pages/Contact";
import Cart from "@/pages/base-pages/Cart";
import Checkout from "@/pages/base-pages/Checkout";
import OP_Success from "@/pages/base-pages/OrderSuccess/OP_Success";
import COD_Success from "@/pages/base-pages/OrderSuccess/COD_Success";
import Wishlist from "@/pages/base-pages/Wishlist";
import OrderCancel from "@/pages/base-pages/OrderCancel";
import OrderFail from "@/pages/base-pages/OrderFail";
import Four0Four from "@/components/modules/404/Four0Four";
import OrderDetails from "@/pages/order-details/OrderDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <Four0Four/>,
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
                path: 'product-details/:id',
                element: <ProductDetails />
            },
            {
                path: 'order-details/:id',
                element: <OrderDetails />
            },
            {
                path: 'services',
                element: <Services />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'wishlist',
                element: <Wishlist />
            },
            {
                path: 'checkout',
                element: <Checkout />
            },
            {
                path: 'checkout/OP/success/:tranId',
                element: <OP_Success />
            },
            {
                path: 'checkout/OP/cancel',
                element: <OrderCancel />
            },
            {
                path: 'checkout/OP/fail',
                element: <OrderFail />
            },
            {
                path: 'checkout/COD/success/:id',
                element: <COD_Success />
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
        errorElement: <Four0Four/>,
        children: authRoutes
    },
    {
        path: '/dashboard',
        element: <ProtectedRoutes AdminRoutes={true}><DashboardLayout /></ProtectedRoutes>,
        errorElement: <Four0Four/>,
        children: dashboardRoutes
    },

]);

export default router;