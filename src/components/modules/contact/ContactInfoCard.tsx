import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Phone } from "lucide-react";

type ContactInfoItem = {
    icon: React.ReactNode;
    title: string;
    details: string[];
};
export default function ContactInfoCard() {
    const contactItems: ContactInfoItem[] = [
        {
            icon: <Phone className="h-5 w-5 text-primary mt-1 mr-3" />,
            title: "Phone",
            details: ["(555) 123-4567", "Mon-Sat: 9am-6pm"]
        },
        {
            icon: <Mail className="h-5 w-5 text-primary mt-1 mr-3" />,
            title: "Email",
            details: ["info@cyclecraze.com", "We aim to respond within 24 hours"]
        },
        {
            icon: <MessageSquare className="h-5 w-5 text-primary mt-1 mr-3" />,
            title: "Live Chat",
            details: ["Available on our website", "Mon-Fri: 10am-5pm"]
        }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                    Reach us directly through any of these channels
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {contactItems.map((item, index) => (
                    <div key={index} className="flex items-start">
                        {item.icon}
                        <div>
                            <h4 className="font-medium">{item.title}</h4>
                            {item.details.map((detail, i) => (
                                <p key={i} className={i === 0 ? "text-foreground/80" : "text-sm text-foreground/70"}>
                                    {detail}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}