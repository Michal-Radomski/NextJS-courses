import path from "path";
import fs from "fs/promises";

import { Fragment } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

function ProductDetailPage(props: { loadedProduct: Product }): JSX.Element {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData(): Promise<{ products: Product[] }> {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData: Buffer = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString()) as { products: Product[] };

  return data;
}

export async function getStaticProps(context: { params: Params }): Promise<any> {
  const { params } = context;

  const productId: string = params.pid;

  const data = (await getData()) as { products: Product[] };
  const product = data.products.find((product: Product) => product.id === productId) as Product;

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths(): Promise<any> {
  const data = (await getData()) as { products: Product[] };

  const ids: string[] = data.products.map((product: Product) => product.id);
  const pathsWithParams: { params: { pid: string } }[] = ids.map((id: string) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true, //* Can be: "blocking" or false
  };
}

export default ProductDetailPage;
