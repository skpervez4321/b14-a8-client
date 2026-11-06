import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is missing. Add it to .env.local (local) or Vercel Environment Variables (live).");
}

// Keep one connection while the dev server reloads files.
const globalForMongo = globalThis;
const client = globalForMongo._sebaMongoClient ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") globalForMongo._sebaMongoClient = client;
const db = client.db(process.env.MONGODB_DB || "seba_shongi_auth");

const github =
  process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? { github: { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET } }
    : {};

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: { enabled: true, minPasswordLength: 6 },
  socialProviders: github,
  hooks: {
    // The same password rule as the form, enforced again on the server.
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;
      const password = String(ctx.body?.password ?? "");
      if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        throw new APIError("BAD_REQUEST", {
          message: "Password needs at least one uppercase and one lowercase letter.",
        });
      }
    }),
  },
  plugins: [
    // The server (API) checks this token to know who is calling.
    jwt({
      jwt: {
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image ?? "",
        }),
      },
    }),
  ],
});
