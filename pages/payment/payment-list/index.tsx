import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/rootReducer";

const GET_MY_BILLINGS_URL = "http://localhost:8080/billing/mybilling";

export default function pendingPayment(props) {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.userState);
  const [billingList, setBillingList] = useState(null);
  useEffect(() => {
    if (!userState.isAuthenticated) return;
    const result = axios
      .post(GET_MY_BILLINGS_URL, {
        email: userState.email,
      })
      .then((res) => {
        setBillingList(res.data);
      });
  }, [userState]);

  return (
    <div className="w-full mx-auto divide-y-2 space-y-4 divide-autumnT-300 bg-gray-50 flex flex-col items-center justify-items-center rounded-md">
      {billingList &&
        billingList.map((v, k) => {
          return (
            <div className="w-full">
              <div>결제 날짜 : {v.createAt.substr(0, 10)}</div>
              <div>결제 방법 : {v.paymentMethod}</div>
              <div>얼마에요? : {v.price}</div>
            </div>
          );
        })}
    </div>
  );
}
