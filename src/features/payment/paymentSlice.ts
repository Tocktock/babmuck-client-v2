import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface OrderForPayment {
  orderId: number;
  products: any;
  supplier: any;
}

// 이후에 map으로 관리할 수 있으면 더 좋을 듯.

interface CurrentOrdersForPayment {
  orders: OrderForPayment[];
}

let initialState: CurrentOrdersForPayment = {
  orders: [],
} as CurrentOrdersForPayment;

// immer will ensure mutable
const OrdersForPayment = createSlice({
  name: "ordersForPaymentState",
  initialState,
  reducers: {
    addOrdersForPayment(state, action: PayloadAction<OrderForPayment>) {
      //단순반복
      //이후 map 사용시 관리 수월
      for (let i = 0; i < state.orders.length; i++) {
        if (state.orders[i].orderId == action.payload.orderId) return;
      }
      state.orders.push(action.payload);
    },
    removeOrderForPayment(state, action: PayloadAction<number>) {
      state.orders = state.orders.filter((v) => v.orderId != action.payload);
    },
    resetOrdersForPayment(state) {
      state.orders = [];
    },
  },
});

export const {
  addOrdersForPayment,
  removeOrderForPayment,
  resetOrdersForPayment,
} = OrdersForPayment.actions;
export default OrdersForPayment.reducer;
