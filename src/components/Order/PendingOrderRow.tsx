import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addOrdersForPayment } from "../../features/payment/paymentSlice";
import { setBillingId } from "../../features/payment/paymentSlice";

interface Props {
  billId: number;
  price: number;
  createAt: string;
  deadLine: string;
}

const PendingOrderROw: React.FC<Props> = ({
  billId,
  price,
  createAt,
  deadLine,
}) => {
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(false);
  const router = useRouter();
  const letsPayit = () => {
    const result = axios
      .post("http://localhost:8080/order/pending", {
        billId,
      })
      .then((res) => {
        res.data.forEach((v) => {
          dispatch(
            addOrdersForPayment({
              orderId: v.orderId,
              supplier: {
                supplierId: v.supplier,
                supplierName: v.supplierName,
              },
              products: v.items,
            })
          );
          dispatch(setBillingId(billId));
        });
      })
      .then(() => {
        router.push("/payment/pending");
      });
  };
  const cancleBilling = async (e) => {
    e.preventDefault();
    const result = await axios
      .post("http://localhost:8080/billing/cancle", { billId: billId })
      .then((res) => console.log(res.data));

    setIsHidden(true);
  };
  return (
    <div
      className={
        isHidden
          ? "hidden"
          : "block" +
            " max-w-xl w-full rounded-lg shadow-lg p-2 flex md:flex-row flex-col"
      }
    >
      <button
        onClick={letsPayit}
        className="flex-1 bg-gray-100 hover:bg-gray-200 p-2 rounded-md"
      >
        <h4 className="font-semibold text-base tracking-wide">
          {createAt.toString()} 날짜에 주문하신 결제 완료하기.
        </h4>
        <p className="text-gray-500 my-1">마감 : {deadLine.toString()}</p>
      </button>
      <button
        className="bg-red-500 mx-5 text-white font-bold px-4 text-sm uppercase rounded tracking-wider focus:outline-none hover:bg-red-600"
        onClick={cancleBilling}
      >
        취소하기
      </button>
    </div>
  );
};
export default PendingOrderROw;

{
  /* <div className="max-w-xl w-full rounded-lg shadow-lg p-4 flex md:flex-row flex-col">
<div className="flex-1">
    <h3 className="font-semibold text-lg tracking-wide">Here is link for your payment.</h3>
    <p className="text-gray-500 my-1">
        The link will be available for 24 hours. Lorem ipsum dolor sit, amet, consectetur adipisicing elit. Nesciunt, sequi!
    </p>
</div>
<div className="md:px-2 mt-3 md:mt-0 items-center flex">
    <button className="bg-blue-500 text-white font-bold px-4 py-2 text-sm uppercase rounded tracking-wider focus:outline-none hover:bg-blue-600"> Something</button>
</div>
</div> */
}
