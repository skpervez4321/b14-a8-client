"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import AuthFormShell from "@/components/AuthFormShell";
import FormField from "@/components/FormField";
import GithubButton from "@/components/GithubButton";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (params.get("reason") === "private") toast.error("Please log in to open that page.", { id: "private" });
  }, [params]);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    const next = {};
    if (!emailPattern.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length) return toast.error("Please fix the highlighted fields.");

    setBusy(true);
    const { error } = await authClient.signIn.email({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message || "Login failed. Check your email and password.");

    clearToken();
    toast.success("Welcome back! You are logged in.");
    router.push("/");
    router.refresh();
  }

  return (
    <AuthFormShell
      title="Log in"
      subtitle="Pick up where you left off."
      footer={
        <>
          New here? <Link href="/register" className="link link-primary font-semibold">Create an account</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField label="Email" htmlFor="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" className="input input-bordered w-full" placeholder="you@example.com" />
        </FormField>
        <FormField label="Password" htmlFor="password" error={errors.password}>
          <input id="password" name="password" type="password" autoComplete="current-password" className="input input-bordered w-full" placeholder="Your password" />
        </FormField>
        <button type="submit" disabled={busy} className="btn btn-primary w-full">
          {busy ? "Logging in..." : "Log in"}
        </button>
      </form>
      <div className="divider my-5">or</div>
      <GithubButton label="Continue with GitHub" />
    </AuthFormShell>
  );
}
