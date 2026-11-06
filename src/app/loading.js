import EventCardSkeleton from "@/components/EventCardSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="skeleton mb-8 h-10 w-64" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => <EventCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
