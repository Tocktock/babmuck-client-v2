import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { STORE_DETAIL_URL } from "../../constants";

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
  console.log(props);
  return (
    <div className="flex flex-col mt-8">
      <div>{props.supplier.supplierName}</div>
      <hr />
      <div>
        {props.products &&
          props.products.map((product) => (
            <div>
              {product.productName} : {product.productPrice} :{" "}
              {product.quentity} 개
            </div>
          ))}
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
