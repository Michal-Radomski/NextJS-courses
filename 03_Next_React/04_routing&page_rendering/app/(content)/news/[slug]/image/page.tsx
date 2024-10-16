import { notFound } from "next/navigation";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { getNewsItem } from "@/lib/news";

// import { DUMMY_NEWS } from "@/dummy-news";

export default async function ImagePage({ params }: { params: Params }): Promise<JSX.Element> {
  const newsItemSlug = params.slug as string;
  // const newsItem = DUMMY_NEWS.find((newsItem: News) => newsItem.slug === newsItemSlug) as News;
  const newsItem = (await getNewsItem(newsItemSlug)) as News;

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}
