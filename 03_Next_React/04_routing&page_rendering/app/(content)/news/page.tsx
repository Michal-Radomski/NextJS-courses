//* V2
// import { DUMMY_NEWS } from "@/dummy-news";
import NewsList from "@/components/news-list";

export default async function NewsPage(): Promise<JSX.Element> {
  const response: Response = await fetch("http://localhost:8080/news");

  if (!response.ok) {
    throw new Error("Failed tho fetch news.");
  }

  const news = (await response.json()) as News[];

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}

//* V1
// "use client";

// import React from "react";

// // import { DUMMY_NEWS } from "@/dummy-news";
// import NewsList from "@/components/news-list";

// export default function NewsPage(): JSX.Element {
//   const [isLoading, setIsLoading] = React.useState<boolean>(false);
//   const [error, setError] = React.useState<string>("");
//   const [news, setNews] = React.useState<News[]>([]);

//   React.useEffect(() => {
//     async function fetchNews(): Promise<void> {
//       setIsLoading(true);
//       const response: Response = await fetch("http://localhost:8080/news");

//       if (!response.ok) {
//         setError("Failed to fetch news.");
//         setIsLoading(false);
//       }

//       const news = (await response.json()) as News[];
//       setIsLoading(false);
//       setNews(news);
//     }

//     fetchNews();
//   }, []);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   let newsContent;

//   if (news?.length) {
//     newsContent = <NewsList news={news} />;
//   }

//   return (
//     <>
//       <h1>News Page</h1>
//       {newsContent}
//     </>
//   );
// }
