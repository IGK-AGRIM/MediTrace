import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { href: "#gap", label: "The Gap" },
  { href: "#how", label: "The Fix" },
  { href: "#inside", label: "Inside" },
];

export default function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-base-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top">
          <Logo size="sm" />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="group relative text-xs font-medium text-ink-secondary transition-fast hover:text-ink-primary">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#demo"
            className="hidden rounded-md bg-accent px-3.5 py-2 text-xs font-medium text-base-bg transition-fast hover:scale-[1.03] hover:bg-accent-dim active:scale-[0.98] sm:block"
          >
            Try the live demo
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-md p-1.5 text-ink-secondary hover:bg-white/[0.06] hover:text-ink-primary md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border-subtle px-5 py-3 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-ink-secondary transition-fast hover:bg-white/[0.05] hover:text-ink-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#demo"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-md bg-accent px-3 py-2 text-center text-sm font-medium text-base-bg"
          >
            Try the live demo
          </a>
        </nav>
      )}
    </header>
  );
}
