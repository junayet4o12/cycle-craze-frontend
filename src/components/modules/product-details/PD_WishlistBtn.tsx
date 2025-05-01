import { Button } from "@/components/ui/button";
import { addToWishList, selectCurrentWishlistProducts } from "@/redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { WishlistProductType } from "@/types";
import { Heart } from "lucide-react";


export default function PD_WishlistBtn({ data }: { data: Omit<WishlistProductType, 'addedTime'> }) {
    const dispatch = useAppDispatch();
    const wishlistProduct = useAppSelector(selectCurrentWishlistProducts);
    const isInWIshlist = wishlistProduct.find(item => item._id === data._id)
    const handleAddToWishList = () => {
        dispatch(addToWishList(data))
    }
    return (
        <Button onClick={handleAddToWishList} variant="ghost" size="sm" className="flex items-center gap-2">
            {
                isInWIshlist ? <Heart className="fill-red-500 text-red-500" size={18} /> : <Heart size={18} />
            }

            <span>Wishlist</span>
        </Button>
    );
}