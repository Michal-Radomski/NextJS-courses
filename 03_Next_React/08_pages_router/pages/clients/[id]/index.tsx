import { NextRouter, useRouter } from "next/router";

function ClientProjectsPage(): JSX.Element {
  const router: NextRouter = useRouter();

  console.log("router.query:", router.query);

  function loadProjectHandler(): void {
    // load data...
    // router.replace -> can't go back!
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "max", clientprojectid: "projecta" },
    });
  }

  return (
    <div>
      <h1>The Projects of a Given Client</h1>
      <button onClick={loadProjectHandler} className="btn btn-primary">
        Load Project A
      </button>
    </div>
  );
}

export default ClientProjectsPage;
