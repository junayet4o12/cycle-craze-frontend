import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock } from "lucide-react";
import { ReactNode } from "react";

type PropTypes = {
    title: string;
    description: string;
    price: number;
    features: string[];
    icon: ReactNode;
    timeEstimate: string;
    highlighted?: boolean;

}

export default function ServiceCard({ title, description, price, features, icon, timeEstimate, highlighted = false }: PropTypes) {
    return (
        <Card className={`${highlighted ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}>
            <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        {icon}
                        <CardTitle className="ml-2">{title}</CardTitle>
                    </div>
                    <Badge variant={highlighted ? "default" : "outline"}>{price}</Badge>
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{timeEstimate}</span>
                </div>
                <Button>Book Now</Button>
            </CardFooter>
        </Card>
    );
}