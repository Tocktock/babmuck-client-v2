import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MessageType, setAlarmDefault } from "../features/alarm/alarmSlice";

const Alarm: React.FC = () => {
  const { message, type } = useSelector((state) => state.alarmState);
  const [messageColor, setmessageColor] = useState<string>("bg-green-400");
  const [alarmPos, setAlarmPos] = useState<string>("-translate-y-24");

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === MessageType.default) return;

    if (type === MessageType.failed) setmessageColor("bg-red-400");
    else if (type === MessageType.success) setmessageColor("bg-green-400");
    else setmessageColor("bg-yellow-500");
    setAlarmPos("translate-y-0");
    setTimeout(() => {
      setAlarmPos("-translate-y-24");
      dispatch(setAlarmDefault(MessageType.default));
    }, 2000);
    console.log(`type is : ${type}`);
  }, [type]);

  return (
    <div
      className={`fixed z-50 left-1/2 justify-center px-4 py-2 rounded-md transition transform top-8 ${messageColor} ${alarmPos}`}
    >
      <span>{message}</span>
    </div>
  );
};

export default Alarm;
