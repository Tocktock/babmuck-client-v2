import Link from "next/link";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/rootReducer";
import BillingCard from "../../../src/components/Card/BillingCard";

const GET_MY_BILLINGS_URL = "http://localhost:8080/billing/mybilling";

export default function pendingPayment(props) {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.userState);
  const [billingList, setBillingList] = useState(null);
  const [pendingList, setPendingList] = useState(null);

  const [cancleList, setCancleList] = useState(null);
  useEffect(() => {
    if (!userState.isAuthenticated) return;
    const result = axios
      .post(GET_MY_BILLINGS_URL, {
        email: userState.email,
      })
      .then((res) => {
        console.log(res.data);
        setBillingList(res.data);
      });
  }, [userState]);

  useEffect(() => {
    if (billingList == null) return;
  }, [billingList]);

  return (
    <div className="w-full h-screen overflow-auto mx-auto divide-y-2 space-y-4 divide-autumnT-300 bg-gray-50 flex flex-col items-center justify-items-center rounded-md">
      {billingList &&
        billingList.map((v, k) => {
          return (
            <BillingCard
              createAt={v.createAt}
              paymentMethod={v.paymentMethod}
              price={v.billingPrice}
              orderDetail={v.orderDetails}
            ></BillingCard>
          );
        })}
    </div>
  );
}
