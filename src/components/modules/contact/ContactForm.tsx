import { ChangeEvent, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
export default function ContactForm() {
    const [formSubmitted] = useState(false)
    const subjectOptions = [
        { value: "generalInquiry", label: "General Inquiry" },
        { value: "productQuestion", label: "Product Question" },
        { value: "serviceRequest", label: "Service Request" },
        { value: "feedback", label: "Feedback" },
        { value: "other", label: "Other" }
    ];
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {formSubmitted ? (
                    <Alert className="bg-green-50 border-green-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-600">
                            Your message has been sent! We'll get back to you soon.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input id="firstName" placeholder="John" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input id="lastName" placeholder="Doe" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="johndoe@example.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone (optional)</Label>
                                <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Select defaultValue="generalInquiry">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjectOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Your message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Please enter your message here..."
                                    rows={5}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">Send Message</Button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    );
};