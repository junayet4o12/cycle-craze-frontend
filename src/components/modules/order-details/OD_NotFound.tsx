import { Button } from "@/components/ui/button";
import { ArrowLeft, ListFilter } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function OD_NotFound() {
    const navigate = useNavigate()
    return (
        <section className="py-8">
            <div className="flex flex-col items-center justify-center py-20">
                <ListFilter className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Order not found!</h3>
                <p className="text-muted-foreground text-center max-w-md">
                    We couldn't find the order details. Please check your order number or contact customer support.
                </p>
                <Button
                    onClick={() => navigate(-1)}
                    variant="outline"
                    className="mt-6"
                >
                    <ArrowLeft />
                    Go Back
                </Button>
            </div>
        </section>
    );
}