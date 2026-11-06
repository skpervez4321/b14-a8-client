"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import PageHeading from "@/components/PageHeading";
import EventForm from "@/components/EventForm";

export default function CreateEventPage() {
  const router = useRouter();

  async function handleCreate(data) {
    await api("/events", { method: "POST", body: data, auth: true });
    toast.success("Event created. It is now public.");
    router.push("/events");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeading title="Create an event">Tell people what you are planning. Only future dates are accepted.</PageHeading>
      <EventForm submitLabel="Create event" busyLabel="Creating..." onSubmit={handleCreate} />
    </div>
  );
}
