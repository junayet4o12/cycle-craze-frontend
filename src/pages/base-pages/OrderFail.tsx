import { Button } from "@/components/ui/button";
import { Home, ListFilter, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderFail() {
    return (
        <section className="py-8">
            <div className="flex flex-col items-center justify-center py-20">
                <ListFilter className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Payment Failed!</h3>
                <p className="text-muted-foreground text-center max-w-md">
                    Payment has failed. Please checkout on more time or contact customer support.
                </p>
                <div className="space-x-4 flex items-center mt-6">
                    <Link to={'/'}>
                        <Button
                            variant="outline"
                        >
                            <Home />
                            Return To Home
                        </Button>
                    </Link>
                    <p> Or</p>
                    <Link to={'/checkout'}>
                        <Button
                            variant="outline"
                        >
                            <ShoppingCart />
                            Checkout
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}