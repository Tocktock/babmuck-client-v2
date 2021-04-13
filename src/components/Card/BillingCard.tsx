import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  billId: number;
  createAt: string;
  paymentMethod: string;
  price: number;
  supllierId: number;
}

const BillingCard: React.FC<Props> = ({
  billId,
  supllierId,
  createAt,
  paymentMethod,
  price,
}) => {
  const router = useRouter();

  const setBillingAndPushRouter = () => {
    router.push("/payment/detail");
  };
  return (
    <Link href={`/supplier-detail/${supllierId}`}>
      <a className="hover:no-underline py-4 px-8 w-1/4 bg-white shadow-lg rounded-lg my-6 divide-y space-y-2">
        <div className="flex justify-between">
          <span className="font-bold">결제 날짜 </span>
          <span>{createAt.substr(0, 10)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">결제 방법 </span> {paymentMethod}
        </div>
        <div className="flex justify-between">
          <span className="font-bold">얼마에요? </span> {price}
        </div>
      </a>
    </Link>
  );
};

export default BillingCard;
