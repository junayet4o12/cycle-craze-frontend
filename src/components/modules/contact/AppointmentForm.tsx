import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";
export default function AppointmentForm() {
    const appointmentTypes = [
        { value: "repair", label: "Bike Repair/Service" },
        { value: "fitting", label: "Bike Fitting" },
        { value: "consultation", label: "Custom Build Consultation" },
        { value: "test", label: "Test Ride" },
        { value: "other", label: "Other" }
    ];

    const serviceTypes = [
        { value: "basicTuneUp", label: "Basic Tune-Up" },
        { value: "standardService", label: "Standard Service" },
        { value: "premiumOverhaul", label: "Premium Overhaul" },
        { value: "specificRepair", label: "Specific Repair" },
        { value: "notSure", label: "Not Sure (We'll Help)" }
    ];

    const bikeTypes = [
        { value: "mountain", label: "Mountain Bike" },
        { value: "road", label: "Road Bike" },
        { value: "hybrid", label: "Hybrid Bike" },
        { value: "electric", label: "Electric Bike" },
        { value: "bmx", label: "BMX" },
        { value: "other", label: "Other" }
    ];

    const timeSlots = [
        { value: "morning", label: "Morning (9am - 12pm)" },
        { value: "afternoon", label: "Afternoon (12pm - 3pm)" },
        { value: "evening", label: "Evening (3pm - 6pm)" }
    ];
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Book an Appointment</CardTitle>
                <CardDescription>
                    Schedule a service appointment, bike fitting, or consultation with our experts
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="appointmentType">Appointment Type</Label>
                                <Select defaultValue="repair">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select appointment type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {appointmentTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="serviceType">Service Type</Label>
                                <Select defaultValue="basicTuneUp">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select service type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {serviceTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bikeType">Bike Type</Label>
                                <Select defaultValue="mountain">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select bike type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bikeTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="details">Additional Details</Label>
                                <Textarea
                                    id="details"
                                    placeholder="Please provide any additional information about your bike or service needs..."
                                    rows={4}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
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
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="preferredDate">Preferred Date</Label>
                                <Input id="preferredDate" type="date" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="preferredTime">Preferred Time</Label>
                                <Select defaultValue="morning">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select preferred time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeSlots.map((slot) => (
                                            <SelectItem key={slot.value} value={slot.value}>{slot.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button type="submit" className="w-full md:w-auto">
                            <CalendarClock className="h-4 w-4 mr-2" />
                            Schedule Appointment
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="text-sm text-foreground/70">
                Our team will confirm your appointment within 24 hours.
            </CardFooter>
        </Card>
    );
};