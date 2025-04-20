import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { CartProduct } from "@/types";

type TCartState = {
  products: CartProduct[]
};

const initialState: TCartState = {
  products: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartProduct>) => {
      const product = action.payload;
      console.log(product, state);

      const existing = state.products.find(item => item?._id === product._id);
      if (existing) {
        existing.orderQuantity += product.orderQuantity;
      } else {
        state.products.push(product);
      }
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.products.find(product => product._id === id);
      if (item) {
        item.orderQuantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.products.find(product => product._id === id);
      if (item && item.orderQuantity > 1) {
        item.orderQuantity -= 1;
      }
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.products = state.products.filter(item => item._id !== id)
    },

    clearCart: (state) => {
      state.products = []
    },
  },
});

export const selectCurrentCartProducts = (state: RootState) => state.cart.products;

export const {
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
