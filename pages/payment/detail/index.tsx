import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/rootReducer";

export default function supplierDetail(props) {
  const dispatch = useDispatch();
  const billingState = useSelector((state: RootState) => state.billingState);

  return (
    <div className="w-full h-screen mx-auto divide-y-2 space-y-4 divide-autumnT-300 bg-gray-50 flex flex-col items-center justify-items-center rounded-md"></div>
  );
}
