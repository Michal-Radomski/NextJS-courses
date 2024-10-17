interface Post {
  likes?: number;
  isLiked?: boolean;
  userId: string | number;
  imageUrl: string;
  image?: string | File;
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
