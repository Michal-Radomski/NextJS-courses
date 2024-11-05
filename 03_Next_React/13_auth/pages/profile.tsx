import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

import UserProfile from "../components/profile/user-profile";

function ProfilePage(): JSX.Element {
  return <UserProfile />;
}

export async function getServerSideProps(context: { req: NextApiRequest }): Promise<any> {
  const session = (await getSession({ req: context.req })) as Session;

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
