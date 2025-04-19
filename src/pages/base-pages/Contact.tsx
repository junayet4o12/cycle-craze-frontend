import { ChangeEvent, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Clock, MessageSquare, CalendarClock, CheckCircle2, Truck, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 3000);
    }, 500);
  };

  return (
    <section className="py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Contact Cycle Craze</h1>
        <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
          We're here to help with all your cycling needs. Reach out to our team for assistance,
          inquiries, or to schedule an appointment.
        </p>
      </div>

      <Tabs defaultValue="contact" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full  mb-8">
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
          <TabsTrigger value="appointment">Book Appointment</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="contact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                            <SelectItem value="generalInquiry">General Inquiry</SelectItem>
                            <SelectItem value="productQuestion">Product Question</SelectItem>
                            <SelectItem value="serviceRequest">Service Request</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
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

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Reach us directly through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-600">(555) 123-4567</p>
                      <p className="text-sm text-gray-500">Mon-Sat: 9am-6pm</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600">info@cyclecraze.com</p>
                      <p className="text-sm text-gray-500">We aim to respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Live Chat</h3>
                      <p className="text-gray-600">Available on our website</p>
                      <p className="text-sm text-gray-500">Mon-Fri: 10am-5pm</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hours of Operation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Friday</span>
                      <span>9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm text-gray-500">
                        Service center hours may vary. Call ahead for service appointments.
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon" className="rounded-full">
                     <Facebook/>
                      <span className="sr-only">Facebook</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                     <Instagram/>
                      <span className="sr-only">Instagram</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Twitter/>
                      <span className="sr-only">Twitter</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                     <Linkedin/>
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appointment">
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
                    <div>
                      <Label htmlFor="appointmentType">Appointment Type</Label>
                      <Select defaultValue="repair">
                        <SelectTrigger>
                          <SelectValue placeholder="Select appointment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="repair">Bike Repair/Service</SelectItem>
                          <SelectItem value="fitting">Bike Fitting</SelectItem>
                          <SelectItem value="consultation">Custom Build Consultation</SelectItem>
                          <SelectItem value="test">Test Ride</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="serviceType">Service Type</Label>
                      <Select defaultValue="basicTuneUp">
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basicTuneUp">Basic Tune-Up</SelectItem>
                          <SelectItem value="standardService">Standard Service</SelectItem>
                          <SelectItem value="premiumOverhaul">Premium Overhaul</SelectItem>
                          <SelectItem value="specificRepair">Specific Repair</SelectItem>
                          <SelectItem value="notSure">Not Sure (We'll Help)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="bikeType">Bike Type</Label>
                      <Select defaultValue="mountain">
                        <SelectTrigger>
                          <SelectValue placeholder="Select bike type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mountain">Mountain Bike</SelectItem>
                          <SelectItem value="road">Road Bike</SelectItem>
                          <SelectItem value="hybrid">Hybrid Bike</SelectItem>
                          <SelectItem value="electric">Electric Bike</SelectItem>
                          <SelectItem value="bmx">BMX</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
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
                          <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12pm - 3pm)</SelectItem>
                          <SelectItem value="evening">Evening (3pm - 6pm)</SelectItem>
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
            <CardFooter className="text-sm text-gray-500">
              Our team will confirm your appointment within 24 hours.
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Main Store & Service Center</CardTitle>
                <CardDescription>
                  Our flagship location with full sales, service, and fitting center
                </CardDescription>
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
                    <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-600">123 Bike Lane</p>
                      <p className="text-gray-600">Cycletown, CT 12345</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-600">(555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9am - 7pm</p>
                      <p className="text-gray-600">Saturday: 9am - 6pm</p>
                      <p className="text-gray-600">Sunday: 10am - 4pm</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Get Directions</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Downtown Express Shop</CardTitle>
                <CardDescription>
                  Quick service and accessories in a convenient downtown location
                </CardDescription>
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
                    <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-600">456 Urban Street</p>
                      <p className="text-gray-600">Downtown, CT 12345</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-600">(555) 987-6543</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 10am - 6pm</p>
                      <p className="text-gray-600">Saturday: 10am - 5pm</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Get Directions</Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Service Area</CardTitle>
              <CardDescription>
                Mobile service and delivery areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Mobile Repair Service</h3>
                  <p className="text-gray-600 mb-4">
                    We offer on-location repairs within a 15-mile radius of our main store.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Truck className="h-4 w-4 mr-2" />
                    <span>$25 service call fee</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">New Bike Delivery</h3>
                  <p className="text-gray-600 mb-4">
                    Free delivery on new bikes within 25 miles of either store location.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Truck className="h-4 w-4 mr-2" />
                    <span>Free with purchase</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Rental Delivery</h3>
                  <p className="text-gray-600 mb-4">
                    Group rental deliveries available for events within 10 miles.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Truck className="h-4 w-4 mr-2" />
                    <span>$50 for up to 5 bikes</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Our customer service team is available during business hours to help with any urgent inquiries.
        </p>
        <Button size="lg">
          <Phone className="h-4 w-4 mr-2" />
          Call Us Now
        </Button>
      </div>
    </section>
  );
}