import { createAuthClient } from "better-auth/react";

// In the browser the current site address is used. On the server (during build) the env value is used.
const baseURL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.BETTER_AUTH_URL || "http://localhost:3000";

export const authClient = createAuthClient({ baseURL });
