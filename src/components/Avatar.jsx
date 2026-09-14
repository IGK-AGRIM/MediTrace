import { useState } from "react";

const SIZE_CLASSES = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

// Renders a consistent illustrated avatar per patient/doctor (seeded so it never
// changes between renders), falling back to an initials circle if the network
// request fails — important since this may run on a venue Wi-Fi with no internet.
export default function Avatar({ seed, name, size = "md", className = "" }) {
  const [errored, setErrored] = useState(false);
  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("") || "?";
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  if (errored || !seed) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-full bg-accent-soft font-semibold text-accent ${sizeClass} ${className}`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={`https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${encodeURIComponent(
        seed
      )}&backgroundColor=171c23,1d232b&backgroundType=solid,gradientLinear`}
      alt=""
      onError={() => setErrored(true)}
      className={`shrink-0 rounded-full border border-border-subtle bg-base-elevated object-cover ${sizeClass} ${className}`}
    />
  );
}
