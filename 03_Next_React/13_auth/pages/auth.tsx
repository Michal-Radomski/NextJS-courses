import React from "react";
import { NextRouter, useRouter } from "next/router";
import { getSession } from "next-auth/react";

import AuthForm from "../components/auth/auth-form";

function AuthPage(): JSX.Element {
  const router: NextRouter = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
