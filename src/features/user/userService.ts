import axios, { AxiosResponse } from "axios";

const AUTH_URL = "http://localhost:8080/auth/user";
const REGISTER_URL = AUTH_URL + "/sign-up";
const LOGIN_URL = AUTH_URL + "/sign-in";

const registerReq = async (
  username: string,
  email: string,
  password: string
) => {
  const data = await axios
    .post(REGISTER_URL, { username, email, password })
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((err) => console.log(`register failed error : ${err}`));
  return data;
};

const loginReq = async (email: string, password: string) => {
  const data = await axios
    .post(LOGIN_URL, { email, password })
    .then((res: AxiosResponse) => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
      return res.data;
    })
    .catch((err) => console.log(`login failed error : ${err}`));
  return data;
};

export { registerReq, loginReq };
