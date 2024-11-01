import React from "react";

import MainHeader from "./main-header";
import NotificationContext from "@/store/notification-context";
import Notification from "../ui/notification";

function Layout(props: { children: React.ReactNode }): JSX.Element {
  const notificationCtx = React.useContext(NotificationContext) as NotificationContextI;

  const activeNotification = notificationCtx.notification as NotificationI;

  return (
    <React.Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification ? (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      ) : null}
    </React.Fragment>
  );
}

export default Layout;
