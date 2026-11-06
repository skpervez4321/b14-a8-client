"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import PageHeading from "@/components/PageHeading";
import EventForm from "@/components/EventForm";
import EmptyState from "@/components/EmptyState";

export default function UpdateEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api(`/events/${id}`).then(setEvent).catch((e) => setError(e.message));
  }, [id]);

  async function handleUpdate(data) {
    await api(`/events/${id}`, { method: "PUT", body: data, auth: true });
    toast.success("Event updated.");
    router.push("/manage-events");
  }

  if (error) return <EmptyState title="We could not open this event" text={error} href="/manage-events" action="Back to my events" />;
  if (!event || !session) return <div className="skeleton mx-auto h-96 max-w-3xl" />;
  if (event.createdBy !== session.user.email.toLowerCase())
    return <EmptyState title="This is not your event" text="Only the host can update an event." href="/manage-events" action="Back to my events" />;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeading title="Update event">Change what people see on the event page.</PageHeading>
      <EventForm initial={event} submitLabel="Save changes" busyLabel="Saving..." onSubmit={handleUpdate} />
    </div>
  );
}
