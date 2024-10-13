interface Meal {
  id: string | Key;
  creator_email: string;
  instructions: string;
  title: string;
  slug: string;
  image: string | File;
  summary: string;
  creator: string;
}
