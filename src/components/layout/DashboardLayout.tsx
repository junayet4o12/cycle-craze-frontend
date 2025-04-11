import { Outlet } from "react-router-dom";
import Sidebar from "../modules/dashboard/Sidebar";


export default function DashboardLayout() {
    return (
        <div className="flex gap-2">
            <Sidebar />
            <div className="w-full min-h-screen py-8">
                <Outlet />
            </div>
        </div>
    );
}