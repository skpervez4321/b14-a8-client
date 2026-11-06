import { initials } from "@/lib/format";

export default function Avatar({ name, image, size = 40 }) {
  return image ? (
    <img src={image} alt={name || "Profile picture"} width={size} height={size} className="rounded-full object-cover bg-base-300" style={{ width: size, height: size }} referrerPolicy="no-referrer" />
  ) : (
    <span className="inline-flex items-center justify-center rounded-full bg-primary text-primary-content font-bold" style={{ width: size, height: size }} aria-label={name || "Profile"}>
      {initials(name)}
    </span>
  );
}
