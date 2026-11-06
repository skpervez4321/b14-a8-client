"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { EVENT_TYPES } from "@/lib/constants";
import { toLocalInput } from "@/lib/format";
import FormField from "@/components/FormField";

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

// Used for both "Create Event" and "Update Event".
// onSubmit receives clean data and may throw an ApiError (its .errors show under the fields).
export default function EventForm({ initial, submitLabel, busyLabel, onSubmit }) {
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [thumb, setThumb] = useState(initial?.thumbnail ?? "");
  const minDate = toLocalInput(new Date());

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      title: String(form.get("title")).trim(),
      description: String(form.get("description")).trim(),
      eventType: String(form.get("eventType")),
      thumbnail: String(form.get("thumbnail")).trim(),
      location: String(form.get("location")).trim(),
      eventDate: String(form.get("eventDate")),
    };

    const next = {};
    if (data.title.length < 3 || data.title.length > 100) next.title = "Title must be 3 to 100 characters.";
    if (data.description.length < 10) next.description = "Description needs at least 10 characters.";
    if (!EVENT_TYPES.includes(data.eventType)) next.eventType = "Choose an event type.";
    if (!isHttpUrl(data.thumbnail)) next.thumbnail = "Paste a link that starts with http:// or https://";
    if (data.location.length < 3) next.location = "Enter the place where the event happens.";
    const when = new Date(data.eventDate);
    if (!data.eventDate || Number.isNaN(when.getTime())) next.eventDate = "Choose a date and time.";
    else if (when.getTime() <= Date.now() && toLocalInput(when) !== toLocalInput(initial?.eventDate ?? 0))
      next.eventDate = "The event date must be in the future.";

    setErrors(next);
    if (Object.keys(next).length) return toast.error("Please fix the highlighted fields.");

    setBusy(true);
    try {
      await onSubmit({ ...data, eventDate: when.toISOString() });
    } catch (error) {
      if (error.errors && Object.keys(error.errors).length) setErrors(error.errors);
      toast.error(error.message || "Could not save the event.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-box border border-base-300 bg-base-100 p-5 sm:p-8 md:grid-cols-2" noValidate>
      <div className="md:col-span-2">
        <FormField label="Event title" htmlFor="title" error={errors.title}>
          <input id="title" name="title" defaultValue={initial?.title} className="input input-bordered w-full" placeholder="Winter clothes distribution" />
        </FormField>
      </div>

      <div className="md:col-span-2">
        <FormField label="Description" htmlFor="description" error={errors.description} hint="Tell people what will happen and what to bring.">
          <textarea id="description" name="description" defaultValue={initial?.description} rows={5} className="textarea textarea-bordered w-full" placeholder="We will hand out warm clothes to families near the market..." />
        </FormField>
      </div>

      <FormField label="Event type" htmlFor="eventType" error={errors.eventType}>
        <select id="eventType" name="eventType" defaultValue={initial?.eventType ?? ""} className="select select-bordered w-full">
          <option value="" disabled>Choose a type</option>
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Date and time" htmlFor="eventDate" error={errors.eventDate}>
        <input id="eventDate" name="eventDate" type="datetime-local" min={minDate} defaultValue={initial?.eventDate ? toLocalInput(initial.eventDate) : ""} className="input input-bordered w-full" />
      </FormField>

      <FormField label="Location" htmlFor="location" error={errors.location}>
        <input id="location" name="location" defaultValue={initial?.location} className="input input-bordered w-full" placeholder="Mirpur 10, Dhaka" />
      </FormField>

      <FormField label="Thumbnail link" htmlFor="thumbnail" error={errors.thumbnail} hint="A link to a picture for the event card.">
        <input id="thumbnail" name="thumbnail" type="url" value={thumb} onChange={(e) => setThumb(e.target.value)} className="input input-bordered w-full" placeholder="https://..." />
      </FormField>

      {isHttpUrl(thumb) && (
        <div className="md:col-span-2">
          <p className="mb-2 font-semibold">Preview</p>
          <img src={thumb} alt="Thumbnail preview" className="aspect-[16/10] w-full max-w-sm rounded-box border border-base-300 object-cover" onError={(e) => (e.currentTarget.style.display = "none")} onLoad={(e) => (e.currentTarget.style.display = "block")} />
        </div>
      )}

      <div className="md:col-span-2">
        <button type="submit" disabled={busy} className="btn btn-primary btn-wide">
          {busy ? busyLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}
