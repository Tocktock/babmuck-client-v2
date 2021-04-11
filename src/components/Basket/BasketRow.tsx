import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  addOrdersForPayment,
  resetOrdersForPayment,
  removeOrderForPayment,
  OrderForPayment,
} from "../../features/payment/paymentSlice";
export interface Menu {
  menuId: number;
  menuName: String;
  price: number;
  quentity: number;
}

export interface Store {
  storeName: string;
  location: string;
}
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
      console.log("added");
      dispatch(
        addOrdersForPayment({
          orderId: props.orderId,
          supplier: props.supplier,
          products: props.products,
        })
      );
    } else {
      dispatch(removeOrderForPayment(props.orderId));
      console.log("removed");
    }
  };
  return (
    <div className="flex flex-col mt-8">
      <div>{props.supplier.supplierName}</div>
      <hr />

      <div className="flex">
        <div className="flex flex-col w-full">
          {props.products.map((product) => (
            <div>
              {product.productName} : {product.productPrice} :{" "}
              {product.quentity} 개
            </div>
          ))}
        </div>
        <div className="flex items-center">
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
        수정하러가기
      </Link>
    </div>
  );
};
export default BasketRow;
