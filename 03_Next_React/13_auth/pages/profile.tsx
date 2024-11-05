import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

import UserProfile from "../components/profile/user-profile";

function ProfilePage(): JSX.Element {
  return <UserProfile />;
}

export async function getServerSideProps(context: { req: NextApiRequest }): Promise<any> {
  // console.log("context:", context);
  const session = (await getSession({ req: context.req })) as Session;
  // console.log("session:", session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
