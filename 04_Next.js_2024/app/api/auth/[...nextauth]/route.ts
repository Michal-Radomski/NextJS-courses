import NextAuth from "next-auth/next";

import { authOptions } from "@/utils/authOptions";
import { AuthOptions } from "next-auth";

const handler = NextAuth(authOptions as unknown as AuthOptions);

export { handler as GET, handler as POST };
