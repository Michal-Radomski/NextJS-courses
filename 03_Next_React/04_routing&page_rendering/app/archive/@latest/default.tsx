import NewsList from "@/components/news-list";
import { getLatestNews } from "@/lib/news";

export default function LatestNewsPage(): JSX.Element {
  const latestNews = getLatestNews() as News[];

  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latestNews} />
    </>
  );
}
