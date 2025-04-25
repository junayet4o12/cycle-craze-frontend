import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {  useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { selectCurrentCartProducts } from '@/redux/features/cart/cartSlice';
import { OrderDataType, TUserData } from '@/types';
import { useCheckoutMutation} from '@/redux/features/order/orderApi';
import { CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkoutFormSchema } from '@/schemas/checkout-form-schema';
type FormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutForm({ userData }: { userData: TUserData | undefined }) {
    const [checkout, { isLoading: isCheckoutLoading }] = useCheckoutMutation()
    const cartProducts = useAppSelector(selectCurrentCartProducts);
    const form = useForm<FormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            name: '',
            contact: '',
            address: '',
        },
    });

    useEffect(() => {
        if (userData) {
            form.reset({
                name: userData.name || '',
                contact: userData.contactNumber || '',
                address: userData.address || '',
            });
        }
    }, [userData, form]);
    const totalPayment = cartProducts.reduce(
        (total, product) => total + product.price * product.orderQuantity,
        0
    );
    const onSubmit = async (data: FormValues) => {
        const orderedProducts = cartProducts.map(product => ({
            product: product._id,
            quantity: product.orderQuantity,
            name: product.name
        }));

        // Create order object
        const orderData: OrderDataType = {
            products: orderedProducts,
            payment: totalPayment,
            address: data.address,
            name: data.name,
            contact: data.contact,
        };
        if (userData?.email) {
            orderData.email = userData?.email
        }


        const result = await checkout(orderData).unwrap()
        window.location.replace(result.data)
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="John Doe"
                                    disabled={isCheckoutLoading}
                                    className="bg-gray-50"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="+1 (555) 123-4567"
                                    disabled={isCheckoutLoading}
                                    className="bg-gray-50"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Shipping Address</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="123 Main St, Apt 4B, City, State, ZIP"
                                    disabled={isCheckoutLoading}
                                    className="bg-gray-50 min-h-24"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="mt-6 pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                    <div className="flex items-center space-x-2 p-3 border rounded-md bg-gray-50">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span>Cash on Delivery</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        You'll pay when your order is delivered
                    </p>
                </div>

                <Button
                    type="submit"
                    className="w-full mt-6"
                    disabled={isCheckoutLoading}
                >
                    {isCheckoutLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        "Place Order"
                    )}
                </Button>
            </form>
        </Form>
    );
}