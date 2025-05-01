import { Outlet } from "react-router-dom";
import Sidebar from "../modules/dashboard/Sidebar";
import BottomNavbar from "../modules/bottom-navbar/BottomNavbar";
import ScrollToTop from "../ScrollToTop";


export default function DashboardLayout() {
    return (
        <div className="flex">
            <ScrollToTop />
            <Sidebar />
            <BottomNavbar />
            <div className="w-full min-h-screen py-8 px-4">
                <Outlet />
            </div>
        </div>
    );
}