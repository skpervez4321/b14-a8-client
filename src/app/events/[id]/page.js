import Link from "next/link";
import { notFound } from "next/navigation";
import { API_URL } from "@/lib/constants";
import { formatDate, formatTime, isPast } from "@/lib/format";
import JoinButton from "@/components/JoinButton";
import Avatar from "@/components/Avatar";
import SafeImage from "@/components/SafeImage";
import EmptyState from "@/components/EmptyState";

export const dynamic = "force-dynamic";

async function getEvent(id) {
  let res;
  try {
    res = await fetch(`${API_URL}/events/${id}`, { cache: "no-store" });
  } catch {
    return { error: true };
  }
  if (res.status === 404) return { missing: true };
  if (!res.ok) return { error: true };
  return { event: await res.json() };
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { event } = await getEvent(id);
  return { title: event?.title ?? "Event" };
}

export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  const { event, missing, error } = await getEvent(id);
  if (missing) notFound();
  if (error || !event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState title="We could not load this event" text="The server did not answer. Refresh in a moment." href="/events" action="Back to events" />
      </div>
    );
  }

  const ended = isPast(event.eventDate);

  return (
    <article className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/events" className="link link-hover text-primary">Back to all events</Link>
      <div className="mt-4 overflow-hidden rounded-box border border-base-300 bg-base-200">
        <SafeImage src={event.thumbnail} alt={event.title} className="aspect-[16/8] w-full object-cover" />
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <div>
          <span className="badge badge-primary font-semibold">{event.eventType}</span>
          <h1 className="mt-3 text-3xl sm:text-5xl">{event.title}</h1>
          <p className="mt-6 whitespace-pre-line text-lg text-base-content/90">{event.description}</p>
        </div>

        <aside className="h-fit space-y-5 rounded-box border border-base-300 bg-base-100 p-6">
          <dl className="space-y-4">
            <div>
              <dt className="font-bold text-primary">When</dt>
              <dd>{formatDate(event.eventDate)} at {formatTime(event.eventDate)}</dd>
            </div>
            <div>
              <dt className="font-bold text-primary">Where</dt>
              <dd>{event.location}</dd>
            </div>
            <div>
              <dt className="font-bold text-primary">People joined</dt>
              <dd>{event.joinedCount}</dd>
            </div>
            <div>
              <dt className="font-bold text-primary">Hosted by</dt>
              <dd className="mt-1 flex items-center gap-3">
                <Avatar name={event.creatorName || event.createdBy} image={event.creatorImage} size={36} />
                <span>{event.creatorName || event.createdBy}</span>
              </dd>
            </div>
          </dl>
          <JoinButton eventId={event._id} ended={ended} />
        </aside>
      </div>
    </article>
  );
}
