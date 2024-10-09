import { Outlet } from "react-router-dom";

import MainHeader from "../components/MainHeader";

function RootLayout(): JSX.Element {
  return (
    <>
      <MainHeader />
      <Outlet /> //* For nested content of the RootLayout
    </>
  );
}

export default RootLayout;
