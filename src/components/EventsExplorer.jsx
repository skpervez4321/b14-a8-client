"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { EVENT_TYPES } from "@/lib/constants";
import EventCard from "@/components/EventCard";
import EventCardSkeleton from "@/components/EventCardSkeleton";
import EmptyState from "@/components/EmptyState";

export default function EventsExplorer() {
  const [result, setResult] = useState({ key: null, events: null, error: "" });
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [term, setTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setTerm(search.trim()), 350);
    return () => clearTimeout(timer);
  }, [search]);

  const key = `${type}|${term}`;

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (term) params.set("search", term);
    api(`/events?${params}`)
      .then((data) => !cancelled && setResult({ key, events: data, error: "" }))
      .catch((e) => !cancelled && setResult({ key, events: null, error: e.message }));
    return () => {
      cancelled = true;
    };
  }, [type, term, key]);

  // Still waiting while the answer on screen belongs to an older filter.
  const loading = result.key !== key;
  const events = loading ? null : result.events;
  const error = loading ? "" : result.error;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by event type">
          {["", ...EVENT_TYPES].map((item) => (
            <button key={item || "all"} type="button" onClick={() => setType(item)} aria-pressed={type === item} className={`btn btn-sm ${type === item ? "btn-primary" : "btn-outline"}`}>
              {item || "All types"}
            </button>
          ))}
        </div>
        <label className="input input-bordered flex w-full items-center gap-2 lg:max-w-xs">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.500-3.500" /></svg>
          <span className="sr-only">Search events</span>
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or place" className="grow" />
        </label>
      </div>

      {error ? (
        <EmptyState title="We could not load the events" text={error} />
      ) : events === null ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => <EventCardSkeleton key={i} />)}
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          title="No upcoming events match"
          text={type || term ? "Try another type or a different search." : "Nobody has planned an event yet. Be the first to host one."}
          href="/create-event"
          action="Create an event"
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => <EventCard key={event._id} event={event} />)}
        </div>
      )}
    </div>
  );
}
