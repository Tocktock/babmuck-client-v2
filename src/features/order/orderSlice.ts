import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentOrderState {
  orderIds: number[];
}

let initialState: CurrentOrderState = {
  orderIds: null,
} as CurrentOrderState;

// immer will ensure mutable
const OrderSlice = createSlice({
  name: "orderState",
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<number[]>) {
      state.orderIds = action.payload;
    },
    resetOrder(state) {
      state.orderIds = [];
    },
  },
});

export const { setOrder, resetOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
