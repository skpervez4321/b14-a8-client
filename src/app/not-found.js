import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="ring-pair mx-auto mb-8 w-40" aria-hidden="true" />
      <h1 className="text-4xl">This page could not be found</h1>
      <p className="mt-3 text-base-content/80">The link may be old, or the event may have been deleted by its host.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn btn-primary">Go to Home</Link>
        <Link href="/events" className="btn btn-outline">Browse events</Link>
      </div>
    </div>
  );
}
