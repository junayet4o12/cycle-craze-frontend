import { Badge } from "@/components/ui/badge";
import { Check, Clock } from "lucide-react";


type PropTypes = {
    title: string;
    price: number;
    description: string;
    features: string[];
    duration: string;
    highlighted?: boolean;

}
export default function FittingService({ title, price, description, features, duration, highlighted = false }: PropTypes) {
    return (
        <div className={`p-6 rounded-lg border ${highlighted ? 'bg-accent-foreground border-blue-200' : 'bg-accent border-gray-200'}`}>
            <div className={`flex justify-between items-center mb-2 ${highlighted ? 'text-accent' : ''}`}>
                <h3 className="font-bold text-lg">{title}</h3>
                <Badge variant={highlighted ? "default" : "outline"}>{price}</Badge>
            </div>
            <p className={`text-sm ${highlighted ? 'text-accent' : ''} mb-4`}>{description}</p>
            <ul className={`space-y-2 mb-4 ${highlighted ? 'text-accent/90' : 'text-foreground/90'}`}>
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <div className="flex items-center text-sm text-gray-500 mt-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>{duration}</span>
            </div>
        </div>
    );
}