import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 0,
  base: {
    id: "",
    name: "",
  },
  sauce: {
    id: "",
    name: "",
  },
  cheese: {
    id: "",
    name: "",
  },
  veggies: {
    id: "",
    name: "",
  },
  nonVeg: {
    id: "",
    name: "",
  },
};
type OrderPizza = typeof initialState;

export const orderSlice = createSlice({
  name: "OrderPizza",
  initialState,
  reducers: {
    addOrderState: (state: OrderPizza, action: PayloadAction<OrderPizza>) => {
      return { ...state, ...action.payload };
    },
    removeOrderState: () => {
      return initialState;
    },
  },
});

export const { addOrderState, removeOrderState } = orderSlice.actions;
export default orderSlice.reducer;
