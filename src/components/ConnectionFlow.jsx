import { Building2, ArrowRight, ArrowDown } from "lucide-react";
import Logo from "./Logo";

const SOURCES = ["CityCare Medical Center", "Nova Health Hospital"];

function Connector({ delay = 0 }) {
  return (
    <div className="relative mx-1 h-px w-8 shrink-0 bg-border-soft sm:h-px sm:w-10">
      <span
        className="absolute left-0 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_6px_1px_rgba(32,199,181,0.6)]"
        style={{ animation: `flowDot 1.8s ease-in-out ${delay}s infinite` }}
      />
      <ArrowRight size={12} className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-ink-muted sm:block" />
      <ArrowDown size={12} className="absolute left-1/2 top-full -translate-x-1/2 text-ink-muted sm:hidden" />
    </div>
  );
}

export default function ConnectionFlow() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-0">
      {SOURCES.map((s, i) => (
        <div key={s} className="flex flex-col items-center gap-3 sm:flex-row">
          <div className="flex flex-col items-center gap-1.5 rounded-md2 border border-border-subtle bg-base-surface px-3 py-2.5">
            <Building2 size={14} className="text-ink-muted" />
            <span className="max-w-[92px] text-center text-[10px] leading-tight text-ink-secondary">{s}</span>
          </div>
          <Connector delay={i * 0.3} />
        </div>
      ))}

      <div className="flex flex-col items-center gap-1.5 rounded-md2 border border-accent/30 bg-accent-softer px-3 py-2.5">
        <Logo size="sm" />
      </div>

      <Connector delay={0.6} />

      <div className="flex flex-col items-center gap-1.5 rounded-md2 border border-border-subtle bg-base-surface px-4 py-2.5">
        <span className="text-[10px] font-medium text-ink-primary">Patient</span>
        <span className="text-[9px] text-ink-muted">One connected record</span>
      </div>

      <style>{`
        @keyframes flowDot {
          0% { left: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
