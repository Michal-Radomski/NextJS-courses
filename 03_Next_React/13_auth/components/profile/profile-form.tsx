import React from "react";

import classes from "./profile-form.module.scss";

function ProfileForm({ onChangePassword }: { onChangePassword: (arg0: Password) => void }): JSX.Element {
  const oldPasswordRef: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);
  const newPasswordRef: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);

  function submitHandler(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current?.value as string;
    const enteredNewPassword = newPasswordRef.current?.value as string;

    // optional: Add validation

    onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
