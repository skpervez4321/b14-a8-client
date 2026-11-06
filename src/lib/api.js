import { API_URL } from "@/lib/constants";

let cached = { token: null, until: 0 };

// Asks our own site (BetterAuth jwt plugin) for a short-lived token that the server accepts.
async function getToken() {
  if (cached.token && Date.now() < cached.until) return cached.token;
  const res = await fetch("/api/auth/token", { credentials: "include", cache: "no-store" });
  if (!res.ok) throw new Error("Please log in again.");
  const { token } = await res.json();
  cached = { token, until: Date.now() + 10 * 60 * 1000 }; // tokens last 15 minutes
  return token;
}

export function clearToken() {
  cached = { token: null, until: 0 };
}

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors ?? {};
  }
}

// Private calls pass { auth: true } and carry the JWT. Public calls need no token.
export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (auth) headers.Authorization = `Bearer ${await getToken()}`;

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Cannot reach the server. Check your internet or try again.", 0);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.message || "Something went wrong.", res.status, data.errors);
  return data;
}
