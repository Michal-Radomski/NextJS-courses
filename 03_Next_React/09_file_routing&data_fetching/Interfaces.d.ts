interface EventI {
  id: string;
  title: string;
  description?: string;
  location: string;
  date: string;
  image: string;
  isFeatured?: boolean;
}

interface CommentI {
  email: string;
  text: string;
  name: string;
  _id?: Key | string;
  id?: string;
}
