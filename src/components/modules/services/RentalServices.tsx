import { Check, Calendar, Truck, RotateCcw, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import RentalOption from '@/components/modules/services/RentalOption';

const rentalOptions = [
  { category: 'Mountain Bikes', hourlyRate: 15, dailyRate: 45, weeklyRate: 180 },
  { category: 'Road Bikes', hourlyRate: 18, dailyRate: 55, weeklyRate: 220 },
  { category: 'Electric Bikes', hourlyRate: 25, dailyRate: 75, weeklyRate: 300 },
  { category: 'Hybrid Bikes', hourlyRate: 12, dailyRate: 40, weeklyRate: 160 },
];

const rentalInfos = [
  {
    icon: <Calendar className="h-5 w-5" />,
    title: 'Reservation Policy',
    description: '24-hour advance booking recommended. ID and credit card required.',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: 'Hours',
    description: 'Rentals available 9am-6pm daily. Late returns subject to additional fees.',
  },
  {
    icon: <RotateCcw className="h-5 w-5" />,
    title: 'Included Accessories',
    description: 'Helmet, lock, and basic repair kit included with all rentals.',
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: 'Delivery',
    description: 'Bike delivery available within 10 miles for an additional fee.',
  },
];

function RentalInfoItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 pt-1 text-primary">{icon}</div>
      <div className="ml-3">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function GroupDiscountItem({ text }: { text: string }) {
  return (
    <li className="flex items-center">
      <Check className="h-4 w-4 text-green-500 mr-2" />
      <span>{text}</span>
    </li>
  );
}

export default function RentalServices() {
  return (
    <>
      {/* Rental Options & Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Rental Options */}
        <Card>
          <CardHeader>
            <CardTitle>Rental Options</CardTitle>
            <CardDescription>
              Quality bikes for your adventures, available by hour, day, or week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rentalOptions.map((option, idx) => (
                <div key={option.category}>
                  <RentalOption {...option} />
                  {idx !== rentalOptions.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Check Availability</Button>
          </CardFooter>
        </Card>

        {/* Rental Info */}
        <Card>
          <CardHeader>
            <CardTitle>Rental Information</CardTitle>
            <CardDescription>
              Everything you need to know about our rental services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rentalInfos.map((info, idx) => (
                <RentalInfoItem key={idx} {...info} />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-gray-500 italic">
              All rentals include basic orientation and fitting.
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Group & Event Rentals */}
      <Card>
        <CardHeader>
          <CardTitle>Group & Event Rentals</CardTitle>
          <CardDescription>Special rates for groups and events</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Planning a company outing, team building event, or group ride? We offer special rates for groups of 5 or more bikes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Group Discounts */}
            <div className="bg-accent p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Group Discounts</h3>
              <ul className="space-y-2">
                <GroupDiscountItem text="5-9 bikes: 10% off standard rates" />
                <GroupDiscountItem text="10-19 bikes: 15% off standard rates" />
                <GroupDiscountItem text="20+ bikes: 20% off standard rates" />
              </ul>
            </div>

            {/* Event Services */}
            <div className="bg-accent p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Event Services</h3>
              <ul className="space-y-2">
                <GroupDiscountItem text="On-site delivery and pickup" />
                <GroupDiscountItem text="Event support staff available" />
                <GroupDiscountItem text="Custom routes and guided tours" />
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full md:w-auto">Request Group Quote</Button>
        </CardFooter>
      </Card>
    </>
  );
}
