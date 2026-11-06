import Link from "next/link";

export default function EmptyState({ title, text, href, action }) {
  return (
    <div className="rounded-box border border-dashed border-base-300 bg-base-200/60 px-6 py-14 text-center">
      <h2 className="text-2xl">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-base-content/80">{text}</p>
      {href && (
        <Link href={href} className="btn btn-primary mt-6">
          {action}
        </Link>
      )}
    </div>
  );
}
