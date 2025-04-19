import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";


export default function AdditionalService({ name, price }: { name: string; price: number }) {
  return (
    <div className="flex justify-between items-center p-3 bg-accent rounded-md">
            <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>{name}</span>
            </div>
            <Badge variant="outline">{price}</Badge>
        </div>
  );
}