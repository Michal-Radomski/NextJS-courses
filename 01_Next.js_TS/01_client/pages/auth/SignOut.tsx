import { useEffect } from "react";

import { useAuth } from "lib/useAuth";

export default function SignOut(): JSX.Element {
  const { signOut } = useAuth();
  useEffect(() => {
    signOut();
  }, []);
  return <div>Signout</div>;
}
