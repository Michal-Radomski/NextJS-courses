import React from "react";
import useSWR from "swr";

const url: string = "https://nextjs-course-c81cc-default-rtdb.firebaseio.com/sales.json";

function LastSalesPage(props: { sales: Sale[] }): JSX.Element {
  const [sales, setSales] = React.useState<Sale[]>(props.sales);
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { data, error }: { data: Sale[]; error: Error | undefined } = useSWR(url, (url: string) =>
    fetch(url).then((res: Response) => res.json())
  );

  //* V2: useSWR hook
  React.useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales?.push({
          id: key,
          username: data?.[key]?.username,
          volume: data?.[key]?.volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  //* V1: Most basic way!
  // React.useEffect(() => {
  //   setIsLoading(true);
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map(
        (sale: Sale): JSX.Element => (
          <li key={sale?.id}>
            {sale?.username} - ${sale?.volume}
          </li>
        )
      )}
    </ul>
  );
}

export async function getStaticProps(): Promise<{ props: { sales: Sale[] }; revalidate?: number }> {
  const response: Response = await fetch(url);
  const data: Sale[] = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales?.push({
      id: key,
      username: data?.[key]?.username,
      volume: data?.[key]?.volume,
    });
  }

  return { props: { sales: transformedSales }, revalidate: 10 };
}

export default LastSalesPage;
