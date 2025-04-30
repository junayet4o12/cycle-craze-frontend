// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "sonner";

// type TWishlistState = {
//     products: string[];
// }
// const initialState: TWishlistState = {
//     products: []
// }

// const wishlistSlice = createSlice({
//     name: 'wishList',
//     initialState,
//     reducers: {
//         addToWishList: (state, action: PayloadAction<string>) => {
//             const isExist = state.products.find(item => item === action.payload);
//             if (isExist) {
//                 toast.message('Already added to wishlist!')
//             } else {
//                 state.products.push(action.payload)
//             }
//         }
//     }
// })