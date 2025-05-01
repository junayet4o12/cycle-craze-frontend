import { CartProduct } from "./cart.type";

export type WishlistProductType = Omit<CartProduct, 'orderQuantity' | 'price'> & { addedTime: string }