"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import AuthFormShell from "@/components/AuthFormShell";
import FormField from "@/components/FormField";
import GithubButton from "@/components/GithubButton";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function passwordProblem(password) {
  if (password.length < 6) return "Password needs at least 6 characters.";
  if (!/[A-Z]/.test(password)) return "Password needs at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password needs at least one lowercase letter.";
  return "";
}

export default function RegisterForm() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const photoURL = String(form.get("photoURL")).trim();
    const password = String(form.get("password"));

    const next = {};
    if (name.length < 2) next.name = "Enter your name (at least 2 letters).";
    if (!emailPattern.test(email)) next.email = "Enter a valid email address.";
    if (photoURL && !isHttpUrl(photoURL)) next.photoURL = "Photo link must start with http:// or https://";
    const problem = passwordProblem(password);
    if (problem) next.password = problem;
    setErrors(next);
    if (Object.keys(next).length) return toast.error(Object.values(next)[0]);

    setBusy(true);
    const { error } = await authClient.signUp.email({ name, email, password, image: photoURL || undefined });
    setBusy(false);
    if (error) return toast.error(error.message || "Could not create your account.");

    clearToken();
    toast.success("Account created. Welcome to the community!");
    router.push("/");
    router.refresh();
  }

  return (
    <AuthFormShell
      title="Create your account"
      subtitle="It takes less than a minute."
      footer={
        <>
          Already have an account? <Link href="/login" className="link link-primary font-semibold">Log in</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField label="Full name" htmlFor="name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" className="input input-bordered w-full" placeholder="Rahim Uddin" />
        </FormField>
        <FormField label="Email" htmlFor="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" className="input input-bordered w-full" placeholder="you@example.com" />
        </FormField>
        <FormField label="Photo link" htmlFor="photoURL" error={errors.photoURL} hint="Optional. Paste a link to your profile picture.">
          <input id="photoURL" name="photoURL" type="url" className="input input-bordered w-full" placeholder="https://..." />
        </FormField>
        <FormField label="Password" htmlFor="password" error={errors.password} hint="At least 6 characters with one uppercase and one lowercase letter.">
          <input id="password" name="password" type="password" autoComplete="new-password" className="input input-bordered w-full" placeholder="Create a password" />
        </FormField>
        <button type="submit" disabled={busy} className="btn btn-primary w-full">
          {busy ? "Creating account..." : "Create account"}
        </button>
      </form>
      <div className="divider my-5">or</div>
      <GithubButton label="Sign up with GitHub" />
    </AuthFormShell>
  );
}
