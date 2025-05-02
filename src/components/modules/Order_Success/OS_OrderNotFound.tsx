import { Button } from "@/components/ui/button";
import { Home, ListFilter } from "lucide-react";
import { Link } from "react-router-dom";


export default function OS_OrderNotFound() {
    return (
        <section className="py-8">
            <div className="flex flex-col items-center justify-center py-20">
                <ListFilter className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Order not found!</h3>
                <p className="text-muted-foreground text-center max-w-md">
                We couldn't find the order details. Please check your order number or contact customer support.
                </p>
                <Link to={'/'}>
                    <Button
                        variant="outline"
                        className="mt-6"
                    >
                        <Home/>
                        Return To Home
                    </Button>
                </Link>
            </div>
        </section>
    );
}