import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet";
import {
    selectCurrentCartProducts,
    increaseQuantity,
    decreaseQuantity,
    removeProduct,
    clearCart
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ShoppingCart, MinusIcon, PlusIcon, Trash2Icon, ShoppingBagIcon } from "lucide-react";
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
import { Link } from "react-router-dom";

export default function MyCartBtn() {
    const dispatch = useAppDispatch();
    const cartProducts = useAppSelector(selectCurrentCartProducts);

    const totalPrice = cartProducts.reduce(
        (total, product) => total + product.price * product.orderQuantity,
        0
    );

    const handleIncrease = (id: string) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id: string) => {
        dispatch(decreaseQuantity(id));
    };

    const handleRemove = (id: string) => {
        dispatch(removeProduct(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="relative" variant="ghost" size="icon" aria-label="Cart">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
                        {cartProducts.length}
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col px-4 py-8">
                <SheetHeader className="border-b pb-4 px-0">
                    <SheetTitle className="flex items-center justify-between">
                        <h5 className="font-semibold text-2xl">Your Cart ({cartProducts.length})</h5>
                        {cartProducts.length > 0 && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                        <Trash2Icon className="mr-2 h-4 w-4" />
                                        Clear Cart
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Clear cart</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will remove all items from your cart. This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleClearCart}>
                                            Clear
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto">
                    {cartProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-8 space-y-4 text-center">
                            <ShoppingBagIcon className="w-12 h-12 text-gray-400" />
                            <h3 className="text-lg font-medium">Your cart is empty</h3>
                            <p className="text-sm text-gray-500">Add some products to your cart to see them here.</p>
                            <SheetClose asChild>
                                <Button variant="outline">Continue Shopping</Button>
                            </SheetClose>
                        </div>
                    ) : (
                        <ul className="divide-y">
                            {cartProducts.map((product) => (
                                <li key={product._id} className="py-4">
                                    <div className="flex items-start gap-4">
                                        <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/api/placeholder/64/64";
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium truncate">{product.name}</h4>
                                            <p className="text-xs text-gray-500">{product.brand}</p>
                                            <div className="mt-1 flex items-center justify-between">
                                                <p className="text-sm font-medium">৳{product.price}</p>
                                                <div className="flex items-center space-x-1">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => handleDecrease(product._id)}
                                                        disabled={product.orderQuantity <= 1}
                                                    >
                                                        <MinusIcon className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-6 text-center text-sm">{product.orderQuantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => handleIncrease(product._id)}
                                                    >
                                                        <PlusIcon className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-gray-400 hover:text-red-500"
                                            onClick={() => handleRemove(product._id)}
                                        >
                                            <Trash2Icon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartProducts.length > 0 && (
                    <SheetFooter className="border-t pt-4 mt-auto px-0">
                        <div className="w-full space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Subtotal</span>
                                <span className="text-sm font-medium">৳{totalPrice}</span>
                            </div>
                            <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout</p>
                            <SheetClose asChild>
                                <Button className="w-full">
                                    Checkout
                                </Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button variant="outline" className="w-full">
                                    Continue Shopping
                                </Button>
                            </SheetClose>

                           <div className="text-center">
                                <SheetClose asChild>
                                    <Link className="underline hover:text-primary" to="/cart">View Cart</Link>
                                </SheetClose>
                           </div>

                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}