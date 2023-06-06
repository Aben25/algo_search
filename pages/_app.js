import "../global.css";
import "../styles/tailwind.css";
import Script from "next/script";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Add the favicon */}
      {/* Add the favicon */}
      {/* Note that the path doesn't include "public" */}

      <Component {...pageProps} />

    </>
  );
}
