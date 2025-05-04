import { Button } from "@/components/ui/button";
import { ArrowLeft,ListFilter, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import BottomNavbar from "../bottom-navbar/BottomNavbar";


export default function Four0Four() {
    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            <BottomNavbar />
            <section className="py-8">
                <div className="flex flex-col items-center justify-center py-20">
                    <ListFilter className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">Page Not Found!</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                        Sorry, the page you are looking for doesn't exist or has been moved.
                    </p>
                    <div className="flex gap-4 items-center mt-6">
                        <Button
                            onClick={() => navigate(-1)}
                            variant="outline"
                        >
                            <ArrowLeft />
                            Go Back
                        </Button>
                        <p> Or</p>
                        <Link to={'/shop'}>
                            <Button
                                variant="default"
                            >
                                <ShoppingCart />
                                Shop Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}