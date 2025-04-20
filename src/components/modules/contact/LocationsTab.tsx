import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Phone } from "lucide-react";
import ServiceAreaCard from "./ServiceAreaCard";
type LocationItem = {
    title: string;
    description: string;
    address: string[];
    phone: string;
    hours: string[];
  };

export default function LocationsTab() {
    const locations: LocationItem[] = [
        {
            title: "Main Store & Service Center",
            description: "Our flagship location with full sales, service, and fitting center",
            address: ["123 Bike Lane", "Cycletown, CT 12345"],
            phone: "(555) 123-4567",
            hours: [
                "Monday - Friday: 9am - 7pm",
                "Saturday: 9am - 6pm",
                "Sunday: 10am - 4pm"
            ]
        },
        {
            title: "Downtown Express Shop",
            description: "Quick service and accessories in a convenient downtown location",
            address: ["456 Urban Street", "Downtown, CT 12345"],
            phone: "(555) 987-6543",
            hours: [
                "Monday - Friday: 10am - 6pm",
                "Saturday: 10am - 5pm",
                "Sunday: Closed"
            ]
        }
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {locations.map((location, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{location.title}</CardTitle>
                            <CardDescription>{location.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video bg-gray-100 rounded-md mb-4 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <MapPin className="h-8 w-8" />
                                    <span className="sr-only">Map placeholder</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 text-primary mt-2 mr-3" />
                                    <div>
                                        <h4 className="font-medium">Address</h4>
                                        {location.address.map((line, i) => (
                                            <p key={i} className="text-foreground/70">{line}</p>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Phone className="h-5 w-5 text-primary mt-2 mr-3" />
                                    <div>
                                        <h3 className="font-medium">Phone</h3>
                                        <p className="text-foreground/70">{location.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Clock className="h-5 w-5 text-primary mt-2 mr-3" />
                                    <div>
                                        <h3 className="font-medium">Hours</h3>
                                        {location.hours.map((hour, i) => (
                                            <p key={i} className="text-foreground/70">{hour}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">Get Directions</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <ServiceAreaCard />
        </>
    );
};