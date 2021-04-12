import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addOrdersForPayment,
  resetOrdersForPayment,
  removeOrderForPayment,
  OrderForPayment,
} from "../../features/payment/paymentSlice";
import { UPDATE_ORDER_URL } from "../../constants";
import axios from "axios";
import { RootState } from "../../rootReducer";
import { MessageType, setAlarmAndShow } from "../../features/alarm/alarmSlice";
import BasketRowDetail from "./BasketRowDetail";

interface Props {
  orderId: number;
  products: any;
  supplier: any;
}

const BasketRow: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const checkboxRef = useRef();
  const toggleItemForPayment = (e) => {
    if (e.target.checked) {
      dispatch(
        addOrdersForPayment({
          orderId: props.orderId,
          supplier: props.supplier,
          products: props.products,
        })
      );
    } else {
      dispatch(removeOrderForPayment(props.orderId));
    }
  };

  return (
    <div className="flex flex-col mt-8">
      <div>{props.supplier.supplierName}</div>
      <hr />

      <div className="flex">
        <div className="flex flex-col w-full">
          {props.products.map((product) => {
            return (
              <BasketRowDetail
                orderId={props.orderId}
                product={product}
                supplierId={props.supplier.supplierId}
              ></BasketRowDetail>
            );
          })}
        </div>
        <div className="flex items-center pl-8">
          <input
            ref={checkboxRef}
            onChange={toggleItemForPayment}
            type="checkbox"
            name="orderFor"
          />
        </div>
      </div>
      <Link
        href={`/supplier-detail/${
          props.supplier.supplierId ? props.supplier.supplierId : 0
        }`}
      >
        메뉴 다시 고르기
      </Link>
    </div>
  );
};
export default BasketRow;
