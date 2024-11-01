interface Post {
  slug: string;
  isFeatured: boolean;
  date: Date | string;
  title: string;
  image: image | File;
  excerpt: string;
}
