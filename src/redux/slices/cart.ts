import { Cart } from "@/src/models/Cart";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [] as Cart[],
    selectedCart: [] as Cart[],
  },
  reducers: {
    setCartItems: (state, action: PayloadAction<Cart[]>) => {
      state.cartItems = action.payload;
    },
    addCartItem: (state, action: PayloadAction<Cart>) => {
      state.cartItems.push(action.payload);
    },
    addCartItems: (state, action: PayloadAction<Cart[]>) => {
      action.payload.forEach((cartItem) => {
        state.cartItems.push(cartItem);
      });
    },
    deleteCartItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((f) => f.id !== action.payload);
    },
    updateCartItem: (state, action: PayloadAction<Cart>) => {
      state.cartItems = state.cartItems.map((cartItem) =>
        cartItem.id === action.payload.id ? action.payload : cartItem
      );
    },

    setSelectedCart: (state, action: PayloadAction<Cart[]>) => {
      state.selectedCart = action.payload;
    },
    addSelectedCart: (state, action: PayloadAction<Cart>) => {
      state.selectedCart.push(action.payload);
    },
    removeSelectedCart: (state, action: PayloadAction<number>) => {
      state.selectedCart = state.selectedCart.filter(
        (cart) => cart.id !== action.payload
      );
    },
    updateSelectedCart: (state, action: PayloadAction<Cart>) => {
      state.selectedCart = state.selectedCart.map((cart) =>
        cart.id === action.payload.id ? action.payload : cart
      );
    },
  },
});

export const {
  setCartItems,
  addCartItem,
  addCartItems,
  deleteCartItem,
  updateCartItem,
  setSelectedCart,
  addSelectedCart,
  removeSelectedCart,
  updateSelectedCart,
} = cartSlice.actions;
export default cartSlice.reducer;
