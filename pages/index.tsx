import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import SupplierRow from "../src/components/Auth/Supplier/SupplierRow";
import { SUPPLIER_LIST_URL } from "../src/constants";

const category = ["KOREAN", "CHINESE", "WESTERN", "JAPANESE"];

export default function Home({ allPostsData }) {
  const [supplierListState, setSupplierListState] = useState(null);
  const useSlice = () => {};

  const categoryReq = async (e) => {
    const targetUrl = SUPPLIER_LIST_URL + e.target.innerHTML;
    const data = await axios.get(targetUrl).then((res) => res.data);
    setSupplierListState(data.content);
  };

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
      <div className="sm:w-full h-screen md:w-2/3 lg:w-1/2"></div>
    </div>
  );
}
