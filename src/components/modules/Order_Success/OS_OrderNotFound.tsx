import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function OS_OrderNotFound() {
    const navigate = useNavigate()
    return (
        <section className="py-8">
            <Alert variant="destructive">
                <AlertTitle>Order Not Found</AlertTitle>
                <AlertDescription>
                    We couldn't find the order details.
                    Please check your order number or contact customer support.
                </AlertDescription>
            </Alert>
            <div className="mt-8 flex justify-center">
                <Button onClick={() => navigate("/")}>
                    <Home className="mr-2 h-4 w-4" />
                    Return to Home
                </Button>
            </div>
        </section>
    );
}