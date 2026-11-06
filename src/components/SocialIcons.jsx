const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

// X uses the new X logo (not the old bird). The others are simple outline icons.
const icons = [
  {
    name: "X",
    href: "https://x.com",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <path d="M17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <path d="M9.75 15.02 15.5 11.75 9.75 8.48z" />
      </svg>
    ),
  },
];

export default function SocialIcons() {
  return (
    <ul className="flex items-center gap-2">
      {icons.map(({ name, href, svg }) => (
        <li key={name}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="btn btn-circle btn-ghost btn-sm border border-white/25 text-neutral-content hover:border-secondary hover:text-secondary">
            {svg}
          </a>
        </li>
      ))}
    </ul>
  );
}
