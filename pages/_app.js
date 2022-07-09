import "../styles/globals.css";
import { UserProvider } from "../lib/context";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <title>SharePlate</title>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
      </Head>

      <div>
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}

export default MyApp;
