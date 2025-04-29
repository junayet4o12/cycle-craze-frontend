import { Check, ChevronRight, Download, ShoppingBag } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { IOrder } from "@/types";
import { dateToStringDate } from "@/utils/dateToStringDate";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function OS_OrderDetails({ orderData }: { orderData: IOrder }) {
    const user = useAppSelector(selectCurrentUser)
    const navigate = useNavigate();
    const handlePrintReceipt = () => {
        window.print();
    };
    return (
        <section className="space-y-8 py-8">
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
                    <Badge variant="secondary" className="text-sm font-semibold py-1">{orderData._id}</Badge>
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
                                <p className="text-sm">৳{orderData.deliveryCharge}</p>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                                <p className="font-medium">Total</p>
                                <p className="font-medium">৳{orderData.totalPrice + orderData.deliveryCharge}</p>
                            </div>
                        </div>
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
        </section>
    );
}