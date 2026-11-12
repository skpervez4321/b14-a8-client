# Seba Shongi (client)

Seba Shongi is a community service event platform. Neighbours create clean-ups, plantations, food drives and donation camps, and other people find an event and join it. This is the website (Next.js). It talks to the Seba Shongi server for events and uses BetterAuth for login.

- Live site: https://b14-a8-client-qole.vercel.app
- Server (API) repo: https://github.com/skpervez4321/b14-a8-server

## Main features

1. **Create events (private):** title, description, type, thumbnail link, location and a future date and time. The host is saved from the login token.
2. **Upcoming events (public):** a card grid with type filter and search. Events whose date has passed never show here.
3. **Event details and Join:** anyone can read the details. Joining needs login, saves the user and event data, and a person cannot join the same event twice.
4. **Joined events (private):** every event you joined, sorted by event date.
5. **Manage events (private):** update or delete only the events you created.
6. **Login and registration:** email and password (one uppercase letter, one lowercase letter, at least 6 characters) and GitHub login, with toast messages.
7. **JWT protected API:** private server routes accept only a valid BetterAuth JWT.
8. **Extras:** light and dark theme, loading skeletons, and a profile page where the name and picture can be updated.

## Technologies

Next.js (App Router), JavaScript, Tailwind CSS, DaisyUI, BetterAuth (email, GitHub, JWT), MongoDB Atlas, react-hot-toast.

## Run on your computer

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and fill in the values.
3. Start the server (API) first, then run `npm run dev` here and open http://localhost:3000

## GitHub login setup

On GitHub open Settings, Developer settings, OAuth Apps, New OAuth App.

- Homepage URL: your site address (for local use http://localhost:3000)
- Redirect URI (called Authorization callback URL on some forms): your site address followed by /api/auth/callback/github``

Put the Client ID and Client Secret in `.env.local` (and in Vercel for the live site).