import { useState } from "react";
import Welcome from "./Welcome";
import Auth from "./Auth";
import { useSelector, useDispatch } from "react-redux";
import { setAlarmAndShow } from "../../features/alarm/alarmSlice";
import { toggleModalDisplay } from "../../features/modal/modalSlice";
import { faSignOutAlt, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../../rootReducer";

interface Props {}

const ModalAuth: React.FC<Props> = (props) => {
  // for test
  const dispatch = useDispatch();

  const messageTest = () => {
    dispatch(setAlarmAndShow({ message: "test", type: 2 }));
  };

  const { modalDisplay } = useSelector((state: RootState) => state.modalState);

  const toggleModalState = () => {
    dispatch(toggleModalDisplay());
  };

  return (
    <div
      className={
        "flex fixed inset-0 overflow-y-auto z-20 justify-center items-center min-h-full text-center " +
        modalDisplay
      }
    >
      {/* background overlay */}
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      {/* trick the browser into centering the modal contents */}
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      ></span>
      <div
        className="relative flex align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="hidden sm:flex sm:flex-col w-1/2 py-4 px-4">
          <Welcome />
        </div>
        <div className="min-h-full w-1/2 pt-4 px-4">
          <Auth />
        </div>
        <button
          className="absolute right-2 top-0 w-8 pt-2 pr-2"
          onClick={toggleModalState}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>
      </div>
    </div>
  );
};

export default ModalAuth;
