import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addOrdersForPayment,
  resetOrdersForPayment,
  removeOrderForPayment,
  OrderForPayment,
} from "../../features/payment/paymentSlice";
import { RootState } from "../../rootReducer";
import BasketRowDetail from "./BasketRowDetail";

interface Props {
  orderId: number;
  products: any;
  supplier: any;
}

const BasketRow: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const checkboxRef = useRef(null);
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

  const checkboxDisable = (e) => {
    checkboxRef.current.checked = false;
  };

  return (
    <div className="py-4 px-8 bg-white shadow-lg rounded-lg my-6">
      <div className="my-2 text-xl text-gray-600">
        {props.supplier.supplierName}
      </div>
      <hr />

      <div className="flex">
        <div className="flex flex-col w-full">
          {props.products.map((product) => {
            if (product.quentity == 0) return;
            return (
              <BasketRowDetail
                disableCheckbox={checkboxDisable}
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
        <a className="block px-4 py-2 font-semibold tracking-wider border-2 border-gray-300 rounded hover:bg-gray-200 text-gray-600 hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-300">
          메뉴 다시 고르기
        </a>
      </Link>
    </div>
  );
};
export default BasketRow;
