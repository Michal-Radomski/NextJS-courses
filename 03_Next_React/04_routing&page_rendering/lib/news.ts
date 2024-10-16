import sql, { Database } from "better-sqlite3";

// import { DUMMY_NEWS } from "@/dummy-news";

const db = sql("data.db") as Database;

export async function getAllNews(): Promise<News[]> {
  const news = db.prepare("SELECT * FROM news").all() as News[];
  await new Promise((resolve: (value: null) => void) => setTimeout(resolve, 2000));
  return news;
}

export async function getNewsItem(slug: string): Promise<News> {
  const newsItem = db.prepare("SELECT * FROM news WHERE slug = ?").get(slug) as News;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return newsItem;
}

export async function getLatestNews(): Promise<News[]> {
  const latestNews = db.prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3").all() as News[];
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return latestNews;
}

export async function getAvailableNewsYears(): Promise<number[]> {
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all()
    .map((year: any) => year.year) as number[];

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return years;
}

export function getAvailableNewsMonths(year: number): number[] {
  return db
    .prepare("SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?")
    .all(year)
    .map((month: any) => month.month);
}

export async function getNewsForYear(year: number): Promise<News[]> {
  const news = db.prepare("SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC").all(year) as News[];

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}

export async function getNewsForYearAndMonth(year: number, month: number): Promise<News[]> {
  const news = db
    .prepare("SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC")
    .all(year, month) as News[];

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}

// export function getAllNews(): News[] {
//   return DUMMY_NEWS;
// }

// export function getLatestNews(): News[] {
//   return DUMMY_NEWS.slice(0, 3);
// }

// export function getAvailableNewsYears(): number[] {
//   return DUMMY_NEWS.reduce((years: number[], news) => {
//     const year = new Date(news.date).getFullYear();
//     if (!years.includes(year)) {
//       years.push(year);
//     }
//     return years;
//   }, []).sort((a, b) => b - a);
// }

// export function getAvailableNewsMonths(year: number): number[] {
//   return DUMMY_NEWS.reduce((months: number[], news) => {
//     const newsYear = new Date(news.date).getFullYear();
//     if (newsYear === +year) {
//       const month = new Date(news.date).getMonth();
//       if (!months.includes(month)) {
//         months.push(month + 1);
//       }
//     }
//     return months;
//   }, []).sort((a, b) => a - b);
// }

// export function getNewsForYear(year: number | string): News[] {
//   return DUMMY_NEWS.filter((news) => new Date(news.date).getFullYear() === +year);
// }

// export function getNewsForYearAndMonth(year: number, month: number): News[] {
//   return DUMMY_NEWS.filter((news) => {
//     const newsYear = new Date(news.date).getFullYear();
//     const newsMonth = new Date(news.date).getMonth() + 1;
//     return newsYear === +year && newsMonth === +month;
//   });
// }
