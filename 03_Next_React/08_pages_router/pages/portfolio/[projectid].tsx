import { NextRouter, useRouter } from "next/router";

function PortfolioProjectPage(): JSX.Element {
  const router: NextRouter = useRouter();

  console.log("router.pathname:", router.pathname);
  console.log("router.query:", router.query);

  // send a request to some backend server
  // to fetch the piece of data with an id of router.query.projectId

  return (
    <div>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
}

export default PortfolioProjectPage;
