import {
    TableCell,
    TableRow
} from "@/components/ui/table";
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
import { decreaseQuantity, increaseQuantity, removeProduct } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { CartProduct } from "@/types";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // Make sure Skeleton is imported!
import { config } from "@/config/config";

type PropsType = {
    product: CartProduct;
};
const backend_api = config.backend_api
export default function CartRow({ product }: PropsType) {
    const [isLoading, setIsLoading] = useState(false);
    const [productQuantity, setProductQuantity] = useState<null | number>(null);
    const dispatch = useAppDispatch();
    
    const handleIncrease = async () => {
        if (!productQuantity) {
            const productId = product._id;
            try {
                setIsLoading(true);
                const { data } = await axios.get(`${backend_api}/products/${productId}?fields=quantity,isDeleted`);
                const productData = data.data;
                if (!productData || productData.isDeleted || productData.quantity < 1) {
                    setIsLoading(false);
                    toast.error('Product is Not available');
                    return;
                }
                dispatch(increaseQuantity({ id: product._id, quantity: productData.quantity }));
                setProductQuantity(productData.quantity);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch product:', error);
                setIsLoading(false);
            }
        } else {
            dispatch(increaseQuantity({ id: product._id, quantity: productQuantity }));
        }
    };

    const handleDecrease = () => {
        dispatch(decreaseQuantity(product._id));
    };

    const handleRemove = () => {
        dispatch(removeProduct(product._id));
    };

    const skeleton = isLoading && <Skeleton className="absolute w-full h-full z-10 top-0" />

    return (
        <TableRow className="relative">
            <TableCell className="py-4">
                <div className="flex items-center space-x-4 relative">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "/api/placeholder/64/64";
                            }}
                        />
                    </div>
                    <div>
                        <h3 className="font-medium text-sm">{product.name}</h3>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>
                    {skeleton}
                </div>

            </TableCell>
            <TableCell><div className="relative">
                ৳{product.price}
                {skeleton}</div></TableCell>
            <TableCell>
                <div className="flex items-center space-x-2 relative">
                    {skeleton}
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleDecrease}
                        disabled={product.orderQuantity <= 1 || isLoading}
                    >
                        <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{product.orderQuantity}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleIncrease}
                        disabled={isLoading}
                    >
                        <PlusIcon className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
            <TableCell>
                <div className="relative">
                    {skeleton}
                    ৳{product.price * product.orderQuantity}
                </div>
            </TableCell>
            <TableCell>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            disabled={isLoading}
                        >
                            <Trash2Icon className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Remove product</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to remove <strong>{product.name}</strong> from your cart?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleRemove}>
                                Remove
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </TableCell>
        </TableRow>
    );
}
