interface Post {
  userId: string | number;
  imageUrl: string;
  image?: string;
  userFirstName?: string;
  createdAt?: string;
  id?: number;
  title: string;
  content: string;
  user_id?: number;
}

interface User {
  id: number;
  first_name: string;
  userFirstName: string;
  last_name: string;
  userLastName: string;
  email: string;
}
