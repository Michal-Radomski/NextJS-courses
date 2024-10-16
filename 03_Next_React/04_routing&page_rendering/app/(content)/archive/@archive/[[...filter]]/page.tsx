import React from "react";
import Link from "next/link";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";

//* V2
async function FilterHeader({ year, month }: { year: number; month: number }): Promise<JSX.Element> {
  const availableYears = (await getAvailableNewsYears()) as number[];
  let links = availableYears as number[];

  if ((year && !availableYears.includes(year)) || (month && !getAvailableNewsMonths(year).includes(month))) {
    throw new Error("Invalid filter.");
  }

  if (year && !month) {
    links = getAvailableNewsMonths(year) as number[];
  }

  if (year && month) {
    links = [];
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link: number) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;

            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({ year, month }: { year: number; month: number }): Promise<JSX.Element> {
  let news;

  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }

  let newsContent: JSX.Element = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  return newsContent;
}

export default async function FilteredNewsPage({ params }: { params: Params }): Promise<JSX.Element> {
  const filter = params.filter;

  const selectedYear = filter?.[0] as number;
  const selectedMonth = filter?.[1] as number;

  return (
    <>
      {/* <React.Suspense fallback={<p>Loading filter...</p>}>
      </React.Suspense> */}
      <React.Suspense fallback={<p>Loading news...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </React.Suspense>
    </>
  );
}

//* V1
// export default async function FilteredNewsPage({ params }: { params: Params }): Promise<JSX.Element> {
//   const filter = params.filter as (string | number)[];
//   // console.log("filter:", filter);

//   const selectedYear = filter?.[0] as number;
//   const selectedMonth = filter?.[1] as number;

//   let news;
//   let links = (await getAvailableNewsYears()) as number[];
//   // console.log({ links });

//   if (selectedYear && !selectedMonth) {
//     news = (await getNewsForYear(selectedYear)) as News[];
//     links = getAvailableNewsMonths(selectedYear) as number[];
//   }

//   if (selectedYear && selectedMonth) {
//     news = (await getNewsForYearAndMonth(selectedYear, selectedMonth)) as News[];
//     links = [];
//   }

//   let newsContent: JSX.Element = <p>No news found for the selected period.</p>;

//   if (news && news.length > 0) {
//     newsContent = <NewsList news={news} />;
//   }

//   if (
//     (selectedYear && !(await getAvailableNewsYears()).includes(selectedYear)) ||
//     (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(selectedMonth))
//   ) {
//     throw new Error("Invalid filter.");
//   }

//   return (
//     <>
//       <header id="archive-header">
//         <nav>
//           <ul>
//             {links.map((link: number) => {
//               const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`;
//               // console.log({ href });

//               return (
//                 <li key={link}>
//                   <Link href={href}>{link}</Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </header>
//       {newsContent}
//     </>
//   );
// }
