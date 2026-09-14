import { Users } from "lucide-react";
import { HOSPITALS } from "../data/mockData";

const NODES = [
  { label: HOSPITALS[0], x: 18, y: 22 },
  { label: HOSPITALS[1], x: 82, y: 22 },
  { label: HOSPITALS[2], x: 50, y: 90 },
];
const CENTER = { x: 50, y: 54 };

export default function NetworkVisual() {
  return (
    <div className="relative h-56 w-full select-none">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {NODES.map((n, i) => (
          <line
            key={i}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={n.x}
            y2={n.y}
            stroke="#20C7B5"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            strokeOpacity="0.45"
            className="network-line"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
        <circle cx={CENTER.x} cy={CENTER.y} r="4.2" fill="#171C23" stroke="#20C7B5" strokeWidth="0.6" />
        {NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="2.4" fill="#11151B" stroke="#20C7B5" strokeOpacity="0.6" strokeWidth="0.5" />
        ))}
      </svg>

      <div
        className="absolute flex flex-col items-center gap-1 text-center"
        style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%`, transform: "translate(-50%,-50%)" }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent shadow-[0_0_0_5px_rgba(32,199,181,0.08)]">
          <Users size={16} strokeWidth={2} />
        </span>
        <span className="text-[10px] font-medium text-ink-primary">Patients</span>
      </div>

      {NODES.map((n, i) => (
        <div
          key={i}
          className="absolute w-24 -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span className="rounded-md border border-border-subtle bg-base-elevated px-2 py-1 text-[10px] leading-tight text-ink-secondary">
            {n.label}
          </span>
        </div>
      ))}

      <style>{`
        .network-line {
          animation: dashFlow 3s linear infinite;
        }
        @keyframes dashFlow {
          to { stroke-dashoffset: -20; }
        }
      `}</style>
    </div>
  );
}
