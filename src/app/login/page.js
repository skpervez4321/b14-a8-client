import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="skeleton mx-auto my-20 h-96 max-w-md" />}>
      <LoginForm />
    </Suspense>
  );
}
