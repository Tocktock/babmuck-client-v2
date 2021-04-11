import { combineReducers } from "redux";
import userStateReducer from "./features/user/userSlice";
import alarmStateReducer from "./features/alarm/alarmSlice";
import modalStateReducer from "./features/modal/modalSlice";
import orderForPaymentStateReducer from "./features/payment/paymentSlice";
const rootReducer = combineReducers({
  userState: userStateReducer,
  alarmState: alarmStateReducer,
  modalState: modalStateReducer,
  ordersForPaymentState: orderForPaymentStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
