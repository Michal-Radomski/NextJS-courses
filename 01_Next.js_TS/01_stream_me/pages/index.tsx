import Head from "next/head";
// import { Inter } from "next/font/google";
// import { NextFont } from "next/dist/compiled/@next/font";
import { Container, Typography, Box } from "@material-ui/core";
import Link from "next/link";

// const inter: NextFont = Inter({ subsets: ["latin"] });
// console.log("inter:", inter);

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Next App</title>
        <meta name="description" content="Next App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <main className={""}>
        <Container maxWidth="sm">
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Next.js example
            </Typography>
            <Link href="/about">
              <button>Go to the about page</button>
            </Link>
          </Box>
        </Container>
      </main>
    </>
  );
}
