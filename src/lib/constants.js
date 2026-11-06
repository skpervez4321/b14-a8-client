// The site name lives only here. Change it once and it changes everywhere.
export const SITE_NAME = "Seba Shongi";
export const SITE_TAGLINE = "Small acts, shared by many hands.";

export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Distribution",
  "Health Camp",
  "Education",
  "Awareness",
  "Other",
];

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");
