import React from "react";

const NotificationContext = React.createContext({
  notification: null as NotificationI | null, // { title, message, status }
  showNotification: function (notificationData: NotificationI): void {},
  hideNotification: function (): void {},
});

export default NotificationContext;

export function NotificationContextProvider(props: { children: React.ReactNode }): JSX.Element {
  const [activeNotification, setActiveNotification] = React.useState<NotificationI | null>(null);

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

  function showNotificationHandler(notificationData: NotificationI): void {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler(): void {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification as NotificationI,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  } as NotificationContextI;

  return <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>;
}
