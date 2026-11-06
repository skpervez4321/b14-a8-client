import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import Logo from "@/components/Logo";
import SocialIcons from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="mt-20 bg-neutral text-neutral-content">
      <div className="h-1.5 bg-gradient-to-r from-primary via-primary to-secondary" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold">
            <span className="rounded-full bg-base-100 p-1.5"><Logo size={30} /></span>
            {SITE_NAME}
          </div>
          <p className="mt-3 max-w-sm text-neutral-content/80">
            {SITE_TAGLINE} Host a community service event, find one near you, and show up together.
          </p>
          <div className="mt-5">
            <SocialIcons />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">Explore</h2>
          <ul className="mt-3 space-y-2">
            <li><Link className="link link-hover" href="/">Home</Link></li>
            <li><Link className="link link-hover" href="/events">Upcoming Events</Link></li>
            <li><Link className="link link-hover" href="/create-event">Create Event</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold">Your account</h2>
          <ul className="mt-3 space-y-2">
            <li><Link className="link link-hover" href="/joined-events">Joined Events</Link></li>
            <li><Link className="link link-hover" href="/manage-events">Manage Events</Link></li>
            <li><Link className="link link-hover" href="/profile">My Profile</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-neutral-content/70">
        © {new Date().getFullYear()} {SITE_NAME}. Made for neighbours who like to help.
      </div>
    </footer>
  );
}
