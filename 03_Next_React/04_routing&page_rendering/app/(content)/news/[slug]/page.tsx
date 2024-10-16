import { notFound } from "next/navigation";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";

import { getNewsItem } from "@/lib/news";

// import { DUMMY_NEWS } from "@/dummy-news";

export default async function NewsDetailPage({ params }: { params: Params }): Promise<JSX.Element> {
  const newsSlug = params.slug as string;
  // const newsItem = DUMMY_NEWS.find((newsItem: News) => newsItem.slug === newsSlug) as News;
  const newsItem = (await getNewsItem(newsSlug)) as News;

  if (!newsItem) {
    notFound();
  }

  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
}
