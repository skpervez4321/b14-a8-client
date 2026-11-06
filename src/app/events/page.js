import PageHeading from "@/components/PageHeading";
import EventsExplorer from "@/components/EventsExplorer";

export const metadata = { title: "Upcoming Events" };

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageHeading title="Upcoming Events">Every event that is still ahead. Pick one, open it and join.</PageHeading>
      <EventsExplorer />
    </div>
  );
}
