import BottomNavbar from "../modules/bottom-navbar/BottomNavbar";
import Footer from "../modules/footer/Footer";
import Navbar from "../modules/navbar/Navbar";
import { Outlet } from 'react-router-dom';
import ScrollToTop from "../ScrollToTop";

export default function MainLayout() {
    return (
        <div>
            <ScrollToTop/>
            <Navbar />
            <BottomNavbar/>
            <Outlet />
            <Footer/>
        </div>
    );
}