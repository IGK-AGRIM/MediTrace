import { NavLink } from "react-router-dom";
import { LogOut, RotateCcw, X } from "lucide-react";
import Logo from "./Logo";
import Avatar from "./Avatar";

export default function Sidebar({ navItems, roleLabel, name, subLabel, avatarSeed, onLogout, onReset, mobileOpen, onCloseMobile }) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border-subtle bg-base-surface transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Logo />
          <button
            onClick={onCloseMobile}
            className="rounded-md p-1 text-ink-muted hover:text-ink-primary lg:hidden"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-fast ${
                  isActive
                    ? "bg-accent-soft text-accent"
                    : "text-ink-secondary hover:bg-white/[0.05] hover:text-ink-primary"
                }`
              }
            >
              <item.icon size={16} strokeWidth={2} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border-subtle px-3 py-3">
          <div className="flex items-center gap-2.5 rounded-md px-2 py-2">
            <Avatar seed={avatarSeed} name={name} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-ink-primary">{name}</p>
              <p className="truncate text-[11px] text-ink-muted">{subLabel || roleLabel}</p>
            </div>
          </div>
          {onReset && (
            <button
              onClick={onReset}
              className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-ink-secondary transition-fast hover:bg-white/[0.05] hover:text-ink-primary"
              title="Reset demo data to its original state"
            >
              <RotateCcw size={16} strokeWidth={2} />
              Reset demo data
            </button>
          )}
          <button
            onClick={onLogout}
            className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-ink-secondary transition-fast hover:bg-white/[0.05] hover:text-ink-primary"
          >
            <LogOut size={16} strokeWidth={2} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
