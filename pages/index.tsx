import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SupplierRow from "../src/components/Auth/Supplier/SupplierRow";
import { SUPPLIER_LIST_URL } from "../src/constants";
import { RootState } from "../src/rootReducer";
import PendingOrderRow from "../src/components/Order/PendingOrderRow";

const category = ["KOREAN", "CHINESE", "WESTERN", "JAPANESE"];

const GET_PENDING_ORDERS = "http://localhost:8080/billing/pending/get";

export default function Home({ allPostsData }) {
  const [supplierListState, setSupplierListState] = useState(null);
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.userState);
  const [pendingBills, setPendingBills] = useState(null);

  const categoryReq = async (e) => {
    const targetUrl = SUPPLIER_LIST_URL + e.target.innerHTML;
    const data = await axios.get(targetUrl).then((res) => res.data);
    setSupplierListState(data.content);
  };
  function dateParse(str) {
    var y = str.substr(0, 4);
    var m = str.substr(4, 2);
    var d = str.substr(6, 2);
    return `${y}-`;
  }

  useEffect(() => {
    if (!userState.isAuthenticated) return;

    const result = axios
      .post(GET_PENDING_ORDERS, { email: userState.email })
      .then((res) => {
        console.log(res.data);
        setPendingBills(res.data);
      });
  }, [userState]);

  return (
    <div className="w-full  mx-auto bg-gray-50 flex flex-col items-center justify-items-center rounded-md">
      <div className="w-full flex flex-col">
        <div>
          {category.map((v, index) => {
            return (
              <button
                key={index}
                className="w-24 h-24 mt-5 mx-auto border border-gray-500"
                onClick={categoryReq}
              >
                {v}
              </button>
            );
          })}
        </div>

        <div>
          {supplierListState &&
            supplierListState.map((Supplier, index) => {
              return (
                <Link href={`/supplier-detail/${Supplier.id}`}>
                  <a>
                    <SupplierRow
                      key={index}
                      location={Supplier.location}
                      supplierName={Supplier.supplierName}
                      supplierId={Supplier.id}
                    ></SupplierRow>
                  </a>
                </Link>
              );
            })}
        </div>
      </div>
      <div>
        {pendingBills &&
          pendingBills.length > 0 &&
          pendingBills.map((bill, index) => {
            return (
              <PendingOrderRow
                key={index}
                billId={bill.billId}
                price={bill.price}
                createAt={bill.createAt.substr(0, 10)}
                deadLine={
                  bill.deadline.substr(0, 10) +
                  "-" +
                  bill.deadline.substr(11, 5)
                }
              />
            );
          })}
      </div>
    </div>
  );
}
