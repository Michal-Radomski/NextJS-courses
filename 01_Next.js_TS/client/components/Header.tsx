import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, Link as LinkText, Switch } from "@material-ui/core";
import Link from "next/link";

import { useAuth } from "lib/useAuth";

export default function Header({
  darkState,
  handleThemeChange,
}: {
  darkState: boolean;
  handleThemeChange: () => void;
}): JSX.Element {
  const classes = useStyles();
  const { user } = useAuth() as { user: User };
  // console.log("user:", user);

  const links = [
    !user && { label: "Sign Up", href: "/auth/SignUp" },
    !user && { label: "Sign In", href: "/auth/SignIn" },
    user && { label: "Create", href: "/streams/New" },
    user && { label: "Sign Out", href: "/auth/SignOut" },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <Link href={href} key={href}>
          <Button color="inherit">{label}</Button>
        </Link>
      );
    });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <LinkText href="" color="inherit">
                Stream.me
              </LinkText>
            </Link>
          </Typography>
          <Switch checked={darkState} onChange={handleThemeChange} />
          {links}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));
