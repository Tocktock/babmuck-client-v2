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
              <div>
                {product.productName} : {product.productPrice} :{" "}
                {product.quentity} 개
              </div>
            );
          })}
        </div>
      </div>
      <hr></hr>
      <div className="mt-2"> {price} : 원 </div>
    </div>
  );
};
export default OrderRow;
