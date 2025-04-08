import ForgotPassword from "@/pages/authentications/ForgotPassword";
import Login from "@/pages/authentications/Login";
import ResetPassword from "@/pages/authentications/ResetPassword";
import SignUp from "@/pages/authentications/Signup";

export const authRoutes = [
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'sign-up',
        element: <SignUp />
    },
    {
        path: 'forgot-password',
        element: <ForgotPassword />
    },
    {
        path: 'reset-password',
        element: <ResetPassword />
    },
]