import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModalDisplay } from "../../features/modal/modalSlice";
interface Props {
  toggleModalFn?: toggleModalFnType;
}

interface toggleModalFnType {
  (): void;
}
const LoginButton: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  return (
    <button
      className="bg-autumnT-500 h-8 px-4 focus:outline-none text-autumnT-100 rounded-xl hover:bg-autumnT-400 hover:text-autumnT-500"
      onClick={() => {
        dispatch(toggleModalDisplay());
      }}
    >
      Sign In
    </button>
  );
};

export default LoginButton;
