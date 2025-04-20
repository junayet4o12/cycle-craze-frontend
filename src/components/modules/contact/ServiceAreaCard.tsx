import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";
type ServiceAreaItem = {
    title: string;
    description: string;
    fee: string;
};
export default function ServiceAreaCard() {
    const serviceAreas: ServiceAreaItem[] = [
        {
            title: "Mobile Repair Service",
            description: "We offer on-location repairs within a 15-mile radius of our main store.",
            fee: "$25 service call fee"
        },
        {
            title: "New Bike Delivery",
            description: "Free delivery on new bikes within 25 miles of either store location.",
            fee: "Free with purchase"
        },
        {
            title: "Rental Delivery",
            description: "Group rental deliveries available for events within 10 miles.",
            fee: "$50 for up to 5 bikes"
        }
    ];

    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Service Area</CardTitle>
                <CardDescription>Mobile service and delivery areas</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {serviceAreas.map((item, index) => (
                        <div key={index} className="bg-accent p-4 rounded-lg">
                            <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                            <p className="text-foreground/70 mb-4">{item.description}</p>
                            <div className="flex items-center text-sm text-foreground/80">
                                <Truck className="h-4 w-4 mr-2" />
                                <span>{item.fee}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};