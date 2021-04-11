import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlarmAndShow } from "../../features/alarm/alarmSlice";
import { toggleModalDisplay } from "../../features/modal/modalSlice";
import { faSignOutAlt, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {}

const BasketModal: React.FC<Props> = (props) => {
  return <div></div>;
};

export default BasketModal;
