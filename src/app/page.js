import Link from "next/link";
import { API_URL, SITE_NAME } from "@/lib/constants";
import EventCard from "@/components/EventCard";
import EmptyState from "@/components/EmptyState";
import Newsletter from "@/components/Newsletter";

export const dynamic = "force-dynamic";

async function getRecentEvents() {
  try {
    const res = await fetch(`${API_URL}/events?limit=6`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

const features = [
  { title: "Host in minutes", text: "Fill one short form with the place, the time and a picture. Your event is public the moment you save it." },
  { title: "Join with one click", text: "Open any event, press Join, and it is saved to your own list. No phone calls, no group chats to chase." },
  { title: "Only what is still ahead", text: "Events that have already happened never clutter the list, so everything you see is something you can still attend." },
  { title: "Your events in one place", text: "Update or delete the events you host, and see every event you joined, soonest first." },
];

const gallery = [
  { src: "tree", caption: "Tree plantation day", span: "col-span-2 sm:row-span-2" },
  { src: "food", caption: "Hot meals for everyone" },
  { src: "clothes", caption: "Winter clothes drive" },
  { src: "clean", caption: "Neighbourhood clean-up" },
  { src: "blood", caption: "Blood donation camp" },
  { src: "books", caption: "Book corner for kids", span: "col-span-2 sm:col-span-4" },
];

export default async function HomePage() {
  const events = await getRecentEvents();

  return (
    <>
      <section className="overflow-hidden bg-base-200">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[1.25fr_1fr] md:py-24">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl">Small acts, shared by many hands.</h1>
            <p className="mt-5 max-w-xl text-lg text-base-content/85">
              {SITE_NAME} is where neighbours plan clean-ups, food drives and tree plantings, and where anyone can walk in and help.
            </p>
            <p lang="bn" className="mt-2 text-lg font-semibold text-primary">একসাথে কাজ করলে পাড়াটাই বদলে যায়।</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/events" className="btn btn-primary btn-lg">Find an event</Link>
              <Link href="/create-event" className="btn btn-outline btn-secondary btn-lg">Host an event</Link>
            </div>
          </div>
          <div className="ring-pair w-full max-w-md justify-self-center" aria-hidden="true" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="text-3xl sm:text-4xl">What you can do here</h2>
            <p className="mt-3 text-base-content/80">Four simple things, built for people who would rather be outside helping than filling in forms.</p>
          </div>
          <ul className="divide-y divide-base-300 border-y border-base-300">
            {features.map((feature) => (
              <li key={feature.title} className="py-5">
                <h3 className="text-xl text-primary">{feature.title}</h3>
                <p className="mt-1 text-base-content/85">{feature.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl sm:text-4xl">Coming up soon</h2>
            <p className="mt-2 text-base-content/80">The next six events, closest date first.</p>
          </div>
          <Link href="/events" className="btn btn-ghost text-primary">See all upcoming events</Link>
        </div>
        {events === null ? (
          <EmptyState title="We could not load the events" text="The server did not answer. Check that the server is running and NEXT_PUBLIC_API_URL is correct, then refresh." />
        ) : events.length === 0 ? (
          <EmptyState title="No upcoming events yet" text="Be the first neighbour to plan something. It takes about a minute." href="/create-event" action="Create an event" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => <EventCard key={event._id} event={event} />)}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <h2 className="text-3xl sm:text-4xl">Ideas for your next event</h2>
        <p className="mt-2 mb-8 text-base-content/80">A few of the things people in a neighbourhood can organise together.</p>
        <div className="grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-4">
          {gallery.map((item) => (
            <figure key={item.src} className={`relative overflow-hidden rounded-box ${item.span ?? ""}`}>
              <img src={`/gallery/${item.src}.svg`} alt={item.caption} className="h-full w-full object-cover" loading="lazy" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-neutral/80 px-3 py-2 text-sm font-semibold text-neutral-content">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
