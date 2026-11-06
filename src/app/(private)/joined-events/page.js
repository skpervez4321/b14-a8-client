"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import PageHeading from "@/components/PageHeading";
import EventCard from "@/components/EventCard";
import EventCardSkeleton from "@/components/EventCardSkeleton";
import EmptyState from "@/components/EmptyState";

export default function JoinedEventsPage() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/my-joined", { auth: true }).then(setEvents).catch((e) => setError(e.message));
  }, []);

  return (
    <div>
      <PageHeading title="Joined events">The events you signed up for, soonest first.</PageHeading>
      {error ? (
        <EmptyState title="We could not load your events" text={error} />
      ) : events === null ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <EventCardSkeleton key={i} />)}</div>
      ) : events.length === 0 ? (
        <EmptyState title="You have not joined any event yet" text="Open an upcoming event and press Join. It will appear here." href="/events" action="Browse events" />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => <EventCard key={event._id} event={event} />)}
        </div>
      )}
    </div>
  );
}
