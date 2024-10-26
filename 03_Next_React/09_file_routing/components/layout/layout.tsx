import { Fragment } from "react";

import MainHeader from "./main-header";

function Layout(props: { children: React.ReactNode }): JSX.Element {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
