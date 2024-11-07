import React from "react";
import { NextRouter, useRouter } from "next/router";

const NewsId = (): JSX.Element => {
  const router: NextRouter = useRouter();

  console.log("router?.query?.newsId:", router?.query?.newsId);

  return (
    <React.Fragment>
      NewsId
      <br />
      {router?.query?.newsId}
    </React.Fragment>
  );
};

export default NewsId;
