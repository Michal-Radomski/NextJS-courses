import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.scss";

function Layout(props: { children: React.ReactNode }): JSX.Element {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
