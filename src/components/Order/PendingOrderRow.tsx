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
    <div className={isHidden ? "hidden" : "block"}>
      <button
        onClick={letsPayit}
        className="w-full divide-x-reverseflex flex-col mt-8 bg-blue-300"
      >
        <div>
          {createAt.toString()} 날짜에 주문하신 결제 완료하기 : {price} 원{" "}
        </div>
        <div>마감 : {deadLine.toString()}</div>
      </button>
      <button className="bg-red-300" onClick={cancleBilling}>
        취소하기
      </button>
    </div>
  );
};
export default PendingOrderROw;
