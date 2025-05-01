import { RootState } from "@/redux/store";
import { WishlistProductType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";


type TWishlistState = {
    products: WishlistProductType[];
}
const initialState: TWishlistState = {
    products: []
}

const wishlistSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        addToWishList: (state, action: PayloadAction<Omit<WishlistProductType, 'addedTime'>>) => {
            const product = action.payload;
            const existing = state.products.find(item => item?._id === product._id);
            if (existing) {
                toast.message('Already added to wishlist!')
            } else {
                state.products.push({...product, addedTime: new Date().toISOString()})
                toast.success('Added to wishlist!')
            }
        },
        removeFromWishList: (state, action: PayloadAction<string>) => {
            const newProducts = state.products.filter(item => item._id !== action.payload);
            state.products = newProducts
            toast.message('Product has removed from wishlist.')
        },
        clearWishlist: (state) => {
            state.products = []
            toast.message('Wishlist has cleared!')
        }

    }
})

export const selectCurrentWishlistProducts = (state: RootState) => state.wishlist.products;

export const { addToWishList, removeFromWishList, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer