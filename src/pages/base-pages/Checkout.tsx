import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, CreditCard, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { useAppSelector } from '@/redux/hooks';
import {
  selectCurrentCartProducts
} from '@/redux/features/cart/cartSlice';

import { useEffect, useState } from 'react';
import { errorMessageGenerator } from '@/utils/errorMessageGenerator';
import CheckoutEditOrder from '@/components/modules/checkout/CheckoutEditOrder';
import { useMyDataQuery } from '@/redux/features/user/userApi';
import { useCurrentToken } from '@/redux/features/auth/authSlice';
import { Skeleton } from '@/components/ui/skeleton';


// Define the form schema with zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional(),
  contact: z.string().min(10, { message: "Contact number must be at least 10 characters" }),
  address: z.string().min(10, { message: "Address must be at least 10 characters" }),
});

// Create a type from the schema
type FormValues = z.infer<typeof formSchema>;

export default function Checkout() {
  const token = useAppSelector(useCurrentToken);
  const { data, isLoading } = useMyDataQuery(undefined, {
    skip: !token
  })
  const cartProducts = useAppSelector(selectCurrentCartProducts);
  const [isProcessing, setIsProcessing] = useState(false);



  // Calculate total payment
  const totalPayment = cartProducts.reduce(
    (total, product) => total + product.price * product.orderQuantity,
    0
  );

  // Initialize form with TypeScript types
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      contact: '',
      address: '',
    },
  });

  // ✅ Reset form when user data is loaded
  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name || '',
        email: data.data.email || '',
        contact: data.data.contactNumber || '',
        address: data.data.address || '',
      });
    }
  }, [data, form]);

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading('Processing order...');
    setIsProcessing(true);

    try {
      // Map cart products to ordered products format
      const orderedProducts = cartProducts.map(product => ({
        product: product._id, // Assuming _id is a string that can be converted to ObjectId
        quantity: product.orderQuantity,
        name: product.name
      }));

      // Create order object
      const orderData = {
        products: orderedProducts,
        payment: totalPayment,
        address: data.address,
        name: data.name,
        email: data.email,
        contact: data.contact,
      };

      // Log the order data (as requested)
      console.log('Order Data:', orderData);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success('Order placed successfully!', { id: toastId, duration: 2000 });
      // Here you would normally redirect to a confirmation page
    } catch (err) {
      toast.error(errorMessageGenerator(err), { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartProducts.length === 0) {
    return (
      <div className="py-12 px-4 max-w-4xl mx-auto text-center">
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <ShoppingBag className="w-16 h-16 text-gray-400" />
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-gray-500">Add some products to your cart before proceeding to checkout.</p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Return to Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-5 gap-6">


        {isLoading ? (
          <Card className="md:col-span-2 space-y-4 p-6">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <div className="space-y-4 mt-4">
              <Skeleton className="h-10 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full mt-6" />
            </div>
          </Card>
        ) : (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Shipping Information</CardTitle>
              <CardDescription>
                Please enter your shipping details
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                            disabled={isProcessing}
                            className="bg-gray-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              type="email"
                              disabled={isProcessing}
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
                              disabled={isProcessing}
                              className="bg-gray-50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shipping Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="123 Main St, Apt 4B, City, State, ZIP"
                            disabled={isProcessing}
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
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
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
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 border-t pt-6">
              <div className="flex items-center justify-center text-xs text-muted-foreground">
                <span>Secure checkout</span>
                <span className="mx-2">•</span>
                <span>Privacy protected</span>
                <span className="mx-2">•</span>
                <span>Terms apply</span>
              </div>
            </CardFooter>
          </Card>
        )}
        <CheckoutEditOrder isProcessing={isProcessing} />
      </div>
    </section>
  );
}