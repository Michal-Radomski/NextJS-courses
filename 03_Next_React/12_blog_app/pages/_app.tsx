import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "../components/layout/layout";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
