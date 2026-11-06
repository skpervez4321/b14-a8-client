"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: { fontWeight: 600, background: "var(--color-base-100)", color: "var(--color-base-content)", border: "1px solid var(--color-base-300)" },
      }}
    />
  );
}
