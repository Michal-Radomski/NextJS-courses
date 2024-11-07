import Link from "next/link";
import React from "react";

const NewsPage = (): JSX.Element => {
  return (
    <React.Fragment>
      NewsPage
      <br />
      <button className="btn btn-primary">
        <Link href={"/news/1"}>1</Link>
      </button>
      <button className="btn btn-secondary">
        <Link href={"/news/2"}>2</Link>
      </button>
    </React.Fragment>
  );
};

export default NewsPage;
