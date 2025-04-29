import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { config } from "@/config/config";
import { decreaseQuantity, increaseQuantity, removeProduct } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { CartProduct } from "@/types";
import axios from "axios";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type PropsType = {
    product: CartProduct
}
const backend_api = config.backend_api
export default function MCB_SingleProduct({ product }: PropsType) {
    const [isLoading, setIsLoading] = useState(false)
    const [productQuantity, setProductQuantity] = useState<null | number>(null)
    const dispatch = useAppDispatch();
    const handleIncrease = async () => {
        if (!productQuantity) {
            const productId = product._id
            try {
                setIsLoading(true)
                const { data } = await axios.get(`${backend_api}/products/${productId}?fields=quantity,isDeleted`);
                const productData = data.data
                if (!productData || productData.isDeleted || productData.quantity < 1) {
                    setIsLoading(false)
                    toast.error('Product is Not available')
                    return;
                }
                dispatch(increaseQuantity({ id: product._id, quantity: productData.quantity }));
                setProductQuantity(productData.quantity)
                setIsLoading(false)
            } catch (error) {
                console.error('Failed to fetch product:', error);
                setIsLoading(false)
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
    return (
        <li className="py-4 relative">
            {
                isLoading && <Skeleton className="absolute w-full h-full z-10" />
            }
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
                                onClick={handleDecrease}
                                disabled={product.orderQuantity <= 1}
                            >
                                <MinusIcon className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm">{product.orderQuantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={handleIncrease}
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
                    onClick={handleRemove}
                >
                    <Trash2Icon className="h-4 w-4" />
                </Button>
            </div>
        </li>
    );
}