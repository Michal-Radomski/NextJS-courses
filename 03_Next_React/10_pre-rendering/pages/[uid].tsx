import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

function UserIdPage(props: { id: string }): JSX.Element {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

export async function getServerSideProps(context: { params: Params }): Promise<{
  props: {
    id: string;
  };
}> {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
