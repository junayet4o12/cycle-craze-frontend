import { useMyOrdersQuery } from "@/redux/features/order/orderApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MO_StatusBadge from "@/components/modules/dashboard/manage-orders/MO_StatusBadge";
import { ArrowUpRight } from "lucide-react";


export default function MyOrders() {
  const { data, isLoading } = useMyOrdersQuery(undefined);

  const formatDate = (dateString: Date): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <Card key={item}>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <section className="py-8">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <Card className="text-center p-6">
          <CardContent className="pt-6">
            <p className="text-gray-600">You haven't placed any orders yet.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/shop">
              <Button>
                Start Shopping
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {data?.data?.map((order) => (
          <Link key={order._id} to={`/order-details/${order._id}`}>
            <Card className="group mb-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    Order #{order._id.substring(order._id.length - 8)}
                  </CardTitle>
                  <MO_StatusBadge status={order.status} />
                </div>
                <CardDescription className="flex justify-between">
                  <span>Placed on {formatDate(order.createdAt)}</span>
                  <span className="font-medium">৳{(order.totalPrice + order.deliveryCharge).toFixed(2)}</span>
                </CardDescription>
              </CardHeader>

              <CardContent >

                <div className="flex justify-between items-center">
                  <span className="group-hover:underline transition-all duration-200">View Order Details</span>
                  <ArrowUpRight className="group-hover:scale-120 transition-all duration-200" />
                </div>

              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div >
  );
}