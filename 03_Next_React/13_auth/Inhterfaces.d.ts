type Auth = {
  email?: string;
  password?: string;
  message: string;
};

interface Password {
  oldPassword: string;
  newPassword: string;
}
