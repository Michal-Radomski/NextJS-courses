import React from "react";

const NotificationContext = React.createContext({
  notification: null as Notification | null, // { title, message, status }
  showNotification: function (notificationData: Notification) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props: { children: React.ReactNode }): JSX.Element {
  const [activeNotification, setActiveNotification] = React.useState<Notification | null>(null);

  React.useEffect(() => {
    if (activeNotification && (activeNotification.status === "success" || activeNotification.status === "error")) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData: Notification): void {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler(): void {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  } as NotificationContextI;

  return <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>;
}

export default NotificationContext;
