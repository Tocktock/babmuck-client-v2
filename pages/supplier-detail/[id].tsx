import Link from "next/link";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormType from "../../src/components/SupplierDetail/FormType";
import { ADD_ORDER_URL, SUPPLIER_DETAIL_URL } from "../../src/constants";
import { RootState } from "../../src/rootReducer";
import GoogleMaps from "../../src/components/GoogleMap";

const hashSelector = new Map();

export default function supplierDetail(props) {
  const [priceSum, setPriceSum] = useState(0);
  const userState = useSelector((state: RootState) => state.userState);
  const [renderState, setRenderState] = useState(false);
  const checkBoxHandler = (productId, price, quentity) => {
    hashSelector.set(productId, { price, quentity });
    let sum = 0;
    hashSelector.forEach((v) => {
      sum += v.price * v.quentity;
    });
    setPriceSum(sum);
  };

  const addToBasketReq = async () => {
    const items = [];
    hashSelector.forEach((value, productId) => {
      items.push({
        productId: productId,
        quentity: value.quentity,
      });
    });
    props.products.map((product) => {
      if (!hashSelector.has(product.id)) {
        hashSelector.set(product.id, { quentity: 0 });
      }
    });
    const data = await axios
      .post(ADD_ORDER_URL, {
        orderDetailInfo: items,
        supplierId: props.supplierId,
        email: userState.email,
      })
      .then((res) => res.data);
  };

  //clear
  useEffect(() => {
    hashSelector.clear();
    setPriceSum(0);
    setRenderState(true);
  }, []);

  return (
    <div className="w-full mx-auto divide-y-2 space-y-4 divide-autumnT-300 bg-gray-50 flex flex-col items-center justify-items-center rounded-md">
      <div className="mt-4">{props.supplierName}</div>
      <div>{props.location}</div>
      <div>{props.contactInfo}</div>
      <form className="w-3/5 flex flex-col items-center">
        {props.products.map((product, index) => {
          return (
            <FormType
              key={index}
              productId={product.id}
              productPrice={product.price}
              checkBoxHandler={checkBoxHandler}
              productName={product.productName}
            />
          );
        })}
      </form>
      <div className="w-3/5 flex flex-col items-center">
        <span className="block"> 총 주문 금액 : {priceSum}</span>
        <button
          onClick={addToBasketReq}
          className="mt-2 bg-gray-200 hover:bg-blue-700 hover:text-white border border-gray-400 text-blue-700 font-bold py-2 px-6 rounded-lg"
        >
          장바구니 담기
        </button>
        {userState.email != "" && (
          <Link href={"/mybasket"}>
            <a className="mt-2 bg-gray-200 hover:bg-red-700 hover:text-white border border-gray-400 text-red-700 font-bold py-2 px-6 rounded-lg">
              장바구니로 가기
            </a>
          </Link>
        )}
        <div className="w-full">
          <GoogleMaps
            center={{ lat: props.longitude, lng: props.latitude }}
          ></GoogleMaps>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const target = parseInt(context.resolvedUrl.split("/").pop());
  const supplier = await fetch(`${SUPPLIER_DETAIL_URL}${target}`).then((res) =>
    res.json()
  );
  return {
    props: {
      supplierId: supplier.id,
      supplierName: supplier.supplierName,
      location: supplier.location,
      contactInfo: supplier.contactInfo,
      latitude: supplier.latitude,
      longitude: supplier.longitude,
      products: supplier.products,
    },
  };
};
