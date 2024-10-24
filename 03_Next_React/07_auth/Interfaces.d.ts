interface Training {
  description: string;
  title: string;
  image: File | string;
  id: string | number;
}

interface Errors {
  email: string;
  password: string;
}

interface CustomError extends Error {
  code: string;
}

interface UserI {
  email: string;
  password: string;
  id: string | number;
}
