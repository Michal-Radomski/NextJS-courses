interface Post {
  content?: string;
  slug?: string;
  isFeatured?: boolean;
  date?: Date | string;
  title: string;
  image: image | File;
  excerpt?: string;
}

type Status = "success" | "error" | "pending";

interface NotificationI {
  title: string;
  message: string;
  status: Status;
}

interface Contact {
  email: string;
  name: string;
  message: string;
  id?: ObjectId;
}
