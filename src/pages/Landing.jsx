import { Link } from "react-router-dom";
import {
  Stethoscope,
  UserRound,
  ArrowRight,
  DoorOpen,
  ScanSearch,
  History,
  Link2,
  Activity,
  BarChart3,
  FileText,
  ShieldAlert,
  CalendarClock,
  NotebookPen,
} from "lucide-react";
import Logo from "../components/Logo";
import LandingNav from "../components/LandingNav";
import Reveal from "../components/Reveal";

const JOURNEY = [
  {
    icon: DoorOpen,
    title: "A patient walks into a new hospital",
    body: "They bring an ID card. Not their history — that stayed behind at the last clinic.",
  },
  {
    icon: ScanSearch,
    title: "The doctor searches once",
    body: "By name, patient ID, or a quick QR scan. No phone calls to a previous hospital's records desk.",
  },
  {
    icon: History,
    title: "The full story loads",
    body: "Past diagnoses, prescriptions and allergies — from every hospital that ever treated them — on one timeline.",
  },
  {
    icon: Link2,
    title: "Today's visit joins the thread",
    body: "One more entry on the same record, ready and waiting for whichever doctor this patient sees next.",
  },
];

const INSIDE = [
  { icon: Activity, title: "A timeline, not a file cabinet", body: "The whole medical journey in one scrollable thread — not folders scattered across hospitals." },
  { icon: ShieldAlert, title: "Critical info, up front", body: "Allergies and blood group are the first thing a doctor sees — not the tenth." },
  { icon: FileText, title: "Reports, sorted for you", body: "Lab work, imaging, prescriptions and notes, filed by type and ready to preview." },
  { icon: CalendarClock, title: "Follow-ups that don't vanish", body: "Today's, upcoming, and completed visits, pulled straight from the record itself." },
  { icon: BarChart3, title: "A dashboard doctors actually use", body: "Patient volume, visit trends, and what's overdue — at a glance, not buried in menus." },
  { icon: NotebookPen, title: "Patients get a voice too", body: "A place to log how they're feeling between visits, kept apart from the clinical record." },
];

function MiniTimelinePreview() {
  const rows = [
    { dot: "bg-accent", hospital: "CityCare Medical Center", tag: "Mar 2026", title: "Respiratory infection", live: true },
    { dot: "bg-status-warn", hospital: "Nova Health Hospital", tag: "Aug 2025", title: "Asthma follow-up" },
    { dot: "bg-ink-muted", hospital: "MetroCare Clinic", tag: "Nov 2024", title: "Allergic rhinitis" },
  ];
  return (
    <div className="w-full max-w-sm rounded-md2 border border-border-soft bg-base-surface shadow-elevated">
      <div className="flex items-center gap-1.5 border-b border-border-subtle px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-status-critical/60" />
        <span className="h-2 w-2 rounded-full bg-status-warn/60" />
        <span className="h-2 w-2 rounded-full bg-status-good/60" />
        <span className="ml-2 text-[10px] text-ink-muted">Aarav Mehta · MT-20481</span>
      </div>
      <div className="space-y-0 p-4">
        {rows.map((r, i) => (
          <div key={r.title} className="relative flex gap-3 pb-4 last:pb-0">
            <div className="flex flex-col items-center">
              <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${r.dot} ${r.live ? "ring-4 ring-accent-softer" : ""}`} />
              {i < rows.length - 1 && <span className="mt-1 w-px flex-1 bg-border-soft" />}
            </div>
            <div>
              <p className="text-xs font-medium text-ink-primary">{r.title}</p>
              <p className="mt-0.5 text-[11px] text-ink-muted">
                {r.hospital} · {r.tag}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div id="top" className="bg-base-bg">
      <LandingNav />

      {/* HERO — split layout */}
      <section className="border-b border-border-subtle px-6 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal className="flex w-fit items-center gap-2 rounded-full border border-border-subtle bg-base-surface/80 px-3 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-good opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status-good" />
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-ink-secondary">MediTrace prototype</span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-ink-primary sm:text-5xl">
                Health records don't travel.
                <br />
                <span className="text-accent">Patients do.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-secondary sm:text-base">
                MediTrace is the thread a patient's medical history follows between hospitals — so
                the next doctor they see isn't starting from a blank page.
              </p>
            </Reveal>

            <Reveal delay={240} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#demo"
                className="flex items-center gap-1.5 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-base-bg transition-fast hover:scale-[1.03] hover:bg-accent-dim active:scale-[0.98]"
              >
                Step into the demo
                <ArrowRight size={15} />
              </a>
              <a
                href="#gap"
                className="rounded-md border border-border-subtle px-5 py-2.5 text-sm font-medium text-ink-secondary transition-fast hover:border-border-soft hover:text-ink-primary"
              >
                Why it matters
              </a>
            </Reveal>
          </div>

          <Reveal delay={200} className="flex justify-center lg:col-span-2">
            <MiniTimelinePreview />
          </Reveal>
        </div>
      </section>

      {/* THE GAP — editorial big-number section */}
      <section id="gap" className="scroll-mt-16 border-b border-border-subtle px-6 py-20 sm:px-8">
        <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-8 sm:grid-cols-5">
          <Reveal className="sm:col-span-2">
            <span className="text-7xl font-semibold tracking-tight text-accent sm:text-8xl">Zero.</span>
          </Reveal>
          <Reveal delay={120} className="sm:col-span-3">
            <p className="text-lg leading-relaxed text-ink-primary sm:text-xl">
              That's roughly how much of a patient's history usually survives the walk from one
              hospital's front desk to another's.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              Diagnoses, allergies, prescriptions — all of it stays behind, and every new doctor
              starts the conversation over. MediTrace exists to close that gap.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE FIX — timeline-styled narrative, mirrors the product itself */}
      <section id="how" className="scroll-mt-16 border-b border-border-subtle bg-base-surface/40 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-accent">The fix</p>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">Same shape as the product</h2>
          </Reveal>

          <div className="mt-10">
            {JOURNEY.map((j, i) => (
              <Reveal key={j.title} delay={i * 100} className="relative flex gap-4 pb-10 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <j.icon size={16} strokeWidth={2} />
                  </span>
                  {i < JOURNEY.length - 1 && <span className="mt-1 w-px flex-1 bg-border-soft" />}
                </div>
                <div className="pt-1.5">
                  <h3 className="text-sm font-semibold text-ink-primary">{j.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary sm:text-sm">{j.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSIDE — asymmetric bento grid */}
      <section id="inside" className="scroll-mt-16 border-b border-border-subtle px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-accent">Inside the prototype</p>
            <h2 className="max-w-md text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
              What's actually built, not just pitched
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INSIDE.map((f, i) => (
              <Reveal
                key={f.title}
                delay={i * 70}
                className={`rounded-md2 border border-border-subtle bg-base-surface p-5 transition-fast hover:-translate-y-0.5 hover:border-accent/25 hover:shadow-card ${
                  i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col justify-center" : ""
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/[0.05] text-ink-secondary">
                  <f.icon size={16} strokeWidth={2} />
                </span>
                <h3 className={`mt-3 font-semibold text-ink-primary ${i === 0 ? "text-base" : "text-sm"}`}>{f.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="border-b border-border-subtle bg-base-surface/40 px-6 py-20 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xl font-medium leading-snug tracking-tight text-ink-primary sm:text-2xl">
            "We didn't build another place to store records.
            <br className="hidden sm:block" /> We built the thread that connects the ones already there."
          </p>
          <p className="mt-4 text-xs text-ink-muted">— the MediTrace team</p>
        </Reveal>
      </section>

      {/* DEMO / LOGIN — browser-frame mockup */}
      <section id="demo" className="scroll-mt-16 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-md">
          <Reveal className="text-center">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-accent">Live prototype</p>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">Step inside</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              This is a real, working build — not a mockup. Choose a portal, then use the demo
              account on the next screen.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-8 overflow-hidden rounded-md2 border border-border-soft bg-base-surface shadow-elevated">
            <div className="flex items-center gap-1.5 border-b border-border-subtle px-4 py-2.5">
              <span className="h-2 w-2 rounded-full bg-status-critical/60" />
              <span className="h-2 w-2 rounded-full bg-status-warn/60" />
              <span className="h-2 w-2 rounded-full bg-status-good/60" />
              <span className="ml-2 text-[10px] text-ink-muted">meditrace.app</span>
            </div>
            <div className="space-y-3 p-5">
              <Link
                to="/doctor/login"
                className="group flex items-center justify-between rounded-md2 border border-border-subtle bg-base-elevated px-4 py-3.5 transition-fast hover:border-accent/30 hover:shadow-[0_0_0_3px_rgba(32,199,181,0.08)]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-soft text-accent">
                    <Stethoscope size={15} strokeWidth={2} />
                  </span>
                  <span className="text-sm font-medium text-ink-primary">Doctor Portal</span>
                </span>
                <ArrowRight size={15} className="text-ink-muted transition-fast group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
              <Link
                to="/patient/login"
                className="group flex items-center justify-between rounded-md2 border border-border-subtle bg-base-elevated px-4 py-3.5 transition-fast hover:border-accent/30 hover:shadow-[0_0_0_3px_rgba(255,255,255,0.06)]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.06] text-ink-secondary">
                    <UserRound size={15} strokeWidth={2} />
                  </span>
                  <span className="text-sm font-medium text-ink-primary">Patient Portal</span>
                </span>
                <ArrowRight size={15} className="text-ink-muted transition-fast group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            </div>
          </Reveal>

          <p className="mt-6 text-center text-[11px] text-ink-muted">Prototype build for demonstration purposes only.</p>
        </div>
      </section>

      <footer className="border-t border-border-subtle px-6 py-10 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
          <Logo size="sm" />
          <p className="max-w-sm text-xs leading-relaxed text-ink-muted">
            Built for the Smart India Hackathon — because a patient's story shouldn't reset every
            time they walk through a new door.
          </p>
        </div>
      </footer>
    </div>
  );
}
