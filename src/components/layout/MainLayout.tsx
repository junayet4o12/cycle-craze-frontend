import Footer from "../modules/footer/Footer";
import Navbar from "../modules/navbar/Navbar";
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer/>
        </>
    );
}