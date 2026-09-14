export default function EmptyState({ icon: Icon, title, message }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md2 border border-dashed border-border-subtle px-6 py-14 text-center">
      {Icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.04] text-ink-muted">
          <Icon size={18} strokeWidth={1.75} />
        </div>
      )}
      <p className="text-sm font-medium text-ink-secondary">{title}</p>
      {message && <p className="mt-1 max-w-xs text-xs text-ink-muted">{message}</p>}
    </div>
  );
}
