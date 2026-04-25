import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router";

// ─── Image paths ──────────────────────────────────────────────────────────────
const I = {
  tooltipZ5:          "/images/case01/tooltip-z5.png",
  bannerStates:       "/images/case01/banner-states.png",
  choke1:             "/images/case01/choke-1.png",
  choke2:             "/images/case01/choke-2.png",
  signup:             "/images/case01/signup.png",
  profile:            "/images/case01/profile.png",
  practice:           "/images/case01/practice.png",
  location:           "/images/case01/location.png",
  servicesBefore:     "/images/case01/services-before.png",
  team:               "/images/case01/team.png",
  funnelDropoff:      "/images/case01/funnel-dropoff.png",
  userResearch:       "/images/case01/user-research.png",
  servicesAfter:      "/images/case01/services-after.png",
  locationsAfter:     "/images/case01/locations-after.png",
  servicesComparison: "/images/case01/services-comparison.png",
  finalOutcome:       "/images/case01/final-outcome.png",
  checklist:          "/images/case01/checklist.png",
};

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useHover() {
  const [hovered, setHovered] = useState(false);
  return {
    hovered,
    bind: { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) },
  };
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const navigate = useNavigate();
  const { hovered: backH, bind: backB } = useHover();
  const { hovered: toggleH, bind: toggleB } = useHover();
  const { hovered: resumeH, bind: resumeB } = useHover();
  const { hovered: emailH, bind: emailB } = useHover();

  const navBtn: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 12,
    letterSpacing: "0.96px", textTransform: "uppercase", padding: "4px 8px",
    borderRadius: 4, cursor: "pointer", transition: "background-color 0.07s, color 0.07s",
    border: "none", background: "transparent", textDecoration: "none", display: "inline-block",
  };

  return (
    <div className="w-full sticky top-0 z-50" style={{ backgroundColor: "var(--color-nav-bg)" }}>
      <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 flex items-center justify-between py-[16px]">
        <div className="flex items-center gap-[16px]">
          <button
            onClick={() => navigate("/")}
            style={{ ...navBtn, color: backH ? "var(--color-inv-text-1)" : "var(--color-text-primary)", backgroundColor: backH ? "var(--color-inv-bg)" : "transparent", fontWeight: 600 }}
            {...backB}
          >Ben George</button>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "var(--color-text-tertiary)" }}>/</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", textTransform: "uppercase", color: "var(--color-text-secondary)" }}>Case 01</span>
        </div>
        <div className="flex items-center gap-[12px]">
          <button
            onClick={toggleDark}
            className="cursor-pointer p-[4px_8px] rounded-[4px]"
            style={{ color: toggleH ? "var(--color-inv-text-1)" : "var(--color-text-primary)", backgroundColor: toggleH ? "var(--color-inv-bg)" : "transparent", transition: "background-color 0.07s, color 0.07s", border: "none" }}
            {...toggleB} aria-label="Toggle dark mode"
          >
            <div className="relative w-[16px] h-[16px]">
              <Sun size={16} strokeWidth={1.5} className={`absolute inset-0 transition-all duration-150 ${dark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`} />
              <Moon size={16} strokeWidth={1.5} className={`absolute inset-0 transition-all duration-150 ${dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`} />
            </div>
          </button>
          <a
            href="https://drive.google.com/file/d/1urZHmHllhfD-G9JwVkBSEJpRsW-Fn4R1/view"
            target="_blank" rel="noopener noreferrer"
            style={{ ...navBtn, color: resumeH ? "var(--color-inv-text-1)" : "var(--color-text-primary)", backgroundColor: resumeH ? "var(--color-inv-bg)" : "transparent" }}
            {...resumeB}
          >Resume</a>
          <a
            href="mailto:hello@bengeorge.in"
            style={{ ...navBtn, backgroundColor: "var(--color-email-bg)", color: "var(--color-email-text)", opacity: emailH ? 0.8 : 1, transition: "opacity 0.07s" }}
            {...emailB}
          >Email</a>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-b border-solid inset-0 pointer-events-none" style={{ borderColor: "var(--color-border)" }} />
    </div>
  );
}

// ─── ImgBlock ─────────────────────────────────────────────────────────────────
function ImgBlock({ figNo, label, src, caption, accentLabel }: {
  figNo: string; label: string; src: string; caption?: string; accentLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div style={{ background: "var(--color-image-surface)", border: "0.5px solid #e1e8e5", padding: 24 }}>
        <div className="flex flex-col gap-[8px] mb-[12px]">
          {accentLabel && (
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 12, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--color-alert)", lineHeight: 1.6 }}>{accentLabel}</p>
          )}
          <div className="flex items-center gap-[4px]">
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 12, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--color-text-primary)", lineHeight: 1.6 }}>{figNo}</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: "0.24px", color: "var(--color-text-primary)" }}>//</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 12, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--color-text-primary)", lineHeight: 1.6 }}>{label}</span>
          </div>
        </div>
        <div style={{ border: "0.5px solid #ebebeb", overflow: "hidden" }}>
          <img src={src} alt="" className="w-full h-auto block" />
        </div>
      </div>
      {caption && (
        <p style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: 14, lineHeight: 1.6, color: "var(--color-text-primary)" }}>{caption}</p>
      )}
    </div>
  );
}

// ─── BodyRow (217px side-title + body) ───────────────────────────────────────
function BodyRow({ sideTitle, sideTitleColor, children }: { sideTitle: string; sideTitleColor?: string; children: React.ReactNode }) {
  const titleStyle: React.CSSProperties = {
    fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: 13,
    letterSpacing: "1.82px", textTransform: "uppercase", lineHeight: "32px",
    color: sideTitleColor || "var(--color-text-tertiary)",
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[217px_1fr] gap-x-[24px] gap-y-[12px]">
      <p style={titleStyle}>{sideTitle}</p>
      <div>{children}</div>
    </div>
  );
}

// ─── SectionHeading ───────────────────────────────────────────────────────────
function SectionHeading({ num, section, title, sectionColor }: { num: string; section: string; title: string; sectionColor?: string }) {
  return (
    <div className="flex flex-col gap-[16px] mb-[64px]">
      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 14, letterSpacing: "0.84px", textTransform: "uppercase", lineHeight: 1.4, color: "var(--color-text-secondary)" }}>
        <span>{num} / </span>
        <span style={{ color: sectionColor || "var(--color-text-primary)" }}>{section}</span>
      </p>
      <h2 style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "var(--color-text-primary)" }}>{title}</h2>
    </div>
  );
}

// ─── MetaRow ─────────────────────────────────────────────────────────────────
function MetaRow({ label, value, labelColor, valueColor, dividerColor }: {
  label: string; value: string;
  labelColor?: string; valueColor?: string; dividerColor?: string;
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex gap-[24px] items-center py-[0px]">
        <p className="w-[120px] shrink-0" style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 400, fontSize: 14, letterSpacing: "-0.28px", textTransform: "uppercase", color: labelColor ?? "var(--color-text-secondary)", opacity: 0.8 }}>{label}</p>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 14, letterSpacing: "0.28px", textTransform: "uppercase", color: valueColor ?? "var(--color-text-secondary)" }}>{value}</p>
      </div>
      <div style={{ height: "0.5px", backgroundColor: dividerColor ?? "var(--color-border)" }} />
    </div>
  );
}

// ─── QuoteBlock ───────────────────────────────────────────────────────────────
function QuoteBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="w-full py-[144px]" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0">
        <div className="p-[48px]">
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 14, letterSpacing: "0.84px", textTransform: "uppercase", marginBottom: 24, color: "var(--color-text-secondary)" }}>{label}</p>
          <div style={{ height: 144, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── OutcomeBlock ─────────────────────────────────────────────────────────────
function OutcomeBlock({ label, metricValue, metricLabel, body, id }: {
  label: string; metricValue: string; metricLabel: string; body: React.ReactNode; id?: string;
}) {
  return (
    <div id={id} className="w-full py-[144px]" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0">
        <div style={{ border: "0.5px dashed var(--color-border)", padding: 48 }}>
          <p className="mb-[80px]" style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 14, letterSpacing: "0.84px", textTransform: "uppercase", color: "var(--color-text-secondary)" }}>{label}</p>
          <div className="flex flex-col gap-[24px]">
            <div className="flex items-start gap-[8px]">
              <div style={{ backgroundColor: "var(--color-bg-secondary)", padding: 16, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                <p style={{ fontFamily: "'Departure Mono', monospace", fontSize: 64, lineHeight: 1, letterSpacing: "-2.56px", color: "var(--color-text-primary)" }}>{metricValue}</p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 13, letterSpacing: "0.52px", textTransform: "uppercase", color: "var(--color-text-secondary)", lineHeight: "32px" }}>{metricLabel}</p>
              </div>
              <div style={{ backgroundColor: "var(--color-brand-surface)", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "stretch" }}>
                <p style={{ fontFamily: "'Departure Mono', monospace", fontSize: 32, lineHeight: 1.5, color: "var(--color-brand)" }}>↑</p>
              </div>
            </div>
            <div>{body}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FinalOutcomeBlock ────────────────────────────────────────────────────────
function FinalOutcomeBlock() {
  return (
    <div id="outcome" className="w-full py-[144px]" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0">
        <div style={{ border: "0.5px dashed var(--color-border)", padding: 48 }}>
          <p className="mb-[80px]" style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 14, letterSpacing: "0.84px", textTransform: "uppercase", color: "var(--color-text-secondary)" }}>
            OUTCOME // Iter 2: <span style={{ color: "var(--color-text-primary)" }}>BREAKTHROUGH</span>
          </p>
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-wrap items-start gap-[8px]">
              {[{ v: "41%", l: "activation rate" }, { v: "70%", l: "onb completion" }].map((m) => (
                <div key={m.v} className="flex items-start gap-[8px]">
                  <div style={{ backgroundColor: "var(--color-bg-secondary)", padding: 16, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                    <p style={{ fontFamily: "'Departure Mono', monospace", fontSize: 64, lineHeight: 1, letterSpacing: "-2.56px", color: "var(--color-text-primary)" }}>{m.v}</p>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 13, letterSpacing: "0.52px", textTransform: "uppercase", color: "var(--color-text-secondary)", lineHeight: "32px" }}>{m.l}</p>
                  </div>
                  <div style={{ backgroundColor: "var(--color-brand-surface)", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "stretch" }}>
                    <p style={{ fontFamily: "'Departure Mono', monospace", fontSize: 32, lineHeight: 1.5, color: "var(--color-brand)" }}>↑</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: 20, lineHeight: "28px", color: "var(--color-text-primary)" }}>
              Activation increased from 23% to{" "}
              <span style={{ color: "var(--color-brand)" }}>~41%</span>.
              {" "}Onboarding completion skyrocketed from 30% to{" "}
              <span style={{ color: "var(--color-brand)" }}>70%</span>,
              {" "}and this lift translated directly into higher conversion to paid plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BeforeAfterSummary ──────────────────────────────────────────────────────
function BeforeAfterSummary() {
  const fm  = "'IBM Plex Mono', monospace";
  const fnm = "'PP Neue Montreal', sans-serif";
  const fdm = "'Departure Mono', monospace";

  const colHdr: React.CSSProperties = {
    fontFamily: fm, fontWeight: 500, fontSize: 11,
    letterSpacing: "1.1px", textTransform: "uppercase",
    color: "var(--color-text-tertiary)", lineHeight: 1,
  };
  const attrStyle: React.CSSProperties = {
    fontFamily: fm, fontWeight: 500, fontSize: 13,
    letterSpacing: "0.78px", textTransform: "uppercase",
    color: "var(--color-text-primary)", lineHeight: 1.5,
  };
  const startedStyle: React.CSSProperties = {
    fontFamily: fm, fontSize: 13,
    color: "var(--color-text-primary)", lineHeight: 1.5,
  };
  const actionStyle: React.CSSProperties = {
    fontFamily: fnm, fontWeight: 400, fontSize: 16,
    lineHeight: 1.6, color: "var(--color-text-secondary)",
  };

  const rows = [
    {
      attr: "Activation rate",
      started: <span>14%</span>,
      action: "Linear onboarding → Smart defaults + Sample data + Action-oriented checklist",
      impact: <span style={{ fontFamily: fdm, fontSize: 16, color: "var(--color-brand)", letterSpacing: "-0.3px" }}>14% → 41%</span>,
    },
    {
      attr: "Onb. completion",
      started: <span>30%</span>,
      action: "Replaced rigid wizard with flexible, non-blocking checklist",
      impact: <span style={{ fontFamily: fdm, fontSize: 16, color: "var(--color-brand)", letterSpacing: "-0.3px" }}>30% → 70%</span>,
    },
    {
      attr: "Funnel health",
      started: (
        <span>
          77%{" "}
          <span style={{ fontFamily: fdm, fontSize: 13 }}>drop-off</span>
        </span>
      ),
      action: "Shifted goal from setup completion to enabling evaluation",
      impact: <span style={{ fontFamily: fm, fontWeight: 500, fontSize: 13, color: "var(--color-brand)", letterSpacing: "0.26px" }}>Scalable self-serve conversion</span>,
    },
  ];

  return (
    <div className="w-full py-[120px]" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0">
        <p className="mb-[24px]" style={{ fontFamily: fm, fontWeight: 500, fontSize: 12, letterSpacing: "1.44px", textTransform: "uppercase", color: "var(--color-text-secondary)" }}>Summary</p>
        <h2 className="mb-[80px]" style={{ fontFamily: fnm, fontWeight: 700, fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--color-text-primary)" }}>Before & after</h2>

        <div className="overflow-x-auto">
          <div style={{ minWidth: 640 }}>
            {/* Column headers */}
            <div style={{ display: "grid", gridTemplateColumns: "220px 140px 1fr 260px", gap: "0 24px", paddingBottom: 16, borderBottom: "0.5px solid var(--color-border)" }}>
              <span style={colHdr}>Attribute</span>
              <span style={colHdr}>Started here</span>
              <span style={colHdr}>Action taken</span>
              <span style={colHdr}>Impact</span>
            </div>

            {rows.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "220px 140px 1fr 260px", gap: "0 24px", padding: "28px 0", borderBottom: "0.5px solid var(--color-border)", alignItems: "start" }}>
                <span style={attrStyle}>{row.attr}</span>
                <span style={startedStyle}>{row.started}</span>
                <p style={actionStyle}>{row.action}</p>
                <div>{row.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BeforeAfterMockup ───────────────────────────────────────────────────────
function BeforeAfterMockup() {
  const fm = "'IBM Plex Mono', monospace";
  return (
    <div style={{ background: '#e8ece9', padding: 28, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', borderRadius: 12, overflow: 'hidden', background: '#f9f9f9', boxShadow: '0 32px 80px rgba(0,0,0,0.22),0 2px 4px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
        {/* Titlebar */}
        <div style={{ height: 44, background: 'rgba(248,248,248,0.98)', borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12, flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {(['#ff736a', '#febc2e', '#19c332'] as const).map((c, i) => (
              <div key={i} style={{ width: 13, height: 13, borderRadius: '50%', background: c, border: '0.5px solid rgba(0,0,0,0.15)' }} />
            ))}
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: fm, fontSize: 11, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.04em' }}>Omnipractice.com // Services_configure</span>
          </div>
        </div>
        {/* Content — aspect ratio preserves proportions at all widths */}
        <div style={{ display: 'flex', width: '100%', aspectRatio: '904 / 476', position: 'relative' }}>
          {/* Before pane */}
          <div style={{ width: '50%', height: '100%', overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#fafafa', flexShrink: 0, display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span style={{ fontFamily: fm, fontSize: 9, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa' }}>Before</span>
              <span style={{ fontFamily: fm, fontSize: 11, fontWeight: 500, color: '#888' }}>Manual addition</span>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <img src={I.servicesBefore} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} alt="" />
              {/* White block covers the Omnipractice logo; sits below dim overlay so it gets dimmed too */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: 140, height: 44, background: '#ffffff', zIndex: 3 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(240,240,240,0.55)', zIndex: 4 }} />
            </div>
          </div>
          {/* Divider + arrow badge */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(0,0,0,0.08)', zIndex: 10 }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 40, height: 40, borderRadius: '50%', background: '#888888', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', zIndex: 11 }}>
              <span style={{ color: '#f9f9f9', fontSize: 16, fontFamily: fm, lineHeight: 1 }}>→</span>
            </div>
          </div>
          {/* After pane */}
          <div style={{ width: '50%', height: '100%', overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid rgba(0,133,84,0.15)', background: '#f5fbf8', flexShrink: 0, display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span style={{ fontFamily: fm, fontSize: 9, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#008554' }}>After</span>
              <span style={{ fontFamily: fm, fontSize: 11, fontWeight: 500, color: '#121212' }}>Smart defaults</span>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <img src={I.servicesAfter} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} alt="" />
              {/* Logo cover on after pane — full color, highest z-index */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: 140, height: 44, background: '#ffffff', zIndex: 6 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const body18: React.CSSProperties = { fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 400, fontSize: 18, lineHeight: "28px", color: "var(--color-text-secondary)" };
const body20: React.CSSProperties = { fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: 20, lineHeight: "28px", color: "var(--color-text-secondary)" };

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CaseStudy01() {
  const [dark, setDark] = useState(false);

  return (
    <div className={`min-h-screen${dark ? " dark" : ""}`} style={{ backgroundColor: "var(--color-bg)" }}>

      <Navbar dark={dark} toggleDark={() => setDark(!dark)} />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* HERO                                                               */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full" style={{ backgroundColor: "var(--color-nav-bg)" }}>
        <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 pt-[96px] pb-[24px]">

          {/* Eyebrow */}
          <p className="mb-[16px]" style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 14, letterSpacing: "1.4px", textTransform: "uppercase", lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
            CASE 01 // Activation_OMNIPRACTICE
          </p>

          {/* Fold */}
          <div className="flex flex-col gap-[64px] px-[16px] md:px-[48px] py-[48px]" style={{ backgroundColor: "var(--color-brand)" }}>
            <div className="flex flex-col gap-[32px]">
              <div className="flex flex-col gap-[16px]">
                <h1 style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: "clamp(28px,5vw,48px)", lineHeight: 1.1, letterSpacing: "-0.04em", color: "#ffffff" }}>
                  Designing for user activation against a massive 86% drop-off
                </h1>
                <p style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
                  Activation increased from{" "}
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 15, letterSpacing: "1.2px", color: "#ffffff" }}>14% → 41%</span>
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-[24px] md:gap-[48px]">
                <div className="shrink-0">
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 400, fontSize: 14, letterSpacing: "-0.28px", textTransform: "uppercase", color: "#ffffff" }}>Ben George</p>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 400, fontSize: 14, letterSpacing: "-0.28px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginTop: 4 }}>for Omnipractice</p>
                </div>
                <div className="flex flex-col flex-1 gap-[8px]">
                  <MetaRow label="Role"     value="Design Lead [Feature owner]" labelColor="rgba(255,255,255,0.55)" valueColor="rgba(255,255,255,0.9)" dividerColor="rgba(255,255,255,0.18)" />
                  <MetaRow label="Team"     value="1 Designer, 4 Engineers, 1 PM" labelColor="rgba(255,255,255,0.55)" valueColor="rgba(255,255,255,0.9)" dividerColor="rgba(255,255,255,0.18)" />
                  <MetaRow label="Timeline" value="5 weeks" labelColor="rgba(255,255,255,0.55)" valueColor="rgba(255,255,255,0.9)" dividerColor="rgba(255,255,255,0.18)" />
                  <MetaRow label="Users"    value="Solo & Small mental health clinics [US]" labelColor="rgba(255,255,255,0.55)" valueColor="rgba(255,255,255,0.9)" dividerColor="rgba(255,255,255,0.18)" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* E Summary 2×2 */}
        <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 pb-[24px] pt-[64px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[48px] gap-y-[48px]">
            {[
              { label: "Problem",          body: "Users dropped off before reaching core workflows, limiting adoption and revenue." },
              { label: "Why it mattered",  body: "Low activation reduced conversion from paid sign-ups, skyrocketing acquisition cost." },
              { label: "What we did",      body: "Redesigned onboarding experience around user intent and reduced friction over core workflows." },
              { label: "Impact",           isMetric: true },
            ].map((card) => (
              <div key={card.label} className="flex flex-col gap-[16px] overflow-hidden">
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 14, letterSpacing: "1.4px", textTransform: "uppercase", lineHeight: 1.6, color: "var(--color-text-secondary)" }}>{card.label}</p>
                {card.isMetric ? (
                  <div className="flex flex-col gap-[8px]">
                    <p style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: 18, lineHeight: 1.5, color: "var(--color-text-primary)" }}>Activation improved from</p>
                    <p style={{ fontFamily: "'Departure Mono', monospace", fontSize: 24, lineHeight: 1.5, color: "var(--color-text-primary)" }}>14% → 41%</p>
                  </div>
                ) : (
                  <p style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: 18, lineHeight: 1.5, color: "var(--color-text-primary)" }}>{card.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 01 / CONTEXT                                                       */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full py-[96px]" style={{ backgroundColor: "var(--color-nav-bg)" }}>
        <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 flex flex-col gap-[64px]">
          <SectionHeading num="01" section="context" title="Omnipractice & the leak" />

          <div className="flex flex-col gap-[24px]">
            <BodyRow sideTitle="Omnipractice">
              <p style={body20}>Omnipractice is a web-based SaaS that helps mental health clinics in the US run their practice.</p>
            </BodyRow>

            <BodyRow sideTitle="Challenge">
              <div className="flex flex-col gap-0">
                <p style={{ ...body18, marginBottom: 24 }}>While the Enterprise segment remained stable, the Self-Serve funnel was leaking.</p>
                <p style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: "40px", color: "var(--color-text-secondary)" }}>
                  Marketing campaigns were successfully driving sign-ups, but a large share of these new users{" "}
                  <span style={{ color: "var(--color-alert)" }}>failed to progress to meaningful usage</span>
                  {", "}preventing conversion to paid plans.
                </p>
              </div>
            </BodyRow>

            <BodyRow sideTitle="Activation">
              <div className="flex flex-col gap-0">
                <p style={{ ...body18, marginBottom: 24 }}>
                  Product data showed that users who scheduled even a single session with a client were significantly more likely to convert to a paid plan. This made the first scheduled session a strong indicator of real adoption.
                </p>
                <p style={{ ...body18, marginBottom: 8 }}>We defined activation as:</p>
                <p style={{ ...body20, marginBottom: 24 }}>Activation = First session booked within 7 days of signup.</p>
                <p style={body18}>
                  <span style={{ color: "var(--color-alert)" }}>At the time, only</span>{" "}
                  <strong style={{ color: "var(--color-alert)" }}> 14%</strong>{" "}
                  <span style={{ color: "var(--color-alert)" }}>of self-serve users reached this milestone.</span>
                </p>
              </div>
            </BodyRow>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* GOAL                                                               */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <QuoteBlock label="goal">
        <p style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: "clamp(22px,3vw,40px)", lineHeight: 1.3, color: "var(--color-text-primary)" }}>
          Our goal was to understand why activation was breaking down and help more users reach their{" "}
          <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>first scheduled session.</span>
        </p>
      </QuoteBlock>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 02 / DIAGNOSIS — THE LEAK                                          */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full py-[96px]" style={{ backgroundColor: "var(--color-nav-bg)" }}>
        <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 flex flex-col gap-[64px]">
          <SectionHeading num="02" section="Diagnosis" title="The leak" />

          {/* Existing setup */}
          <div className="flex flex-col gap-[24px]">
            <BodyRow sideTitle="Existing setup">
              <p style={body18}>After signing up, users landed directly in the product and were guided through tooltips and setup banners.</p>
            </BodyRow>
            <div className="flex flex-col md:flex-row gap-[0px] justify-between py-[24px]">
              <div className="flex flex-col gap-[24px] py-[24px] w-full md:w-[calc(50%-12px)]">
                <ImgBlock figNo="fig 02.A" label="Tooltips" src={I.tooltipZ5} caption="Tooltips provided passive guidance within the interface." />
              </div>
              <div className="flex flex-col gap-[24px] py-[24px] w-full md:w-[calc(50%-12px)]">
                <ImgBlock figNo="fig 02.B" label="Banner States" src={I.bannerStates} caption="Setup banners attempted to guide users through essential practice configuration." />
              </div>
            </div>
          </div>

          {/* Behavior */}
          <div className="flex flex-col gap-[24px]">
            <BodyRow sideTitle="Behavior">
              <p style={body18}>
                Before making changes, we looked at where self-serve users were getting stuck.
                <br /><br />
                <strong style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: 20, lineHeight: "28px" }}>Funnel data showed that the most common first action after signup was clicking the Schedule session.</strong>
                <br />
                In contrast, the "My Practice Setup" banner was frequently ignored.
              </p>
            </BodyRow>
          </div>

          {/* Choke points */}
          <div className="flex flex-col gap-[24px]">
            <BodyRow sideTitle="Choke points" sideTitleColor="var(--color-alert)">
              <p style={body18}>Session replays and heat maps revealed two clear choke points:</p>
            </BodyRow>
            <div className="flex flex-col md:flex-row justify-between gap-[0px] py-[24px]">
              <div className="py-[24px] w-full md:w-[calc(50%-12px)]">
                <ImgBlock
                  figNo="fig 02.C" label="Tooltips" accentLabel="Choke Point 1" src={I.choke1}
                  caption="When users attempted to schedule a session, the scheduling modal opened, but required fields such as client, provider, and service were empty. Most users stalled at this step."
                />
              </div>
              <div className="py-[24px] w-full md:w-[calc(50%-12px)]">
                <ImgBlock
                  figNo="fig 02.D" label="Tooltips" accentLabel="Choke Point 2" src={I.choke2}
                  caption="Users who entered My Practice Setup exited the setup flow after completing one or two steps, abandoning the process before finishing the full practice configuration and rarely returning to complete it."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* WORKING CONCLUSION                                                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <QuoteBlock label="Working conclusion">
        <p style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: "clamp(22px,3vw,40px)", lineHeight: 1.3, color: "var(--color-text-primary)" }}>
          Together, this suggested the need for a{" "}
          <span style={{ textDecoration: "underline", textDecorationSkipInk: "none" }}>linear, structured onboarding experience</span>
          {" "}that prepared the user account for scheduling.
        </p>
      </QuoteBlock>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 03 / ITERATION 1                                                   */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full py-[96px]" style={{ backgroundColor: "var(--color-nav-bg)" }}>
        <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 flex flex-col gap-[64px]">
          <SectionHeading num="03" section="Iteration 1" title="We introduced a 6-step linear onboarding wizard" />

          {/* Flow */}
          <div className="flex flex-col gap-[0px]">
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 16, letterSpacing: "0.64px", textTransform: "uppercase", color: "var(--color-text-primary)", lineHeight: 1.6, paddingLeft: 8 }}>Flow</p>
            <div className="flex flex-wrap items-center gap-[0px] py-[8px]">
              {["Sign up", "→", "Profile", "→", "Practice", "→", "Location", "→", "Services", "→", "Team"].map((s, i) => (
                <div key={i} className="flex items-center justify-center py-[8px] px-[8px]">
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: s === "→" ? 400 : 500, fontSize: 16, letterSpacing: "0.64px", textTransform: "uppercase", color: "var(--color-text-primary)", whiteSpace: "nowrap", lineHeight: 1.6 }}>{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step screenshots — 03.A & 03.B side by side */}
          <div className="flex flex-col md:flex-row justify-between py-[24px]">
            <div className="py-[24px] w-full md:w-[calc(50%-12px)]">
              <ImgBlock figNo="fig 03.A" label="Signup" src={I.signup} caption="Users sign up as practice owners using Google or email before entering the onboarding flow." />
            </div>
            <div className="py-[24px] w-full md:w-[calc(50%-12px)]">
              <ImgBlock figNo="fig 03.B" label="Profile Confirmation" src={I.profile} caption="Users confirm their name and profile details before beginning the practice setup process." />
            </div>
          </div>

          {/* 03.C Practice info — full width */}
          <div className="py-[24px]">
            <ImgBlock figNo="fig 03.C" label="Practice Information" src={I.practice} caption="Basic practice information is collected early because it is required across invoices, forms, and documentation." />
          </div>

          {/* 03.D Location — full width */}
          <div className="py-[24px]">
            <ImgBlock figNo="fig 03.D" label="Session Location" src={I.location} caption="Locations specify where sessions take place (offices or telehealth) and are required for scheduling and billing." />
          </div>

          {/* 03.E Services — full width */}
          <div className="py-[24px]">
            <ImgBlock figNo="fig 03.E" label="Services" src={I.servicesBefore} caption="Services define what the practice offers and are required when scheduling sessions, making this a critical setup step for activation." />
          </div>

          {/* 03.F Team — full width */}
          <div className="py-[24px]">
            <ImgBlock figNo="fig 03.F" label="Team Setup" src={I.team} caption="Practice owners can invite additional staff and assign roles. The owner is automatically set up as a provider, allowing practitioners to start scheduling immediately." />
          </div>

          {/* Strategic cuts */}
          <BodyRow sideTitle="Strategic cuts">
            <div>
              <p style={{ ...body20, marginBottom: 24 }}>To reduce friction and shorten time-to-first-session, we removed non-essential setup steps.</p>
              <div style={{ fontSize: 18, lineHeight: "28px", fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 400, color: "var(--color-text-secondary)" }}>
                What got the axe:<br />
                <strong style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500 }}>Availability</strong>
                <br />A must only for client-side online booking. Provider-side scheduling could still work without it.
                <br /><br />
                <strong style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500 }}>Billing and Stripe setup</strong>
                <br />Relevant only after users enabled paid workflows.
              </div>
            </div>
          </BodyRow>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* OUTCOME 1 — PARTIAL SUCCESS                                        */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <OutcomeBlock
        label={`OUTCOME // iter 1:  PARTIAL SUCCESS`}
        metricValue="23%"
        metricLabel="activation rate"
        body={
          <p style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: 20, lineHeight: "28px", color: "var(--color-text-primary)" }}>
            Activation rate increased from 14% to 23%, a 64% lift.{" "}
            <br />However, this meant{" "}
            <span style={{ color: "#c94a3e" }}>77% drop-off without activation</span>
            {", "}making it insufficient and unsustainable for a scalable self-serve funnel.
          </p>
        }
      />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 04 / UNDERSTANDING THE DROP-OFF                                    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full py-[96px]" style={{ backgroundColor: "var(--color-nav-bg)" }}>
        <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 flex flex-col gap-[64px]">
          <SectionHeading num="04" section="Data" title="Understanding the drop-off" />

          {/* Funnel chart */}
          <div className="py-[24px]">
            <ImgBlock figNo="fig 04.A" label="Self Serve Funnel Drop Off" src={I.funnelDropoff} caption="Despite the wizard, the majority of users still abandoned before completing setup." />
          </div>

          {/* Numbers */}
          <BodyRow sideTitle="Numbers">
            <ol style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 400, fontSize: 18, lineHeight: "28px", color: "var(--color-text-secondary)", paddingLeft: 0, listStylePosition: "outside" }}>
              {[
                { label: "High Interest:", body: " 65% of users engaged with the wizard and filled out multiple steps." },
                { label: "Low Finish:", body: " Only 30% actually completed the setup." },
                { label: "The Result:", body: " A massive 77% drop-off, meaning most users left without scheduling their first session.", bold: true },
                { label: "Most skipped:", body: " Services remained the most skipped section in onboarding.", bold: true },
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: 16 }}>
                  <span>{item.label}</span>
                  <strong style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500 }}>{item.body}</strong>
                </li>
              ))}
            </ol>
          </BodyRow>

          {/* Exit interviews */}
          <BodyRow sideTitle="Interviews">
            <div>
              <p style={{ ...body18, marginBottom: 24 }}>We ran exit interviews and a short survey when users dropped off without scheduling a session. The most common response was consistent:</p>
              <p style={body20}>"I haven't finished the setup yet."</p>
            </div>
          </BodyRow>

          {/* User research visual */}
          <div className="py-[24px]">
            <ImgBlock figNo="fig 04.B" label="User Research" src={I.userResearch} caption="Qualitative research surfaced that users understood they needed to set up services — but the blank form caused them to abandon rather than guess." />
          </div>

          {/* Key insight */}
          <BodyRow sideTitle="Root cause">
            <div>
              <p style={{ ...body20, marginBottom: 16 }}>
                The Services step had no defaults, no examples, and required users to know their CPT billing codes upfront.
              </p>
              <p style={body18}>
                Most self-serve users were solo practitioners, unfamiliar with billing codes. Faced with an empty form, they either skipped the step or quit entirely — leaving their account unready for scheduling.
              </p>
            </div>
          </BodyRow>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* INSIGHT                                                            */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <QuoteBlock label="Insight">
        <p style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: "clamp(22px,3vw,40px)", lineHeight: 1.3, color: "var(--color-text-primary)" }}>
          We needed to shift our goal from{" "}
          <em>completing setup</em>{" "}
          to{" "}
          <em>enabling evaluation</em>{" "}
          — and help users reach a positive answer as quickly as possible.
        </p>
      </QuoteBlock>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 05 / ITERATION 2                                                   */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full py-[96px]" style={{ backgroundColor: "var(--color-nav-bg)" }}>
        <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 flex flex-col gap-[64px]">
          <SectionHeading num="05" section="Iteration 2" title="We made 4 deliberate changes." />

          {/* Change 01 — Smart defaults */}
          <div className="flex flex-col gap-[24px]">
            <BodyRow sideTitle="01 / Smart defaults">
              <p style={body18}>
                We pre-populated the Services step with sensible defaults based on common mental health practice types — removing the blank-canvas friction that caused users to pause and abandon.
                <br /><br />
                <strong style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: 20, lineHeight: "28px" }}>
                  Instead of asking users to configure from scratch, we gave them a working setup they could accept, edit, or discard.
                </strong>
              </p>
            </BodyRow>
            <div className="flex flex-col md:flex-row justify-between py-[24px]">
              <div className="py-[24px] w-full md:w-[calc(50%-12px)]">
                <ImgBlock figNo="fig 05.A" label="Services — Redesigned" src={I.servicesAfter} caption="Service types now pre-populated based on common mental health clinic offerings. Users can edit or remove any default." />
              </div>
              <div className="py-[24px] w-full md:w-[calc(50%-12px)]">
                <ImgBlock figNo="fig 05.B" label="Locations — Redesigned" src={I.locationsAfter} caption="Location fields pre-populate with Telehealth as the default — the most common starting point for new practices." />
              </div>
            </div>
            <div className="py-[24px]">
              <div className="flex flex-col gap-[8px]">
                <div style={{ background: "var(--color-image-surface)", border: "0.5px solid #e1e8e5", padding: 24 }}>
                  <div className="flex items-center gap-[4px] mb-[12px]">
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 12, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--color-text-primary)", lineHeight: 1.6 }}>fig 05.C</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: "0.24px", color: "var(--color-text-primary)" }}>//</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 12, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--color-text-primary)", lineHeight: 1.6 }}>Before / After — Services</span>
                  </div>
                  <BeforeAfterMockup />
                </div>
                <p style={{ fontFamily: "'PP Neue Montreal', sans-serif", fontWeight: 500, fontSize: 14, lineHeight: 1.6, color: "var(--color-text-primary)" }}>Left: the empty form users abandoned. Right: smart defaults that users could accept in one click.</p>
              </div>
            </div>
          </div>

          {/* Change 02 — Non-blocking checklist */}
          <div className="flex flex-col gap-[24px]">
            <BodyRow sideTitle="02 / Flexible checklist">
              <p style={body18}>
                The rigid 6-step linear wizard was replaced with a persistent dashboard checklist. Users could complete tasks in any order, skip non-essential steps, and return to incomplete items without losing context.
              </p>
            </BodyRow>
            <div className="py-[24px]">
              <ImgBlock figNo="fig 05.D" label="Onboarding Checklist" src={I.checklist} caption="A persistent checklist replaced the wizard, letting users progress at their own pace in any order." />
            </div>
          </div>

          {/* Change 03 — Sample data */}
          <BodyRow sideTitle="03 / Sample data">
            <p style={body18}>
              We pre-loaded a dummy client and service into new accounts, so users could experience the full scheduling flow immediately — without completing setup first. Seeing the product in action increased confidence and reduced early churn.
            </p>
          </BodyRow>

          {/* Change 04 — Just-in-time requirements */}
          <BodyRow sideTitle="04 / Just-in-time">
            <p style={body18}>
              Instead of forcing users through every setup step upfront, we surfaced requirements just-in-time — only when a user hit a workflow that needed it. Setup became a background task, not a gate.
            </p>
          </BodyRow>

          <div className="py-[24px]">
            <ImgBlock figNo="fig 05.E" label="Final Outcome" src={I.finalOutcome} caption="The combined effect of smart defaults, flexible checklist, and just-in-time prompts drove a step-change in activation." />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* OUTCOME 2 — BREAKTHROUGH                                          */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <FinalOutcomeBlock />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* DESIGN TRADEOFFS                                                   */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full py-[96px]" style={{ backgroundColor: "var(--color-nav-bg)" }}>
        <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 flex flex-col gap-[64px]">
          <SectionHeading num="06" section="Tradeoffs" title="Compliance credentials — when to ask?" />

          <BodyRow sideTitle="The debate">
            <p style={body18}>One of the sharpest debates during the project was whether to collect provider compliance details (license numbers, credentials) during onboarding or defer them to later workflows.</p>
          </BodyRow>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[0px]">
            <div className="p-[32px]" style={{ backgroundColor: "var(--color-bg)", border: "0.5px solid var(--color-border)" }}>
              <p className="mb-[16px]" style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", textTransform: "uppercase", color: "var(--color-brand)" }}>→ For — Collect upfront</p>
              <p style={body18}>Providers are sensitive to compliance (HIPAA, patient data). Asking for credentials early signals legitimacy and professionalism — especially for a new product competing with established players.</p>
            </div>
            <div className="p-[32px]" style={{ backgroundColor: "var(--color-bg)", border: "0.5px solid var(--color-border)" }}>
              <p className="mb-[16px]" style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", textTransform: "uppercase", color: "var(--color-text-muted)" }}>← Against — Defer</p>
              <p style={body18}>Users first want to evaluate: is this product worth switching to? License numbers during onboarding add friction without immediate value — they're only required in billing or insurance workflows.</p>
            </div>
          </div>

          <BodyRow sideTitle="Decision">
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: 20, border: "0.5px solid var(--color-brand)", backgroundColor: "var(--color-brand-surface)" }}>
              <span style={{ color: "var(--color-brand)", fontSize: 16, marginTop: 2 }}>✓</span>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 13, lineHeight: 1.5, color: "var(--color-text-primary)" }}>
                We chose to defer provider compliance details until billing, insurance, or client-facing workflows — when they're actually required.
              </p>
            </div>
          </BodyRow>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* BEFORE & AFTER SUMMARY                                             */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <BeforeAfterSummary />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* FOOTER                                                             */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full" style={{ backgroundColor: "var(--color-footer-bg)" }}>
        <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 py-[20px] flex flex-col md:flex-row justify-between items-center gap-[8px]">
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 400, fontSize: 11, letterSpacing: "0.66px", textTransform: "uppercase", color: "var(--color-footer-text)" }}>
            Case 01 // Activation — Ben George
          </p>
          <a href="/" style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 400, fontSize: 11, letterSpacing: "0.66px", textTransform: "uppercase", color: "var(--color-footer-text)", textDecoration: "none", opacity: 0.7 }}>
            ← Back to portfolio
          </a>
        </div>
      </div>

    </div>
  );
}
