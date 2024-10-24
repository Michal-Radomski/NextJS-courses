import AuthForm from "@/components/auth-form";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function Home({ searchParams }: { searchParams: Params }): Promise<JSX.Element> {
  const formMode = (searchParams.mode as string) || "login";
  return <AuthForm mode={formMode} />;
}
