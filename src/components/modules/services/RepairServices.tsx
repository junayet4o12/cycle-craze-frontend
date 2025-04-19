import ServiceCard from '@/components/modules/services/ServiceCard';
import AdditionalService from '@/components/modules/services/AdditionalService';
import { Wrench } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const mainServices = [
    {
        title: "Basic Tune-Up",
        description: "Quick service to keep your bike running smoothly",
        price: 49,
        features: [
            "Safety check",
            "Brake adjustment",
            "Gear adjustment",
            "Tire inflation",
            "Chain lubrication"
        ],
        timeEstimate: "1 hour",
        icon: <Wrench className="h-6 w-6" />
    },
    {
        title: "Standard Service",
        description: "Comprehensive service for regular riders",
        price: 99,
        features: [
            "All Basic Tune-Up services",
            "Wheel truing",
            "Drivetrain cleaning",
            "Brake pad inspection",
            "Bearing adjustments",
            "Cable inspection"
        ],
        timeEstimate: "2-3 hours",
        highlighted: true,
        icon: <Wrench className="h-6 w-6" />
    },
    {
        title: "Premium Overhaul",
        description: "Complete disassembly and rebuild",
        price: 99,
        features: [
            "All Standard Service items",
            "Full disassembly",
            "Deep clean of all components",
            "Bearing service",
            "Comprehensive lubrication",
            "Cable replacement",
            "Complete safety check"
        ],
        timeEstimate: "1-2 days",
        icon: <Wrench className="h-6 w-6" />
    }
];

const additionalServices = [
    { name: "Flat Repair", price: 15 },
    { name: "Brake Adjustment", price: 20 },
    { name: "Derailleur Adjustment", price: 30 },
    { name: "Wheel Truing", price: 35 },
    { name: "Bottom Bracket Service", price: 45 },
    { name: "Headset Service", price: 40 }
];

export default function RepairServices() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mainServices.map((service, index) => (
                    <ServiceCard
                        key={index}
                        title={service.title}
                        description={service.description}
                        price={service.price}
                        features={service.features}
                        timeEstimate={service.timeEstimate}
                        icon={service.icon}
                        highlighted={service.highlighted}
                    />
                ))}
            </div>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Additional Repair Services</CardTitle>
                    <CardDescription>
                        Individual services for specific needs
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {additionalServices.map((item, index) => (
                            <AdditionalService key={index} name={item.name} price={item.price} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
