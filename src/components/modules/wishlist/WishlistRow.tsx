import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { removeFromWishList } from "@/redux/features/wishlist/wishlistSlice";
import { useAppDispatch } from "@/redux/hooks";
import { WishlistProductType } from "@/types";
import { SquareChartGantt, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

type PropsType = {
    product: WishlistProductType;
    checkedProducts: WishlistProductType[];
    setCheckedProducts: Dispatch<SetStateAction<WishlistProductType[]>>
}
export default function WishlistRow({ product, checkedProducts, setCheckedProducts }: PropsType) {
    const dispatch = useAppDispatch()
    const isChecked = checkedProducts.find(item => item._id === product._id)?._id ? true : false
    const handleCheckedChange = () => {
        if (isChecked) {
            const newCheckedProducts = checkedProducts.filter(item => item._id !== product._id);
            setCheckedProducts(newCheckedProducts)
        } else {
            const newCheckedProducts = [...checkedProducts, product];
            setCheckedProducts(newCheckedProducts)
        }
    }
    const handleRemoveFromWishlist = () => {
        dispatch(removeFromWishList(product._id))
    }
    return (
        <TableRow className="relative">
            <TableCell >
                <div className="flex justify-center items-center"> <Checkbox checked={isChecked} onCheckedChange={handleCheckedChange} /></div>
            </TableCell>
            <TableCell>
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
                </div>
            </TableCell>
            <TableCell>
                {new Date(product.addedTime).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </TableCell>
            <TableCell>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={handleRemoveFromWishlist} variant={"ghost"} size={"icon"}><X /></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs">Remove from wishlist</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to={`/product-details/${product._id}`}> <Button variant={"outline"} size={"icon"}><SquareChartGantt /></Button></Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs">Details</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>


            </TableCell>
        </TableRow>
    );
}