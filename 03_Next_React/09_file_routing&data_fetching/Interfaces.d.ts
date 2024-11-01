interface EventI {
  id: string;
  title: string;
  description?: string;
  location: string;
  date: string;
  image: string;
  isFeatured?: boolean;
}

// Fix this interfaces?
interface CommentI {
  email: string;
  text?: string;
  name?: string;
  _id?: Key | string;
  id?: string;
}

interface Notification {
  title: string;
  message: string;
  // status: string;
  status: "success" | "error" | "pending";
}

interface NotificationContextI {
  notification: Notification | null;
  showNotification: (notificationData: Notification) => void;
  hideNotification: () => void;
}
