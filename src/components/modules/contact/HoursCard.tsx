type HoursItem = {
    day: string;
    hours: string;
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
export default function HoursCard() {
    const hoursItems: HoursItem[] = [
        { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
        { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
        { day: "Sunday", hours: "10:00 AM - 4:00 PM" }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Hours of Operation</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {hoursItems.map((item, index) => (
                        <div key={index} className="flex justify-between">
                            <span className="font-medium">{item.day}</span>
                            <span>{item.hours}</span>
                        </div>
                    ))}
                    <Separator className="my-2" />
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm text-foreground/50">
                            Service center hours may vary. Call ahead for service appointments.
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};