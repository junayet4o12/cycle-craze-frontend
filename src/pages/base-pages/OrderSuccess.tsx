import { useParams, useNavigate, Link } from "react-router-dom";
import { Check, ChevronRight, Download, Home, ShoppingBag } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrderByTranIdQuery } from "@/redux/features/order/orderApi";
import { dateToStringDate } from "@/utils/dateToStringDate";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
export default function OrderSuccess() {
  const user = useAppSelector(selectCurrentUser)
  const { tranId } = useParams();
  const dispatch = useAppDispatch()
  const { data, isLoading } = useOrderByTranIdQuery(tranId || 'not-found')
  const navigate = useNavigate();
  const orderData = data?.data
  // Handle print receipt functionality
  const handlePrintReceipt = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <Alert variant="destructive">
          <AlertTitle>Order Not Found</AlertTitle>
          <AlertDescription>
            We couldn't find the order details for transaction ID: {tranId}.
            Please check your order number or contact customer support.
          </AlertDescription>
        </Alert>
        <div className="mt-8 flex justify-center">
          <Button onClick={() => navigate("/")}>
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </div>
      </div>
    );
  }
  dispatch(clearCart())
  return (
    <section className="py-8">
      <div className="max-w-4xl">
        <div className="space-y-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="bg-green-100 rounded-full p-3">
              <Check className="h-14 w-14 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Thank you for your order!</h1>
            <p className="text-gray-500">
              Your order has been received and is being processed. We will contact you shortly.
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">Order Number:</p>
              <Badge variant="secondary" className="text-sm font-semibold py-1">{orderData.transactionId}</Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-gray-500">Shipping Address</h3>
                    <div className="text-sm">
                      <p className="font-medium">{orderData.address}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {/* <h3 className="font-medium text-sm text-gray-500">Payment Method</h3>
                    <p className="text-sm">{data.}</p> */}

                    <h3 className="font-medium text-sm text-gray-500 mt-4">Order Date</h3>
                    <p className="text-sm">{dateToStringDate(orderData.createdAt)}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Items</h3>
                  <div className="space-y-3">
                    {orderData.products.map((item) => {
                      const product = item.product
                      return <div key={product._id} className="flex items-center gap-4">
                        <img
                          src={product.images[0]}
                          alt={item.name}
                          className="h-16 w-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">৳{item.price}</p>
                      </div>
                    })}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Subtotal</p>
                    <p className="text-sm">৳{orderData.totalPrice}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Shipping</p>
                    <p className="text-sm">---</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Tax</p>
                    <p className="text-sm">---</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <p className="font-medium">Total</p>
                    <p className="font-medium">৳{orderData.totalPrice}</p>
                  </div>
                </div>

                {/* <Alert className="bg-green-50 text-green-800 border-green-200">
                  <AlertTitle className="text-green-800">Your order status: {orderData.status}</AlertTitle>
                  <AlertDescription className="text-green-700">
                    We've sent a confirmation email to your registered email address.
                  </AlertDescription>
                </Alert> */}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3 pt-0">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handlePrintReceipt}
              >
                <Download className="mr-2 h-4 w-4" />
                Print Receipt
              </Button>

              {
                user && <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => navigate("/orders")}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View All Orders
                </Button>
              }

              <Button
                className="w-full sm:w-auto"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <div className="text-center text-sm text-gray-500">
            <p>Need help with your order? <Link to="/contact" className="text-primary underline">Contact our support team</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
}