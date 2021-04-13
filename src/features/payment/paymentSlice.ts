import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface OrderForPayment {
  orderId: number;
  products: any;
  supplier: any;
}

export interface changeSelectedOrderInBasket {
  orderId: number;
  quentity: number;
}

// 이후에 map으로 관리할 수 있으면 더 좋을 듯.

interface CurrentOrdersForPayment {
  orders: OrderForPayment[];
  billId?: number;
}

let initialState: CurrentOrdersForPayment = {
  orders: [],
  billId: null,
} as CurrentOrdersForPayment;

// immer will ensure mutable
const OrdersForPayment = createSlice({
  name: "ordersForPaymentState",
  initialState,
  reducers: {
    setBillingId(state, action: PayloadAction<number>) {
      state.billId = action.payload;
    },
    addOrdersForPayment(state, action: PayloadAction<OrderForPayment>) {
      //이후 map 사용시 관리 수월

      for (let i = 0; i < state.orders.length; i++) {
        if (state.orders[i].orderId == action.payload.orderId) return;
      }
      state.orders.push(action.payload);
    },
    changeSelectedOrderInBasket(state, action: PayloadAction<number>) {
      state.orders = state.orders.filter((v) => v.orderId != action.payload);
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
  changeSelectedOrderInBasket,
  setBillingId,
  addOrdersForPayment,
  removeOrderForPayment,
  resetOrdersForPayment,
} = OrdersForPayment.actions;
export default OrdersForPayment.reducer;
