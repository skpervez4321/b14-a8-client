export function formatDate(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(value) {
  return new Date(value).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function isPast(value) {
  return new Date(value).getTime() <= Date.now();
}

// Value for <input type="datetime-local"> in the user's own time zone.
export function toLocalInput(value) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export function initials(name = "") {
  return (name.trim().charAt(0) || "?").toUpperCase();
}
