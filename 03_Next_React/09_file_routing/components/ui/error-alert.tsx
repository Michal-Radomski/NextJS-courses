import classes from "./error-alert.module.scss";

function ErrorAlert(props: { alert: string; children: React.ReactNode }): JSX.Element {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
