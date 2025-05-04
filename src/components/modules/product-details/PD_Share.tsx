import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Share2, Twitter } from "lucide-react";


export default function PD_Share() {
    return (
        <div className="flex gap-3">
            <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                <Facebook size={16} />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                <Twitter size={16} />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                <Instagram size={16} />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                <Share2 size={16} />
            </Button>
        </div>
    );
}