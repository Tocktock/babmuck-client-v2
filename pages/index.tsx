import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SupplierRow from "../src/components/Supplier/SupplierRow";
import { RootState } from "../src/rootReducer";
import PendingOrderRow from "../src/components/Order/PendingOrderRow";
import CategoryCard from "../src/components/Card/CategoryCard";
import PageSelector from "../src/components/PageSelector/PageSelector";
import SupplierCard from "../src/components/Card/SupplierCard";
const categoryList = ["korean", "chinese", "western", "japanese"];
const categoryMapping = new Map([
  ["korean", "한식"],
  ["chinese", "중식"],
  ["western", "양식"],
  ["japanese", "일식"],
]);

const GET_PENDING_ORDERS = "http://localhost:8080/billing/pending/get";

export default function Home() {
  const [supplierListState, setSupplierListState] = useState(null);
  const userState = useSelector((state: RootState) => state.userState);
  const [pendingBills, setPendingBills] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("korean");

  const categoryReq = async (targetUrl: string) => {
    const data = await axios.get(targetUrl).then((res) => res.data);
    setSupplierListState(data.content);
  };

  useEffect(() => {
    if (!userState.isAuthenticated) return;
    const result = axios
      .post(GET_PENDING_ORDERS, { email: userState.email })
      .then((res) => {
        setPendingBills(res.data);
      });
  }, [userState]);

  return (
    <div className="w-full  mx-auto bg-gray-50 flex flex-col items-center justify-items-center rounded-md">
      <div className="w-full flex flex-col">
        <div className="w-full flex my-5">
          {categoryList.map((v, index) => {
            return (
              <CategoryCard
                key={index}
                category={v}
                categoryLettering={categoryMapping.get(v)}
                categoryReq={categoryReq}
                setSelectedCategory={setSelectedCategory}
              />
            );
          })}
        </div>
        {supplierListState && (
          <PageSelector
            pageNumReq={categoryReq}
            selectedCategory={selectedCategory}
          />
        )}

        <div className=" bg-gray-200 ">
          {supplierListState &&
            supplierListState.map((Supplier, index) => {
              return (
                <Link href={`/supplier-detail/${Supplier.id}`}>
                  <a>
                    <SupplierCard
                      key={index}
                      location={Supplier.location}
                      supplierName={Supplier.supplierName}
                      supplierId={Supplier.id}
                    ></SupplierCard>
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
