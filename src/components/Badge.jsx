const VARIANTS = {
  neutral: "bg-white/[0.06] text-ink-secondary border-border-subtle",
  accent: "bg-accent-soft text-accent border-accent/20",
  good: "bg-status-goodSoft text-status-good border-status-good/20",
  warn: "bg-status-warnSoft text-status-warn border-status-warn/20",
  critical: "bg-status-criticalSoft text-status-critical border-status-critical/25",
};

export default function Badge({ children, variant = "neutral", icon: Icon, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium leading-none ${VARIANTS[variant]} ${className}`}
    >
      {Icon && <Icon size={12} strokeWidth={2.25} />}
      {children}
    </span>
  );
}
