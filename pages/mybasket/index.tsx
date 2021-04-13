import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BasketRow from "../../src/components/Basket/BasketRow";
import { MY_BASKET_URL } from "../../src/constants";
import { RootState } from "../../src/rootReducer";
import { resetOrdersForPayment } from "../../src/features/payment/paymentSlice";
import { resetBasket, setBasket } from "../../src/features/basket/basketSlice";

export default function Home(props) {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.userState);
  const basketState = useSelector((state: RootState) => state.basketState);
  const [priceSum, setPriceSum] = useState(0);
  const ordersForPaymentState = useSelector(
    (state: RootState) => state.ordersForPaymentState
  );

  useEffect(() => {
    if (!userState.isAuthenticated) return;
    const data = axios
      .post(MY_BASKET_URL, { email: userState.email })
      .then((res) => {
        // setBasketItems(res.data);
        const baskets = res.data.map((v) => {
          return {
            orderId: v.orderId,
            products: v.items,
            supplier: {
              supplierId: v.supplierId,
              supplierName: v.supplierName,
            },
          };
        });
        dispatch(setBasket(baskets));
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
    dispatch(resetBasket());
    dispatch(resetOrdersForPayment());
  }, []);

  return (
    <div className="w-full mx-auto divide-y-2 space-y-4 divide-autumnT-300 bg-gray-50 flex flex-col items-center justify-items-center rounded-md">
      <div className="divide-y-2 divide-autumnT-300 w-1/3">
        {basketState.basket.map((v, k) => {
          return (
            <BasketRow
              key={k}
              orderId={v.orderId}
              supplier={v.supplier}
              products={v.products}
            ></BasketRow>
          );
        })}
      </div>
      <div className="h-8 py-2 flex justify-items-start text-gray-800 text-xl font-semibold">
        <span className="block">총 주문금액</span>
        <span className="block w-32">: {priceSum} </span>
      </div>
      <Link href="/payment">
        <a className="mt-2 bg-blue-500 px-5 py-2 font-semibold tracking-wider text-white rounded-full hover:bg-blue-600">
          주문하기
        </a>
      </Link>
    </div>
  );
}
