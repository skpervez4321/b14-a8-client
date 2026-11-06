import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Every page inside (private) needs a logged-in user.
// The check runs on the server, so reloading a page never throws a logged-in person out.
export default async function PrivateLayout({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login?reason=private");
  return <div className="mx-auto max-w-6xl px-4 py-12">{children}</div>;
}
