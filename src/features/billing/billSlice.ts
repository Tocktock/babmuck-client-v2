import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentbillState {
  orders: any;
  billing: any;
}

let initialState: CurrentbillState = {
  orders: null,
  billing: null,
} as CurrentbillState;

// immer will ensure mutable
const billingSlice = createSlice({
  name: "billingState",
  initialState,
  reducers: {
    setBilling(state, action: PayloadAction<CurrentbillState>) {
      state = action.payload;
    },
    resetBilling(state) {
      state.orders = null;
      state.billing = null;
    },
  },
});

export const { setBilling, resetBilling } = billingSlice.actions;
export default billingSlice.reducer;
