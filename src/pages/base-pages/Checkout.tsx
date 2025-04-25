
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { ShoppingBag } from 'lucide-react';

import { useAppSelector } from '@/redux/hooks';
import {
  selectCurrentCartProducts
} from '@/redux/features/cart/cartSlice';



import CheckoutEditOrder from '@/components/modules/checkout/CheckoutEditOrder';
import { useMyDataQuery } from '@/redux/features/user/userApi';
import { useCurrentToken } from '@/redux/features/auth/authSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { useCheckoutMutation } from '@/redux/features/order/orderApi';
import CheckoutForm from '@/components/modules/checkout/CheckoutForm';




export default function Checkout() {

  const token = useAppSelector(useCurrentToken);
  const { data, isLoading } = useMyDataQuery(undefined, {
    skip: !token
  })
  const userData = data?.data
  const [, { isLoading: isCreateOrderLoading }] = useCheckoutMutation()
  const cartProducts = useAppSelector(selectCurrentCartProducts);
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
              <CheckoutForm userData={userData} />
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
        <CheckoutEditOrder isProcessing={isCreateOrderLoading} />
      </div>
    </section>
  );
}