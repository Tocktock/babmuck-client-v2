import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
  orderId: number;
  products: any;
  supplier: any;
}

const OrderRow: React.FC<Props> = (props) => {
  let price = 0;
  props.products.forEach((product) => {
    price += product.quentity * product.productPrice;
  });

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
      </div>
      <div>총 {price} : 원 </div>
    </div>
  );
};
export default OrderRow;
