import path from "path";
import fs from "fs/promises";

import Link from "next/link";

function HomePage(props: { products: Product[] }): JSX.Element {
  const { products }: { products: Product[] } = props;

  return (
    <ul>
      {products.map(
        (product: Product): JSX.Element => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        )
      )}
    </ul>
  );
}

//* Never visible on client-side - can use credentials etc!
export const getStaticProps = async (_context: object): Promise<any> => {
  // console.log("_context:", _context);
  // console.log("(Re-)Generating...");
  // console.log("process:", process);

  const filePath: string = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData: Buffer = await fs.readFile(filePath);
  // console.log("jsonData:", jsonData);

  const data = JSON.parse(jsonData.toString());
  // console.log("data:", data);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, //* Every 10s regenerate page
  };
};

export default HomePage;
