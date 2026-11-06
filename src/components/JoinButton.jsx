"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";

export default function JoinButton({ eventId, ended }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [status, setStatus] = useState({ eventId: null, joined: false });
  const [joinedNow, setJoinedNow] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    api(`/events/${eventId}/join-status`, { auth: true })
      .then((data) => !cancelled && setStatus({ eventId, joined: data.joined }))
      .catch(() => !cancelled && setStatus({ eventId, joined: false }));
    return () => {
      cancelled = true;
    };
  }, [user, eventId]);

  async function handleJoin() {
    if (!user) {
      toast.error("Please log in to join this event.");
      return router.push("/login");
    }
    setBusy(true);
    try {
      await api(`/events/${eventId}/join`, { method: "POST", auth: true });
      setJoinedNow(true);
      toast.success("You joined this event. See you there!");
      router.refresh();
    } catch (error) {
      if (error.status === 409) setJoinedNow(true);
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }

  const checking = Boolean(user) && status.eventId !== eventId;
  const joined = joinedNow || status.joined;

  if (ended) return <button type="button" className="btn btn-disabled w-full sm:w-auto" disabled>This event has ended</button>;
  if (isPending || checking) return <span className="skeleton block h-12 w-full sm:w-48" aria-label="Checking" />;
  if (joined) return <button type="button" className="btn btn-success w-full sm:w-auto" disabled>You have joined</button>;

  return (
    <button type="button" onClick={handleJoin} disabled={busy} className="btn btn-secondary btn-lg w-full sm:w-auto">
      {busy ? "Joining..." : "Join Event"}
    </button>
  );
}
