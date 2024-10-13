interface Meal {
  id: string | Key;
  creator_email: string;
  instructions: string;
  title: string;
  slug: string;
  image: string | any; // Temp
  summary: string;
  creator: string;
}
