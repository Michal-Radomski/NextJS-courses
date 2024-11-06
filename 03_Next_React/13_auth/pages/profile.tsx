import { GetServerSidePropsContext } from "next";
import { getServerSession, Session } from "next-auth";

import UserProfile from "../components/profile/user-profile";
import { authOptions } from "./api/auth/[...nextauth]";

function ProfilePage(): JSX.Element {
  return <UserProfile />;
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<any> {
  // console.log("context:", context);
  const session = (await getServerSession(context.req, context.res, authOptions)) as Session;
  // console.log("session:", session);

  const sessionDeepCopy = JSON.parse(JSON.stringify(session)) as Session;

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session: sessionDeepCopy },
  };
}

export default ProfilePage;
