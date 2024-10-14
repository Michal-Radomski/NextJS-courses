import { notFound } from "next/navigation";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { DUMMY_NEWS } from "@/dummy-news";

export default function InterceptedImagePage({ params }: { params: Params }): JSX.Element {
  const newsItemSlug = params.slug as string;
  const newsItem = DUMMY_NEWS.find((newsItem: News) => newsItem.slug === newsItemSlug) as News;

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <div className="modal-backdrop" />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
