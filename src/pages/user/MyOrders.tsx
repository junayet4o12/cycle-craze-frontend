import { useMyOrdersQuery } from "@/redux/features/order/orderApi";
import { IOrder, IOrderedProduct} from "@/types"; // Adjust import path as needed
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MO_StatusBadge from "@/components/modules/dashboard/manage-orders/MO_StatusBadge";


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
        {data?.data?.map((order: IOrder) => (
          <Card key={order._id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">
                  Order #{order._id.substring(order._id.length - 8)}
                </CardTitle>
                <MO_StatusBadge  status={order.status} />
              </div>
              <CardDescription className="flex justify-between">
                <span>Placed on {formatDate(order.createdAt)}</span>
                <span className="font-medium">৳{(order.totalPrice + order.deliveryCharge).toFixed(2)}</span>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="details">
                  <AccordionTrigger className="py-2">View Order Details</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Shipping Information</h4>
                        <div className="text-sm text-muted-foreground">
                          <p>{order.name}</p>
                          <p>{order.address}</p>
                          <p>Contact: {order.contact}</p>
                          {order.email && <p>Email: {order.email}</p>}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-2">Products</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead>Wheel Size</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.products.map((item: IOrderedProduct, index: number) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-3">
                                    {item.product.images?.[0] && (
                                      <img
                                        src={item.product.images[0]}
                                        alt={item.name}
                                        className="h-12 w-12 object-cover rounded"
                                      />
                                    )}
                                    <div>
                                      <p>{item.name}</p>
                                      <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>{item.product.wheelSize}"</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell className="text-right">৳{item.product.price.toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <div className="flex justify-between font-medium px-2 text-muted-foreground">
                        <span>Subtotal</span>
                        <span>৳{order.totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium px-2 text-muted-foreground">
                        <span>Delivery Charge</span>
                        <span>৳{order.deliveryCharge.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium px-2">
                        <span>Total</span>
                        <span>৳{(order.deliveryCharge + order.totalPrice).toFixed(2)}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}