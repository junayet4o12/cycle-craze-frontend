import { Separator } from '@/components/ui/separator';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    selectCurrentCartProducts,
    increaseQuantity,
    decreaseQuantity,
    removeProduct
} from '@/redux/features/cart/cartSlice';
import { useState } from 'react';
export default function CheckoutEditOrder({ isProcessing }: { isProcessing: boolean }) {
    const cartProducts = useAppSelector(selectCurrentCartProducts);
    const [productToRemove, setProductToRemove] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    // Quantity handlers
    const handleIncrease = (id: string) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id: string) => {
        dispatch(decreaseQuantity(id));
    };

    const handleRemove = (id: string) => {
        dispatch(removeProduct(id));
        setProductToRemove(null);
    };
    const totalPayment = cartProducts.reduce(
        (total, product) => total + product.price * product.orderQuantity,
        0
    );
    return (
        <Card className="md:col-span-3">
            <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
                <CardDescription>
                    {cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'} in your cart
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="max-h-60 overflow-y-auto space-y-4">
                    {cartProducts.map(product => (
                        <div key={product._id} className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 bg-gray-100 rounded overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "/api/placeholder/56/56";
                                        }}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{product.name}</p>
                                    <p className="text-xs text-gray-500">৳{product.price.toFixed(2)} each</p>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center space-x-1">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => handleDecrease(product._id)}
                                                disabled={product.orderQuantity <= 1 || isProcessing}
                                            >
                                                <MinusIcon className="h-3 w-3" />
                                            </Button>
                                            <span className="w-6 text-center text-sm">{product.orderQuantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => handleIncrease(product._id)}
                                                disabled={isProcessing}
                                            >
                                                <PlusIcon className="h-3 w-3" />
                                            </Button>
                                        </div>

                                        {/* Only show remove button if there's more than one product in cart */}
                                        {cartProducts.length > 1 && (
                                            <AlertDialog open={productToRemove === product._id} onOpenChange={(open) => !open && setProductToRemove(null)}>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6 text-gray-400 hover:text-red-500"
                                                        disabled={isProcessing}
                                                        onClick={() => setProductToRemove(product._id)}
                                                    >
                                                        <Trash2Icon className="h-3 w-3" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Remove product</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to remove {product.name} from your cart?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleRemove(product._id)}>
                                                            Remove
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        )}
                                    </div>
                                </div>
                                <p className="font-medium text-sm">
                                ৳{(product.price * product.orderQuantity)}
                                </p>
                            </div>
                            <Separator />
                        </div>
                    ))}
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>৳{totalPayment}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>Calculated at next step</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>Calculated at next step</span>
                    </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>৳{totalPayment}</span>
                </div>
            </CardContent>
        </Card>
    );
}