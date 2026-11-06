"use client";

import toast from "react-hot-toast";

export default function Newsletter() {
  function handleSubmit(e) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email")).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Enter a valid email address.");
    e.currentTarget.reset();
    toast.success("Thanks! We will keep you posted.");
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pt-20">
      <div className="grid items-center gap-6 rounded-box bg-primary p-8 text-primary-content md:grid-cols-2 md:p-12">
        <div>
          <h2 className="text-3xl">Hear about new events first</h2>
          <p className="mt-2 text-primary-content/90">One short email when something new is planned near you.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row" noValidate>
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input id="newsletter-email" name="email" type="email" placeholder="you@example.com" className="input w-full text-base-content" />
          <button type="submit" className="btn btn-secondary">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
