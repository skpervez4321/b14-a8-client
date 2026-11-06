import Logo from "@/components/Logo";

export default function AuthFormShell({ title, subtitle, children, footer }) {
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
      <div className="hidden md:block">
        <div className="ring-pair mx-auto w-full max-w-sm" aria-hidden="true" />
      </div>
      <div className="rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <Logo size={36} />
          <div>
            <h1 className="text-2xl sm:text-3xl">{title}</h1>
            <p className="text-base-content/80">{subtitle}</p>
          </div>
        </div>
        {children}
        <p className="mt-6 text-center">{footer}</p>
      </div>
    </div>
  );
}
