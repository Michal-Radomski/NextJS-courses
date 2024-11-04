import React from "react";
import { signIn } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";

import classes from "./auth-form.module.scss";

async function createUser(email: string, password: string): Promise<Auth> {
  const response: Response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = (await response.json()) as Auth;

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function AuthForm(): JSX.Element {
  const router: NextRouter = useRouter();

  const emailInputRef: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);
  const passwordInputRef: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);

  const [isLogin, setIsLogin] = React.useState<boolean>(true);

  function switchAuthModeHandler(): void {
    setIsLogin((prevState: boolean) => !prevState);
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value as string;
    const enteredPassword = passwordInputRef.current?.value as string;

    //* Optional: Add validation

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result?.error) {
        // set some auth state
        router.replace("/profile");
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log("result:", result);
      } catch (error) {
        console.log("error:", error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required={true} ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required={true} ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
