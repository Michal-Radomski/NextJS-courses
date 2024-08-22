import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import Link from "next/link";

export default function About(): JSX.Element {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/">
          <button>Go to the index page</button>
        </Link>
      </Box>
    </Container>
  );
}
