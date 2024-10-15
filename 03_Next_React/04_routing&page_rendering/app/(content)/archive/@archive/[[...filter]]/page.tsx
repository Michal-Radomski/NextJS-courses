import Link from "next/link";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";

export default function FilteredNewsPage({ params }: { params: Params }): JSX.Element {
  const filter = params.filter as (string | number)[];
  // console.log("filter:", filter);

  const selectedYear = filter?.[0] as number;
  const selectedMonth = filter?.[1] as number;

  let news;
  let links = getAvailableNewsYears() as number[];
  // console.log({ links });

  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear) as News[];
    links = getAvailableNewsMonths(selectedYear) as number[];
  }

  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  let newsContent: JSX.Element = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  if (
    (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
    (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))
  ) {
    throw new Error("Invalid filter.");
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link: number) => {
              const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`;
              // console.log({ href });

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}
