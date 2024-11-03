import React from "react";

import MainNavigation from "./main-navigation";

function Layout(props: { children: React.ReactNode }): JSX.Element {
  return (
    <React.Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </React.Fragment>
  );
}

export default Layout;
