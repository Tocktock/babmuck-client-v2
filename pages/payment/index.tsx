import Link from "next/link";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../src/rootReducer";
import OrderRow from "../../src/components/Order/OrderRow";
import { resetOrdersForPayment } from "../../src/features/payment/paymentSlice";
import {
  MessageType,
  setAlarmAndShow,
} from "../../src/features/alarm/alarmSlice";
import { useRouter } from "next/router";

const hashSelector = new Map();
const BILLING_REQ_URL = "http://localhost:8080/billing/complete";
const PENDING_REQ_URL = "http://localhost:8080/billing/pending/add";

export default function supplierDetail(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const ordersForPaymentState = useSelector(
    (state: RootState) => state.ordersForPaymentState
  );

  const userState = useSelector((state: RootState) => state.userState);

  const [priceSum, setPriceSum] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("-1");
  const [paymentNow, setPaymentNow] = useState(true);
  const paymentMethodRef = useRef(null);

  const selectedColor =
    " bg-blue-100 text-blue-600 hover:bg-blue-200 focus:ring-blue-500";

  const notSelectedColor =
    " bg-red-100 text-red-600 hover:bg-red-200 focus:ring-red-500";

  const handlePaymentMethod = (e) => {
    const method = e.target.options[e.target.selectedIndex].value;
    if (method == -1) return;
    setPaymentMethod(method);
  };

  const billingReq = async () => {
    if (paymentNow == true && paymentMethod == "-1") {
      dispatch(
        setAlarmAndShow({
          message: "결제 방법을 선택해주세요",
          type: MessageType.warning,
        })
      );
      return;
    }
    console.log(ordersForPaymentState.orders);
    let orderResult = false;
    if (paymentNow === true) {
      const result = await axios.post(BILLING_REQ_URL, {
        orderIds: ordersForPaymentState.orders.map((order) => order.orderId),
        email: userState.email,
        paymentMethod: paymentMethod,
      });
      orderResult = OrderResultHandler(result);
    } else {
      const result = await axios.post(PENDING_REQ_URL, {
        email: userState.email,
        orderIds: ordersForPaymentState.orders.map((order) => order.orderId),
      });
      orderResult = OrderResultHandler(result);
    }
    if (orderResult === true) {
      dispatch(resetOrdersForPayment());
      router.push("/");
    }
  };

  const OrderResultHandler = (result) => {
    if (result.data) {
      dispatch(
        setAlarmAndShow({
          message: "주문이 완료되었습니다.",
          type: MessageType.success,
        })
      );
      return true;
    } else {
      dispatch(
        setAlarmAndShow({
          message: `주문이 정상적으로 완료되지 못했습니다.`,
          type: MessageType.failed,
        })
      );
      return false;
    }
  };

  useEffect(() => {
    if (!ordersForPaymentState) return;

    let sum = 0;
    ordersForPaymentState.orders.forEach((order) => {
      order.products.forEach((product) => {
        sum += product.quentity * product.productPrice;
      });
    });
    setPriceSum(sum);
  }, [ordersForPaymentState]);
  return (
    <div className="w-full mx-auto divide-y-2 space-y-4 divide-autumnT-300 bg-gray-50 flex flex-col items-center justify-items-center rounded-md">
      <div className="w-full py-6 pl-6 text-xl">결제하기</div>
      <div className="w-full py-6 pl-6">
        <div className="w-full text-xl"> 주문 리스트 </div>
        <div className="w-1/3">
          {ordersForPaymentState.orders.length > 0 &&
            ordersForPaymentState.orders.map((order, key) => (
              <OrderRow
                key={key}
                orderId={order.orderId}
                products={order.products}
                supplier={order.supplier}
              />
            ))}
        </div>
        <div className="h-8 py-2 flex justify-items-start text-gray-800 text-xl font-semibold">
          <span className="block">총 주문금액</span>
          <span className="block w-32"> : {priceSum} </span>
        </div>
      </div>
      <div className="w-full py-6 pl-6">
        <div className="text-xl"> 결제 시기</div>
        <hr></hr>
        <div className="w-full mt-4">
          <button
            onClick={() => setPaymentNow(true)}
            className={`px-6 py-3 mr-4 text-xs font-semibold tracking-wider rounded  focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              paymentNow ? selectedColor : notSelectedColor
            }`}
          >
            지금결제
          </button>
          <button
            onClick={() => setPaymentNow(false)}
            className={`px-6 py-3 text-xs font-semibold tracking-wider rounded focus:outline-none focus:ring-2 focus:ring-offset-2 +
              ${paymentNow ? notSelectedColor : selectedColor}`}
          >
            나중에결제
          </button>
        </div>
        <div className="relative inline-flex mt-5">
          <svg
            className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 412 232"
          >
            <path
              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
              fill="#648299"
              fillRule="nonzero"
            />
          </svg>
          <select
            ref={paymentMethodRef}
            onChange={handlePaymentMethod}
            className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
          >
            <option value="-1">Choose Payment Method</option>
            <option value="0">카드결제</option>
            <option value="1">실시간 계좌이체</option>
            <option value="2">가상계좌</option>
          </select>
        </div>
      </div>
      <div className="w-full text-center content-center justify-center">
        <button
          onClick={billingReq}
          className="mt-12 text-lg bg-blue-500 px-5 py-2 font-semibold tracking-wider text-white rounded-full hover:bg-blue-600"
        >
          주문하기
        </button>
      </div>
    </div>
  );
}
