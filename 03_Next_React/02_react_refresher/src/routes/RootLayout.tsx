import { Outlet } from "react-router-dom";

import MainHeader from "../components/MainHeader";

function RootLayout(): JSX.Element {
  return (
    <>
      <MainHeader />
      {/* //* For nested content of the RootLayout */}
      <Outlet />
    </>
  );
}

export default RootLayout;
