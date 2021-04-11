import axios from "axios";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BasketRow, { Menu } from "../../src/components/Basket/BasketRow";
import { MY_BASKET_URL } from "../../src/constants";
import { RootState } from "../../src/rootReducer";
import {
  addOrdersForPayment,
  resetOrdersForPayment,
  removeOrderForPayment,
  OrderForPayment,
} from "../../src/features/payment/paymentSlice";

export default function Home(props) {
  const userState = useSelector((state: RootState) => state.userState);
  const [priceSum, setPriceSum] = useState(0);
  const [basketItems, setBasketItems] = useState(null);
  const [groupedItems, setGroupedItems] = useState(null);
  const ordersForPaymentState = useSelector(
    (state: RootState) => state.ordersForPaymentState
  );

  useEffect(() => {
    if (!userState.isAuthenticated) return;
    const data = axios
      .post(MY_BASKET_URL, { email: userState.email })
      .then((res) => {
        setBasketItems(res.data);
        return res.data;
      });
  }, [userState]);

  useEffect(() => {
    let sum = 0;
    ordersForPaymentState.orders.forEach((order) => {
      order.products.forEach((product) => {
        sum += product.productPrice * product.quentity;
      });
    });
    setPriceSum(sum);
  }, [ordersForPaymentState]);

  useEffect(() => {
    if (basketItems == null) return;
    // basket item 을 order id로 묶기.
    setGroupedItems(
      basketItems.map((v, index) => {
        const supplier = {
          supplierId: v.supplierId,
          supplierName: v.supplierName,
        };
        return (
          <BasketRow
            key={index}
            orderId={v.orderId}
            supplier={supplier}
            products={v.items}
          ></BasketRow>
        );
      })
    );
  }, [basketItems]);

  return (
    <div className="w-full mx-auto divide-y-2 space-y-4 divide-autumnT-300 bg-gray-50 flex flex-col items-center justify-items-center rounded-md">
      <div className="divide-y-2 divide-autumnT-300">{groupedItems}</div>
      <div className="h-32 flex justify-items-start">
        <span> 총 주문금액 </span> <span>: {priceSum} </span>
      </div>
      <Link href="/payment">
        <a className="mt-12 bg-blue-500 px-5 py-2 font-semibold tracking-wider text-white rounded-full hover:bg-blue-600">
          주문하기
        </a>
      </Link>
    </div>
  );
}
