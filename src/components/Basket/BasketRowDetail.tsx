import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_ORDER_URL } from "../../constants";
import { MessageType, setAlarmAndShow } from "../../features/alarm/alarmSlice";
import { changeBasket } from "../../features/basket/basketSlice";
import { RootState } from "../../rootReducer";
import {
  changeSelectedOrderInBasket,
  removeOrderForPayment,
} from "../../features/payment/paymentSlice";
export interface Props {
  orderId: number;
  product: any;
  supplierId: number;
  disableCheckbox: any;
}

const BasketRowDetail: React.FC<Props> = ({
  orderId,
  product,
  supplierId,
  disableCheckbox,
}) => {
  const dispatch = useDispatch();
  const [modifyMode, setModifyMode] = useState(false);
  const userState = useSelector((state: RootState) => state.userState);
  const [counter, setCounter] = useState(product.quentity);
  const [quentity, setQuentity] = useState(product.quentity);

  const modifyHandler = async () => {
    if (modifyMode === true) {
      if (counter === product.quentity) {
        setModifyMode(!modifyMode);
        return;
      }
      const result = await axios.post(UPDATE_ORDER_URL, {
        orderDetailInfo: [
          {
            productId: product.productId,
            quentity: counter,
          },
        ],
        email: userState.email,
        supplierId: supplierId,
      });
      if (result.data) {
        dispatch(
          setAlarmAndShow({
            message: "주문 수정 완료",
            type: MessageType.success,
          })
        );
        setQuentity(counter);
        dispatch(
          changeBasket({
            orderId,
            productId: product.productId,
            productQuentity: counter,
          })
        );
        dispatch(removeOrderForPayment(orderId));
        disableCheckbox();
      } else {
        dispatch(
          setAlarmAndShow({
            message: "주문 수정 실패",
            type: MessageType.failed,
          })
        );
      }
    }
    setModifyMode(!modifyMode);
  };
  const increseCounter = (e) => {
    e.preventDefault();
    setCounter(counter + 1);
  };

  const decreseCounter = (e) => {
    e.preventDefault();
    if (counter > 0) setCounter(counter - 1);
  };

  return (
    <div className="flex my-1 justify-between">
      <div className="px-2">
        {product.productName} : {product.productPrice} : {quentity} 개
      </div>

      {modifyMode && (
        <div>
          <button onClick={decreseCounter} className="bg-gray-200 w-5 mx-1">
            -
          </button>
          <span> {counter}</span>
          <button onClick={increseCounter} className="bg-gray-200 w-5 mx-1">
            +
          </button>
        </div>
      )}
      <button
        className=" text-xs font-semibold tracking-wider border-2 border-gray-300 rounded hover:bg-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
        onClick={modifyHandler}
      >
        {modifyMode ? "완료" : "수정"}
      </button>
    </div>
  );
};

export default BasketRowDetail;
