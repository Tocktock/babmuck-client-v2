import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  createAt: string;
  paymentMethod: string;
  price: number;
  orderDetail: any;
}
const PaymentMap = new Map<string, string>([
  ["PENDING", "미결제"],
  ["CARD", "카드"],
  ["VIRTUAL_ACCOUNT", "가상계좌"],
  ["ACCOUNT_TRANSFER", "계좌 이체"],
]);
const BillingCard: React.FC<Props> = ({
  orderDetail,
  createAt,
  paymentMethod,
  price,
}) => {
  const router = useRouter();
  const detailsMap = new Map<string, any[]>();
  const [detailState, setDetailState] = useState(null);

  useEffect(() => {
    orderDetail.forEach((v) => {
      if (v.quentity === 0) return;
      if (detailsMap.has(v.supplierName)) {
        detailsMap.get(v.supplierName).push({
          productName: v.productName,
          quentity: v.quentity,
          price: v.price,
        });
      } else {
        detailsMap.set(v.supplierName, [
          {
            productName: v.productName,
            quentity: v.quentity,
            price: v.price,
          },
        ]);
      }
    });
    const items = [];
    detailsMap.forEach((v, k) => {
      items.push({ supplierName: k, items: v });
    });
    console.log(detailsMap);
    setDetailState(items);
  }, []);

  return (
    <div className="flex hover:no-underline py-4 px-8 w-1/4 bg-white shadow-lg rounded-lg my-6">
      <div className="divide-y space-y-2">
        <div className="flex justify-between">
          <span className="font-bold">결제 날짜 </span>
          <span>{createAt.substr(0, 10)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">결제 방법 </span>{" "}
          {PaymentMap.get(paymentMethod)}
        </div>
        <div className="flex justify-between">
          <span className="font-bold">얼마에요? </span> {price}
        </div>
      </div>
      {/* <div className="h-full border mx-4"></div> */}
      {/* <div>
        {detailState &&
          detailState.map((detail) => {
            return (
              <div>
                <span className="font-bold">{detail.supplierName}</span>
                {detail.items.map((v) => {
                  return (
                    <div>
                      <span className="text-sm">
                        {v.productName} : {v.quentity} : {v.price}
                      </span>
                    </div>
                  );
                })}
                <hr></hr>
              </div>
            );
          })}
      </div> */}
    </div>
  );
};

export default BillingCard;
