import { Order } from "@/src/models/Order";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [] as Order[],
    currentOrder: null as Order | null,
  },
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    addOrders: (state, action: PayloadAction<Order[]>) => {
      action.payload.forEach((product) => {
        state.orders.push(product);
      });
    },
    deleteOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      state.orders = state.orders.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    updateCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = { ...state.currentOrder, ...action.payload };
    },
  },
});

export const {
  addOrder,
  addOrders,
  deleteOrder,
  setOrders,
  updateOrder,
  setCurrentOrder,
  updateCurrentOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
