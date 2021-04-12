import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Basket {
  orderId: number;
  products: any;
  supplier: any;
}
interface ChangeBasket {
  orderId: number;
  productId: number; //id, quentity, name,price 필요.
  productQuentity: number;
}

interface CurrentBasketState {
  basket: Basket[];
}

let initialState: CurrentBasketState = {
  basket: [],
} as CurrentBasketState;

// immer will ensure mutable
const BasketSlice = createSlice({
  name: "orderState",
  initialState,
  reducers: {
    setBasket(state, action: PayloadAction<Basket[]>) {
      state.basket = action.payload;
    },
    changeBasket(state, action: PayloadAction<ChangeBasket>) {
      state.basket.forEach((v, i) => {
        if (v.orderId == action.payload.orderId) {
          v.products.forEach((product) => {
            if (product.productId == action.payload.productId) {
              product.quentity = action.payload.productQuentity;
            }
          });
        }
      });
      console.log(state.basket);
    },
    resetBasket(state) {
      state.basket = [];
    },
  },
});

export const { setBasket, changeBasket, resetBasket } = BasketSlice.actions;
export default BasketSlice.reducer;
