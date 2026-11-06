"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { formatDate, formatTime, isPast } from "@/lib/format";
import PageHeading from "@/components/PageHeading";
import EmptyState from "@/components/EmptyState";

export default function ManageEventsPage() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState("");
  const [target, setTarget] = useState(null);
  const [busy, setBusy] = useState(false);
  const dialog = useRef(null);

  useEffect(() => {
    api("/my-events", { auth: true }).then(setEvents).catch((e) => setError(e.message));
  }, []);

  function askDelete(event) {
    setTarget(event);
    dialog.current?.showModal();
  }

  async function confirmDelete() {
    setBusy(true);
    try {
      await api(`/events/${target._id}`, { method: "DELETE", auth: true });
      setEvents((list) => list.filter((item) => item._id !== target._id));
      toast.success("Event deleted.");
      dialog.current?.close();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeading title="Manage events">The events you host. Update the details or delete an event.</PageHeading>

      {error ? (
        <EmptyState title="We could not load your events" text={error} />
      ) : events === null ? (
        <div className="space-y-3">{[0, 1, 2].map((i) => <div key={i} className="skeleton h-20 w-full" />)}</div>
      ) : events.length === 0 ? (
        <EmptyState title="You have not hosted any events" text="Create your first event and it will show up here." href="/create-event" action="Create an event" />
      ) : (
        <ul className="space-y-3">
          {events.map((event) => (
            <li key={event._id} className="flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-4 sm:flex-row sm:items-center">
              <img src={event.thumbnail} alt="" className="aspect-[16/10] w-full rounded-xl object-cover sm:w-40" onError={(e) => (e.currentTarget.src = "/placeholder.svg")} />
              <div className="min-w-0 flex-1">
                <h2 className="line-clamp-1 text-xl">{event.title}</h2>
                <p className="text-base-content/80">{formatDate(event.eventDate)}, {formatTime(event.eventDate)} &middot; {event.location}</p>
                {isPast(event.eventDate) && <span className="badge badge-neutral mt-1">Ended</span>}
              </div>
              <div className="flex gap-2">
                <Link href={`/manage-events/${event._id}`} className="btn btn-primary btn-sm sm:btn-md">Update</Link>
                <button type="button" onClick={() => askDelete(event)} className="btn btn-outline btn-secondary btn-sm sm:btn-md">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <dialog ref={dialog} className="modal">
        <div className="modal-box">
          <h2 className="text-2xl">Delete this event?</h2>
          <p className="py-3">&ldquo;{target?.title}&rdquo; will be removed for everyone, including people who joined. This cannot be undone.</p>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Keep event</button></form>
            <button type="button" onClick={confirmDelete} disabled={busy} className="btn btn-secondary">{busy ? "Deleting..." : "Delete event"}</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"><button aria-label="Close">close</button></form>
      </dialog>
    </div>
  );
}
