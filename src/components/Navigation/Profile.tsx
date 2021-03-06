import { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { userAuthenticated } from "../../features/user/userSlice";
import { MessageType, setAlarmAndShow } from "../../features/alarm/alarmSlice";
import axios from "axios";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { RootState } from "../../rootReducer";

export default function Profile() {
  const dispatch = useDispatch();
  const [displayMyMenu, setDisplayMyMenu] = useState(false);
  const userState = useSelector((state: RootState) => state.userState);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const signOut = () => {
    const goodbyeUser = userState.username;
    dispatch(
      userAuthenticated({
        accessToken: "",
        isAuthenticated: false,
        username: "",
        email: "",
      })
    );
    removeCookie("user", {
      path: "/",
    });
    setDisplayMyMenu(false);
    dispatch(
      setAlarmAndShow({
        message: `goodbye ${goodbyeUser}`,
        type: MessageType.success,
      })
    );
    axios.defaults.headers.common["Authorization"] = "";
  };
  return (
    <div className="ml-3 relative ">
      <div className="flex">
        <button
          className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          id="user-menu"
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
        </button>

        <div className="mr-12 text-center align-middle">
          {userState.username != "" && `반갑습니다 ${userState.username}`}
        </div>
        <button
          className="text-autumnT-500 hover:text-autumnT-400 focus:outline-none"
          onClick={() => setDisplayMyMenu(!displayMyMenu)}
        >
          <span className="flex w-6 h-6">
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          </span>
        </button>
      </div>

      {displayMyMenu && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-20"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <Link href="/mybasket">
            <a
              className="text-center hover:no-underline w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              장바구니
            </a>
          </Link>
          <Link href="/payment/payment-list">
            <a
              className="text-center hover:no-underline w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              결제내역
            </a>
          </Link>
          <button
            onClick={signOut}
            className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
