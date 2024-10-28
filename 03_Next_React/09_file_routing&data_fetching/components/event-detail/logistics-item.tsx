import classes from "./logistics-item.module.scss";

function LogisticsItem(props: { children?: React.ReactNode; icon: React.FC }): JSX.Element {
  const { icon: Icon } = props;
  // console.log("Icon:", Icon);

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
