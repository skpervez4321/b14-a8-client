// Two joined rings: people coming together.
export default function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="18" cy="24" r="11" stroke="#7c3aed" strokeWidth="6" />
      <circle cx="30" cy="24" r="11" stroke="#e11d48" strokeWidth="6" strokeOpacity="0.9" />
    </svg>
  );
}
