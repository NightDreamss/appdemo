import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { Notifications } from "@mantine/notifications";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, maximum-scale=5, viewport-fit=cover"
        />
      </Head>
      <NextNProgress color="#6d28d9" height={2} showOnShallow={true} />
      <Notifications
        position="top-center"
        zIndex={999999}
        limit={5}
        autoClose={5000}
      />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default App;
