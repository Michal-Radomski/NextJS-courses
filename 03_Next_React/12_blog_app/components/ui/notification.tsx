import ReactDOM from "react-dom";

import classes from "./notification.module.scss";

function Notification(props: NotificationI): JSX.Element {
  const { title, message, status } = props;

  let statusClasses: string = "";

  if (status === ("success" as Status)) {
    statusClasses = classes.success;
  }

  if (status === ("error" as Status)) {
    statusClasses = classes.error;
  }

  const cssClasses: string = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("notifications") as HTMLDivElement
  );
}

export default Notification;
