import Link from "next/link";

export default function NewsList({ news }: { news: News[] }): JSX.Element {
  return (
    <ul className="news-list">
      {news.map((newsItem: News) => (
        <li key={newsItem.id}>
          <Link href={`/news/${newsItem.slug}`}>
            <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
            <span>{newsItem.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
