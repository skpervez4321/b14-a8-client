"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";
import Logo from "@/components/Logo";
import Avatar from "@/components/Avatar";
import ThemeToggle from "@/components/ThemeToggle";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
];

const privateLinks = [
  { href: "/create-event", label: "Create Event" },
  { href: "/manage-events", label: "Manage Events" },
  { href: "/joined-events", label: "Joined Events" },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const user = session?.user;

  async function handleLogout() {
    await authClient.signOut();
    clearToken();
    toast.success("You are logged out.");
    router.push("/");
    router.refresh();
  }

  function closeMenus() {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }

  const linkClass = (href) =>
    `rounded-full px-4 py-2 font-semibold ${pathname === href ? "bg-primary/10 text-primary" : "hover:bg-base-200"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2" aria-label="Main">
        <div className="dropdown lg:hidden">
          <button type="button" tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu dropdown-content z-50 mt-2 w-64 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg" onClick={closeMenus}>
            {publicLinks.map((link) => (
              <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
            ))}
            {user && privateLinks.map((link) => (
              <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </div>

        <Link href="/" className="flex items-center gap-2 whitespace-nowrap text-lg font-bold sm:text-xl" aria-label={`${SITE_NAME} home`}>
          <Logo />
          <span>{SITE_NAME}</span>
        </Link>

        <ul className="ml-4 hidden items-center gap-1 lg:flex">
          {publicLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass(link.href)}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          {isPending ? (
            <span className="skeleton h-10 w-10 rounded-full" aria-label="Loading account" />
          ) : user ? (
            <>
              <div className="dropdown dropdown-end">
                <div className="tooltip tooltip-bottom" data-tip={user.name}>
                  <button type="button" tabIndex={0} className="btn btn-ghost btn-circle" aria-label={`Account menu for ${user.name}`}>
                    <Avatar name={user.name} image={user.image} />
                  </button>
                </div>
                <ul tabIndex={0} className="menu dropdown-content z-50 mt-2 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg" onClick={closeMenus}>
                  <li className="menu-title normal-case">{user.name}</li>
                  {privateLinks.map((link) => (
                    <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                  ))}
                  <li><Link href="/profile">My Profile</Link></li>
                </ul>
              </div>
              <button type="button" onClick={handleLogout} className="btn btn-outline btn-secondary btn-sm sm:btn-md">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm sm:btn-md">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
