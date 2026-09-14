export default function Logo({ size = "md" }) {
  const dims = size === "sm" ? "h-6 w-6" : size === "lg" ? "h-9 w-9" : "h-7 w-7";
  const text = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className={dims} fill="none">
        <rect width="32" height="32" rx="8" fill="#11151B" stroke="rgba(255,255,255,0.08)" />
        <path
          d="M6 17h4l2.5-7 4 14 2.5-7H26"
          stroke="#20C7B5"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`${text} font-semibold tracking-tight text-ink-primary`}>
        MediTrace
      </span>
    </div>
  );
}
