"use client";

import { useCallback } from "react";

const FALLBACK = "/placeholder.svg";

// Shows a neutral picture when a pasted image link is broken.
export default function SafeImage({ src, alt, className, loading }) {
  // Also covers images that failed before the page finished loading.
  const check = useCallback((img) => {
    if (img && img.complete && img.naturalWidth === 0 && !img.src.endsWith(FALLBACK)) img.src = FALLBACK;
  }, []);

  return (
    <img
      ref={check}
      src={src || FALLBACK}
      alt={alt}
      className={className}
      loading={loading}
      onError={(e) => {
        if (!e.currentTarget.src.endsWith(FALLBACK)) e.currentTarget.src = FALLBACK;
      }}
    />
  );
}
