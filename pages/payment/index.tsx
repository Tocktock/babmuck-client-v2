import Link from "next/link";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../src/rootReducer";

const hashSelector = new Map();

export default function supplierDetail(props) {
  const [priceSum, setPriceSum] = useState(0);
  const ordersForPaymentState = useSelector(
    (state: RootState) => state.ordersForPaymentState
  );
  const [paymentMethod, setPaymentMethod] = useState("-1");
  const [paymentNow, setPaymentNow] = useState(true);
  const paymentMethodRef = useRef(null);

  const selectedColor =
    " bg-blue-100 text-blue-600 hover:bg-blue-200 focus:ring-blue-500";

  const notSelectedColor =
    " bg-red-100 text-red-600 hover:bg-red-200 focus:ring-red-500";
  const togglePayMentNow = (e) => {
    e.preventDefault();
    setPaymentNow(!paymentNow);
  };
  const handlePaymentMethod = (e) => {
    console.log(e.target);
    console.log(e.option[e.target.selectedIndex].text);
    setPaymentMethod(e.target.selected);
  };

  return (
    <div className="w-full mx-auto divide-y-2 space-y-4 divide-autumnT-300 bg-gray-50 flex flex-col items-center justify-items-center rounded-md">
      <div className="w-full my-6 ml-6">결제하기</div>
      <div className="w-full ml-6">
        <div> 결제 시기</div>
        <hr></hr>
        <div className="w-full">
          <button
            onClick={togglePayMentNow}
            className={
              "px-4 py-2 text-xs font-semibold tracking-wider  rounded  focus:outline-none focus:ring-2 focus:ring-offset-2" +
              paymentNow
                ? selectedColor
                : notSelectedColor
            }
          >
            지금결제
          </button>
          <button
            onClick={togglePayMentNow}
            className={
              "px-4 py-2 text-xs font-semibold tracking-wider rounded focus:outline-none focus:ring-2 focus:ring-offset-2" +
              paymentNow
                ? notSelectedColor
                : selectedColor
            }
          >
            나중에결제
          </button>
        </div>
        <div className="relative inline-flex">
          <svg
            className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 412 232"
          >
            <path
              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
              fill="#648299"
              fill-rule="nonzero"
            />
          </svg>
          <select
            ref={paymentMethodRef}
            onChange={handlePaymentMethod}
            className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
          >
            <option value="-1">Choose Payment Method</option>
            <option value="0">카드결제</option>
            <option value="1">실시간 계좌이체</option>
            <option value="2">가상계좌</option>
          </select>
        </div>
      </div>
    </div>
  );
}
