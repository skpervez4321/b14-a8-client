export default function EventCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100" aria-hidden="true">
      <div className="skeleton aspect-[16/10] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="skeleton h-6 w-4/5" />
        <div className="skeleton h-4 w-3/5" />
        <div className="skeleton h-4 w-2/5" />
        <div className="skeleton mt-auto h-12 w-full" />
      </div>
    </div>
  );
}
