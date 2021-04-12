import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessageType, setAlarmAndShow } from "../../features/alarm/alarmSlice";
import { toggleModalDisplay } from "../../features/modal/modalSlice";
import { registerReq, loginReq } from "../../features/user/userService";
import { userAuthenticated } from "../../features/user/userSlice";
import { useCookies } from "react-cookie";
import axios from "axios";
import { RootState } from "../../rootReducer";

interface Props {}

const AUTH_WITH_ACCESSTOKEN_URL = "http://localhost:8080/auth/user/accessToken";

const Auth: React.FC<Props> = (props) => {
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const userState = useSelector((state: RootState) => state.userState);
  useEffect(() => {
    if (cookies.user && !userState.isAuthenticated) {
      const result = axios
        .post(
          AUTH_WITH_ACCESSTOKEN_URL,
          {},
          {
            headers: { Authorization: ` Bearer ${cookies.user}` },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.username)
            dispatch(
              userAuthenticated({
                accessToken: cookies.user,
                isAuthenticated: true,
                username: res.data.username,
                email: res.data.email,
              })
            );
          return res.data;
        });
    } else if (!cookies.user && userState.isAuthenticated) {
      dispatch(
        userAuthenticated({
          accessToken: "",
          isAuthenticated: false,
          username: "",
          email: "",
        })
      );
      axios.defaults.headers.common["Authorization"] = "";
    }
  });

  const resetInput = () => {
    emailRef!.current.value = "";
    passwordRef!.current.value = "";
    if (showRegisterForm) usernameRef.current.value = "";
    setShowRegisterForm(false);
  };

  const authReq = async (e) => {
    e.preventDefault();
    if (showRegisterForm) {
      signUpReq();
    } else {
      signInReq();
    }
  };

  const signUpReq = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;

    let result = await registerReq(username, email, password);
    if (result === undefined) {
      wrongInputAlarm();
      return;
    } else {
      dispatch(
        setAlarmAndShow({
          message: "register successfuly done",
          type: MessageType.success,
        })
      );
    }
    resetInput();
  };
  const signInReq = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const result = await loginReq(email, password);
    if (result === undefined) {
      wrongInputAlarm();
    } else {
      resetInput();
      console.log(result);
      dispatch(
        userAuthenticated({
          accessToken: result.accessToken,
          isAuthenticated: true,
          username: result.username,
          email: result.email,
        })
      );
      dispatch(toggleModalDisplay());
      dispatch(
        setAlarmAndShow({
          message: `happy to see you ${result.username}`,
          type: MessageType.success,
        })
      );
      setCookie("user", result.accessToken, {
        path: "/",
        maxAge: 86400,
      });
    }
    resetInput();
  };

  const wrongInputAlarm = () => {
    dispatch(
      setAlarmAndShow({
        message: "email or password form is wrong",
        type: MessageType.failed,
      })
    );
  };

  return (
    <form className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            ref={emailRef}
            name="email"
            type="email"
            autoComplete="ourstory-email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>

        {showRegisterForm && (
          <div>
            <label htmlFor="username" className="sr-only">
              Password
            </label>
            <input
              ref={usernameRef}
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center px-2">
          <input
            id="remember_me"
            name="remember_me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember_me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>
      </div>

      <div>
        <button
          className="group relative w-full flex justify-center mb-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={authReq}
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          {showRegisterForm ? "Register" : "SignIn"}
        </button>
        <button
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={(e) => {
            e.preventDefault();
            setShowRegisterForm(!showRegisterForm);
          }}
        >
          {showRegisterForm ? "Go to SignIn" : "Go to Register"}
        </button>
        <div className="text-sm text-center py-2">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </form>
  );
};

export default Auth;
