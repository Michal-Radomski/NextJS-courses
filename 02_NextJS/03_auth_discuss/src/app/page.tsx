import React from "react";
import { Button } from "@nextui-org/react";

import { auth } from "@/auth";
import * as actions from "@/actions";
import Profile from "@/components/profile";

export default async function Home(): Promise<JSX.Element> {
  const session = await auth();

  return (
    <React.Fragment>
      <div>
        <form action={actions.signIn}>
          <Button type="submit" color="primary">
            Sign In
          </Button>
        </form>

        <form action={actions.signOut}>
          <Button type="submit" color="secondary">
            Sign Out
          </Button>
        </form>

        {session?.user ? <div>{JSON.stringify(session.user)}</div> : <div>Signed Out</div>}

        <Profile />
      </div>
    </React.Fragment>
  );
}
