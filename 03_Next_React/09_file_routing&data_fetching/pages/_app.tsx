import type { AppProps } from "next/app";
import Head from "next/head";

import "@/styles/globals.scss";
import Layout from "@/components/layout/layout";
import { NotificationContextProvider } from "@/store/notification-context";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="NextJS Events" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
