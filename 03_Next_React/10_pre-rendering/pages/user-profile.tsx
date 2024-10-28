import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

function UserProfilePage(props: { username: string }): JSX.Element {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

export async function getServerSideProps(context: { params: Params; req: Request; res: Response }): Promise<{
  props: {
    username: string;
  };
}> {
  const { params, req, res } = context;
  console.log({ params, req, res });

  return {
    props: {
      username: "Max",
    },
  };
}
