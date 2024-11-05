import React from "react";
// import { getSession } from "next-auth/react";

import ProfileForm from "./profile-form";
import classes from "./user-profile.module.scss";

function UserProfile(): JSX.Element {
  // Redirect away if NOT auth
  // const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // React.useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = "/auth";
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  async function changePasswordHandler(passwordData: Password): Promise<void> {
    const response = (await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    })) as Response;

    const data = await response.json();
    console.log("data:", data);
  }

  return (
    <React.Fragment>
      <section className={classes.profile}>
        <h1>Your User Profile</h1>
        <ProfileForm onChangePassword={changePasswordHandler} />
      </section>
    </React.Fragment>
  );
}

export default UserProfile;
