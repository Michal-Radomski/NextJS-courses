import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { Props } from "next/script";

import { themeDark, themeLight } from "lib/theme";

export default function MyApp(props: { Component: React.FC; pageProps: Props }): JSX.Element {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={false ? themeDark : themeLight}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
