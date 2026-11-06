"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import PageHeading from "@/components/PageHeading";
import FormField from "@/components/FormField";
import Avatar from "@/components/Avatar";

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const user = session?.user;

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const image = String(form.get("image")).trim();

    const next = {};
    if (name.length < 2) next.name = "Enter your name (at least 2 letters).";
    if (image && !isHttpUrl(image)) next.image = "Photo link must start with http:// or https://";
    setErrors(next);
    if (Object.keys(next).length) return toast.error(Object.values(next)[0]);

    setBusy(true);
    const { error } = await authClient.updateUser({ name, image: image || null });
    setBusy(false);
    if (error) return toast.error(error.message || "Could not update your profile.");
    toast.success("Profile updated.");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeading title="My profile">Your name and picture appear on the events you host and join.</PageHeading>
      {isPending || !user ? (
        <div className="skeleton h-80 w-full" />
      ) : (
        <div className="rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-4">
            <Avatar name={user.name} image={user.image} size={72} />
            <div>
              <p className="text-2xl font-bold">{user.name}</p>
              <p className="text-base-content/80">{user.email}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <FormField label="Full name" htmlFor="name" error={errors.name}>
              <input id="name" name="name" defaultValue={user.name} className="input input-bordered w-full" />
            </FormField>
            <FormField label="Photo link" htmlFor="image" error={errors.image} hint="Leave empty to show your initial instead.">
              <input id="image" name="image" type="url" defaultValue={user.image ?? ""} className="input input-bordered w-full" placeholder="https://..." />
            </FormField>
            <FormField label="Email" htmlFor="email" hint="Your email cannot be changed here.">
              <input id="email" value={user.email} readOnly className="input input-bordered w-full opacity-70" />
            </FormField>
            <button type="submit" disabled={busy} className="btn btn-primary">{busy ? "Saving..." : "Save changes"}</button>
          </form>
        </div>
      )}
    </div>
  );
}
