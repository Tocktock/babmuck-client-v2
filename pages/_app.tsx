import "../styles/global.css";
import Head from "next/head";
import Navbar from "../src/components/Navigation/Navbar";
import ModalAuth from "../src/components/Auth/ModalAuth";
import { Provider } from "react-redux";
import store from "../src/store";
import Alarm from "../src/components/Alarm";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }) {
  return (
    <div className="container mx-auto">
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          key="ttt"
        />
      </Head>
      <CookiesProvider>
        <Provider store={store}>
          <Navbar />
          <Alarm />
          <ModalAuth />
          <Component {...pageProps} />
        </Provider>
      </CookiesProvider>
    </div>
  );
}
