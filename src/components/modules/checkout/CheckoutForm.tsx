import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { selectCurrentCartProducts } from '@/redux/features/cart/cartSlice';
import { OrderDataType, TUserData } from '@/types';
import { useCheckoutMutation } from '@/redux/features/order/orderApi';
import { Banknote, CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkoutFormSchema } from '@/schemas/checkout-form-schema';
import { toast } from 'sonner';
import { errorMessageGenerator } from '@/utils/errorMessageGenerator';
type FormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutForm({ userData }: { userData: TUserData | undefined }) {
    const [checkout, { isLoading: isCheckoutLoading }] = useCheckoutMutation()
    const cartProducts = useAppSelector(selectCurrentCartProducts);
    const form = useForm<FormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            name: '',
            contact: '',
            address: ''
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
            paymentMethod: data.paymentMethod
        };
        if (userData?.email) {
            orderData.email = userData?.email
        }

        const toastId = toast.loading('Checkout is on processing...')
        try {

            const result = await checkout(orderData).unwrap()    
            if (orderData.paymentMethod === 'Cash On Delivery') {
                const id = result.data._id
                window.location.replace(`/checkout/COD/success/${id}`)
            } else {
                window.location.replace(result.data)
            }
           
        } catch (error) {

            toast.error(errorMessageGenerator(error), { id: toastId })
        }
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
                <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Payment Method</FormLabel>
                            <FormControl>
                                <div className='grid grid-cols-2 gap-2'>
                                    <Button
                                        type='button'
                                        variant={field.value === "Cash On Delivery" ? "default" : "outline"}
                                        onClick={() => field.onChange('Cash On Delivery')}
                                    >
                                        <Banknote className="h-5 w-5" />
                                        Cash On Delivery
                                    </Button>
                                    <Button
                                        type='button'
                                        variant={field.value === "Online Payment" ? "default" : "outline"}
                                        onClick={() => field.onChange('Online Payment')}
                                    >
                                        <CreditCard className="h-5 w-5" />
                                        Online Payment
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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