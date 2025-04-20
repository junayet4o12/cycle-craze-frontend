
type SocialButton = {
    icon: React.ReactNode;
    name: string;
};
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function SocialCard() {
    const socialButtons: SocialButton[] = [
        { icon: <Facebook />, name: "Facebook" },
        { icon: <Instagram />, name: "Instagram" },
        { icon: <Twitter />, name: "Twitter" },
        { icon: <Linkedin />, name: "LinkedIn" }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Follow Us</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-4">
                    {socialButtons.map((button, index) => (
                        <Button key={index} variant="outline" size="icon" className="rounded-full">
                            {button.icon}
                            <span className="sr-only">{button.name}</span>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};