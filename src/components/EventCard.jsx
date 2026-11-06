import Link from "next/link";
import { formatDate, formatTime } from "@/lib/format";
import SafeImage from "@/components/SafeImage";

export default function EventCard({ event }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="relative aspect-[16/10] bg-base-200">
        <SafeImage src={event.thumbnail} alt={event.title} className="h-full w-full object-cover" loading="lazy" />
        <span className="badge badge-primary absolute left-3 top-3 font-semibold">{event.eventType}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 min-h-[2.8em] text-xl">{event.title}</h3>
        <dl className="space-y-1 text-sm text-base-content/80">
          <div className="flex gap-2">
            <dt className="sr-only">Location</dt>
            <svg className="mt-0.5 shrink-0 text-secondary" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21Z" /><circle cx="12" cy="9.500" r="2.500" /></svg>
            <dd className="line-clamp-1">{event.location}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="sr-only">Date</dt>
            <svg className="mt-0.5 shrink-0 text-secondary" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>
            <dd>{formatDate(event.eventDate)}, {formatTime(event.eventDate)}</dd>
          </div>
        </dl>
        <Link href={`/events/${event._id}`} className="btn btn-primary mt-auto w-full">
          View Event
        </Link>
      </div>
    </article>
  );
}
