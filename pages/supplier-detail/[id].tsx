import Link from "next/link";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormType from "../../src/components/SupplierDetail/FormType";
import {
  ADD_ORDER_TO_BASKET_URL,
  SUPPLIER_DETAIL_URL,
} from "../../src/constants";
import { RootState } from "../../src/rootReducer";
import GoogleMaps from "../../src/components/GoogleMap";
import {
  MessageType,
  setAlarmAndShow,
} from "../../src/features/alarm/alarmSlice";

const hashSelector = new Map();

export default function supplierDetail(props) {
  const dispatch = useDispatch();
  const [priceSum, setPriceSum] = useState(0);
  const userState = useSelector((state: RootState) => state.userState);
  const checkBoxHandler = (productId, price, quentity) => {
    hashSelector.set(productId, { price, quentity });
    let sum = 0;
    hashSelector.forEach((v) => {
      sum += v.price * v.quentity;
    });
    setPriceSum(sum);
  };

  const addToBasketReq = async () => {
    if (priceSum === 0) {
      dispatch(
        setAlarmAndShow({
          message: "하나 이상의 품목을 선택해주세요",
          type: MessageType.warning,
        })
      );
      return;
    }
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
      .post(ADD_ORDER_TO_BASKET_URL, {
        orderDetailInfo: items,
        supplierId: props.supplierId,
        email: userState.email,
      })
      .then((res) => {
        if (res.data) {
          dispatch(
            setAlarmAndShow({
              message: "장바구니 담기 성공!",
              type: MessageType.success,
            })
          );
        } else {
          dispatch(
            setAlarmAndShow({
              message: "담기 실패했습니다.",
              type: MessageType.failed,
            })
          );
        }
      });
  };

  //clear
  useEffect(() => {
    hashSelector.clear();
    setPriceSum(0);
  }, []);

  return (
    <div className="w-full  divide-autumnT-300 bg-gray-50 flex flex-col  rounded-md">
      <div className="flex flex-col w-4/5 mx-auto divide-y-2 space-y-4 items-center justify-items-center">
        <div className="px-24 pt-12">
          <div className="font-bold text-2xl mb-2">{props.supplierName}</div>
          <p className="text-gray-700 text-base">
            <div>{props.location}</div>
            <div>{props.contactInfo}</div>
          </p>
          <div className="px-6 mt-4 pb-2">
            {props.products.map((product, key) => (
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {product.productName}
              </span>
            ))}
          </div>
        </div>

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
        <div className="w-3/5 flex flex-col">
          <div className="flex justify-items-center justify-center mt-6">
            <span className="block">총 주문 금액 :</span>{" "}
            <span className="w-16 ml-2 block">{priceSum}</span>
          </div>
          <div className="flex justify-items-center mt-4 justify-center">
            <button
              onClick={addToBasketReq}
              className="bg-blue-100 mr-4 px-4 py-2 text-lg font-semibold tracking-wider text-blue-600 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              장바구니 담기
            </button>
            {userState.email != "" && (
              <Link href={"/mybasket"}>
                <a className="hover:no-underline bg-red-100 px-4 py-2 text-lg font-semibold tracking-wider text-red-300 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  장바구니로 가기
                </a>
              </Link>
            )}
          </div>

          <div className="w-full mt-6">
            <GoogleMaps
              center={{ lat: props.latitude, lng: props.longitude }}
            ></GoogleMaps>
          </div>
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
