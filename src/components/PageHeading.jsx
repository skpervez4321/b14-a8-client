export default function PageHeading({ title, children }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl sm:text-4xl">{title}</h1>
      {children && <p className="mt-2 max-w-2xl text-base-content/80">{children}</p>}
    </div>
  );
}
