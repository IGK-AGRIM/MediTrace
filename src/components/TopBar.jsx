import { Menu } from "lucide-react";

export default function TopBar({ title, subtitle, onMenuClick, right }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border-subtle bg-base-bg/90 px-4 py-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="rounded-md p-1.5 text-ink-secondary hover:bg-white/[0.06] hover:text-ink-primary lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold tracking-tight text-ink-primary">{title}</h1>
          {subtitle && <p className="truncate text-xs text-ink-muted">{subtitle}</p>}
        </div>
      </div>
      {right && <div className="flex shrink-0 items-center gap-2">{right}</div>}
    </header>
  );
}
