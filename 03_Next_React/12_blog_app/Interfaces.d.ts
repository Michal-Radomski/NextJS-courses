interface Post {
  content?: string;
  slug?: string;
  isFeatured?: boolean;
  date?: Date | string;
  title: string;
  image: image | File;
  excerpt?: string;
}

interface Notification {
  title: string;
  message: string;
  status: "success" | "error" | "pending";
}
