import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router";

// ─── Font family shorthands (from tokens.css) ─────────────────────────────────
const fH = "var(--font-heading)";   // PP Neue Montreal
const fM = "var(--font-mono)";      // IBM Plex Mono
const fD = "var(--font-data)";      // Departure Mono

// ─── Image paths ─────────────────────────────────────────────────────────────
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
  checklist:          "/images/case01/checklist.png",
  finalOutcome:       "/images/case01/final-outcome.png",
};

// ─── Layout constants ─────────────────────────────────────────────────────────
const OUTER   = "1100px";
const CONTENT = "740px";
const GUTTER  = "60px";

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useHover() {
  const [hovered, setHovered] = useState(false);
  return { hovered, bind: { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) } };
}

// ─── Layout wrappers ─────────────────────────────────────────────────────────

function Wrap({ children }: { children: React.ReactNode }) {
  return <div style={{ maxWidth: OUTER, margin: "0 auto", padding: `0 ${GUTTER}` }}>{children}</div>;
}

function Narrow({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ maxWidth: CONTENT, ...style }}>{children}</div>;
}

// ─── Typography primitives ────────────────────────────────────────────────────

function SecNum({ n }: { n: string }) {
  return (
    <p style={{ fontFamily: fM, fontSize: 13, fontWeight: 400, color: "var(--color-text-tertiary)", marginBottom: 10, letterSpacing: "0.04em" }}>
      {n}
    </p>
  );
}

function SecTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: fH, fontWeight: 700, fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1.06, letterSpacing: "-0.02em", color: "var(--color-text-primary)", margin: "0 0 48px" }}>
      {children}
    </h2>
  );
}

function SubLabel({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <p style={{ fontFamily: fM, fontWeight: 500, fontSize: 11, letterSpacing: "0.9px", textTransform: "uppercase", color: accent ? "var(--color-alert)" : "var(--color-text-tertiary)", marginBottom: 12 }}>
      {children}
    </p>
  );
}

function Body({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{ fontFamily: fH, fontSize: 17, fontWeight: 400, lineHeight: 1.75, color: "var(--color-text-secondary)", margin: 0, ...style }}>
      {children}
    </p>
  );
}

function BodyStrong({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: fH, fontWeight: 500, fontSize: 20, lineHeight: 1.5, color: "var(--color-text-primary)", margin: 0 }}>
      {children}
    </p>
  );
}

// ─── Callout — used for Goal, Working Conclusion, Insight ─────────────────────
// UTK pattern: surface bg + 3px brand left border + 24/32 padding
function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "var(--color-nav-bg)", borderLeft: "3px solid var(--color-brand)", padding: "24px 32px", margin: "48px 0" }}>
      <p style={{ fontFamily: fM, fontWeight: 500, fontSize: 11, letterSpacing: "1px", textTransform: "uppercase", color: "var(--color-brand)", margin: "0 0 16px" }}>
        {label}
      </p>
      <div style={{ fontFamily: fH, fontWeight: 500, fontSize: "clamp(20px, 2.5vw, 32px)", lineHeight: 1.3, color: "var(--color-text-primary)" }}>
        {children}
      </div>
    </div>
  );
}

// ─── StatCallout — large accent metric + description ─────────────────────────
function StatCallout({ value, label, children }: { value: string; label: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: "0.5px solid var(--color-border)", paddingTop: 28, marginTop: 40, marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
        <span style={{ fontFamily: fD, fontSize: 52, fontWeight: 800, lineHeight: 1, letterSpacing: "-2px", color: "var(--color-brand)" }}>{value}</span>
        <span style={{ fontFamily: fM, fontWeight: 500, fontSize: 11, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{label}</span>
      </div>
      <div style={{ fontFamily: fH, fontSize: 17, fontWeight: 400, lineHeight: 1.75, color: "var(--color-text-secondary)", maxWidth: CONTENT }}>
        {children}
      </div>
    </div>
  );
}

// ─── OutcomeMetric ─────────────────────────────────────────────────────────
function OutcomeMetric({ from, to, label }: { from: string; to: string; label: string }) {
  return (
    <div style={{ borderTop: "0.5px solid var(--color-border)", paddingTop: 24 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
        <span style={{ fontFamily: fD, fontSize: 14, color: "var(--color-text-tertiary)" }}>{from}</span>
        <span style={{ fontFamily: fD, fontSize: 18, color: "var(--color-text-tertiary)" }}>→</span>
        <span style={{ fontFamily: fD, fontSize: 48, fontWeight: 800, lineHeight: 1, letterSpacing: "-1.5px", color: "var(--color-brand)" }}>{to}</span>
      </div>
      <p style={{ fontFamily: fM, fontSize: 11, fontWeight: 500, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--color-text-tertiary)", margin: 0 }}>
        {label}
      </p>
    </div>
  );
}

// ─── Fig — image block with figNo, label, caption ────────────────────────────
function Fig({ figNo, label, src, caption, accentLabel, children }: {
  figNo: string; label: string; src?: string; caption?: string; accentLabel?: string; children?: React.ReactNode;
}) {
  return (
    <div style={{ margin: "32px 0" }}>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "4px 8px", marginBottom: 12 }}>
        {accentLabel && (
          <span style={{ fontFamily: fM, fontWeight: 600, fontSize: 11, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--color-alert)" }}>{accentLabel}</span>
        )}
        {accentLabel && <span style={{ fontFamily: fM, fontSize: 11, color: "var(--color-text-tertiary)" }}>·</span>}
        <span style={{ fontFamily: fM, fontWeight: 500, fontSize: 11, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{figNo}</span>
        <span style={{ fontFamily: fM, fontSize: 11, color: "var(--color-text-tertiary)" }}>//</span>
        <span style={{ fontFamily: fM, fontWeight: 500, fontSize: 11, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{label}</span>
      </div>
      <div style={{ border: "0.5px solid var(--color-border)", overflow: "hidden" }}>
        {children ?? <img src={src} alt="" style={{ width: "100%", height: "auto", display: "block" }} />}
      </div>
      {caption && (
        <p style={{ fontFamily: fH, fontSize: 14, fontWeight: 400, lineHeight: 1.6, color: "var(--color-text-tertiary)", marginTop: 10 }}>
          {caption}
        </p>
      )}
    </div>
  );
}

// ─── Two-col figure grid ──────────────────────────────────────────────────────
function FigRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, margin: "32px 0" }}>
      {children}
    </div>
  );
}

// ─── Rule ────────────────────────────────────────────────────────────────────
function Rule() {
  return <div style={{ height: "0.5px", backgroundColor: "var(--color-border)" }} />;
}

// ─── BeforeAfterMockup ────────────────────────────────────────────────────────
function BeforeAfterMockup() {
  return (
    <div style={{ background: "var(--color-nav-bg)", padding: 28, display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", borderRadius: 12, overflow: "hidden", background: "var(--color-image-surface)", boxShadow: "0 32px 80px rgba(0,0,0,0.22),0 2px 4px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 44, background: "rgba(248,248,248,0.98)", borderBottom: "1px solid rgba(0,0,0,0.08)", display: "flex", alignItems: "center", padding: "0 16px", gap: 12, flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {(["#ff736a","#febc2e","#19c332"] as const).map((c, i) => (
              <div key={i} style={{ width: 13, height: 13, borderRadius: "50%", background: c, border: "0.5px solid rgba(0,0,0,0.15)" }} />
            ))}
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: fM, fontSize: 11, color: "rgba(0,0,0,0.4)", letterSpacing: "0.04em" }}>Omnipractice.com // Services_configure</span>
          </div>
        </div>
        <div style={{ display: "flex", width: "100%", aspectRatio: "904 / 476", position: "relative" }}>
          <div style={{ width: "50%", height: "100%", overflow: "hidden", background: "#fff", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px", borderBottom: "1px solid rgba(0,0,0,0.07)", background: "#fafafa", flexShrink: 0, display: "flex", alignItems: "baseline", gap: 16 }}>
              <span style={{ fontFamily: fM, fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa" }}>Before</span>
              <span style={{ fontFamily: fM, fontSize: 11, fontWeight: 500, color: "#888" }}>Manual addition</span>
            </div>
            <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
              <img src={I.servicesBefore} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} alt="" />
              <div style={{ position: "absolute", top: 0, left: 0, width: 140, height: 44, background: "#ffffff", zIndex: 3 }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(240,240,240,0.55)", zIndex: 4 }} />
            </div>
          </div>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(0,0,0,0.08)", zIndex: 10 }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 40, height: 40, borderRadius: "50%", background: "#888888", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.2)", zIndex: 11 }}>
              <span style={{ color: "#f9f9f9", fontSize: 16, fontFamily: fM, lineHeight: 1 }}>→</span>
            </div>
          </div>
          <div style={{ width: "50%", height: "100%", overflow: "hidden", background: "#fff", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px", borderBottom: "1px solid rgba(0,133,84,0.15)", background: "#f5fbf8", flexShrink: 0, display: "flex", alignItems: "baseline", gap: 16 }}>
              <span style={{ fontFamily: fM, fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#008554" }}>After</span>
              <span style={{ fontFamily: fM, fontSize: 11, fontWeight: 500, color: "#121212" }}>Smart defaults</span>
            </div>
            <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
              <img src={I.servicesAfter} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} alt="" />
              <div style={{ position: "absolute", top: 0, left: 0, width: 140, height: 44, background: "#ffffff", zIndex: 6 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BeforeAfterSummary ──────────────────────────────────────────────────────
function BeforeAfterSummary() {
  const colHdr: React.CSSProperties = { fontFamily: fM, fontWeight: 500, fontSize: 11, letterSpacing: "1.1px", textTransform: "uppercase", color: "var(--color-text-tertiary)", lineHeight: 1 };
  const attrStyle: React.CSSProperties = { fontFamily: fM, fontWeight: 500, fontSize: 13, letterSpacing: "0.78px", textTransform: "uppercase", color: "var(--color-text-primary)", lineHeight: 1.5 };
  const startedStyle: React.CSSProperties = { fontFamily: fM, fontSize: 13, color: "var(--color-text-primary)", lineHeight: 1.5 };
  const actionStyle: React.CSSProperties = { fontFamily: fH, fontWeight: 400, fontSize: 16, lineHeight: 1.6, color: "var(--color-text-secondary)" };

  const rows = [
    { attr: "Activation rate", started: <span>14%</span>, action: "Linear onboarding → Smart defaults + Sample data + Action-oriented checklist", impact: <span style={{ fontFamily: fD, fontSize: 16, color: "var(--color-brand)", letterSpacing: "-0.3px" }}>14% → 41%</span> },
    { attr: "Onb. completion", started: <span>30%</span>, action: "Replaced rigid wizard with flexible, non-blocking checklist", impact: <span style={{ fontFamily: fD, fontSize: 16, color: "var(--color-brand)", letterSpacing: "-0.3px" }}>30% → 70%</span> },
    { attr: "Funnel health",   started: <span>77%{" "}<span style={{ fontFamily: fD, fontSize: 13 }}>drop-off</span></span>, action: "Shifted goal from setup completion to enabling evaluation", impact: <span style={{ fontFamily: fM, fontWeight: 500, fontSize: 13, color: "var(--color-brand)", letterSpacing: "0.26px" }}>Scalable self-serve conversion</span> },
  ];

  return (
    <section style={{ paddingTop: 96, paddingBottom: 96, backgroundColor: "var(--color-bg)" }}>
      <Wrap>
        <p style={{ fontFamily: fM, fontWeight: 500, fontSize: 12, letterSpacing: "1.44px", textTransform: "uppercase", color: "var(--color-text-secondary)", marginBottom: 24 }}>Summary</p>
        <h2 style={{ fontFamily: fH, fontWeight: 700, fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--color-text-primary)", marginBottom: 80 }}>Before & after</h2>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 640 }}>
            <div style={{ display: "grid", gridTemplateColumns: "220px 140px 1fr 260px", gap: "0 24px", paddingBottom: 16, borderBottom: "0.5px solid var(--color-border)" }}>
              <span style={colHdr}>Attribute</span><span style={colHdr}>Started here</span><span style={colHdr}>Action taken</span><span style={colHdr}>Impact</span>
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
      </Wrap>
    </section>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const navigate = useNavigate();
  const { hovered: backH, bind: backB } = useHover();
  const { hovered: toggleH, bind: toggleB } = useHover();
  const { hovered: resumeH, bind: resumeB } = useHover();
  const { hovered: emailH, bind: emailB } = useHover();
  const btn: React.CSSProperties = { fontFamily: fM, fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", textTransform: "uppercase", padding: "4px 8px", borderRadius: 4, cursor: "pointer", transition: "background-color 0.07s, color 0.07s", border: "none", background: "transparent", textDecoration: "none", display: "inline-block" };
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "var(--color-nav-bg)", borderBottom: "0.5px solid var(--color-border)" }}>
      <div style={{ maxWidth: OUTER, margin: "0 auto", padding: `0 ${GUTTER}`, display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => navigate("/")} style={{ ...btn, fontWeight: 600, color: backH ? "var(--color-inv-text-1)" : "var(--color-text-primary)", backgroundColor: backH ? "var(--color-inv-bg)" : "transparent" }} {...backB}>Ben George</button>
          <span style={{ fontFamily: fM, fontSize: 12, color: "var(--color-text-tertiary)" }}>/</span>
          <span style={{ fontFamily: fM, fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", textTransform: "uppercase", color: "var(--color-text-secondary)" }}>Case 01</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={toggleDark} style={{ ...btn, color: toggleH ? "var(--color-inv-text-1)" : "var(--color-text-primary)", backgroundColor: toggleH ? "var(--color-inv-bg)" : "transparent", padding: "4px 8px" }} {...toggleB} aria-label="Toggle dark mode">
            <div style={{ position: "relative", width: 16, height: 16 }}>
              <Sun size={16} strokeWidth={1.5} style={{ position: "absolute", inset: 0, transition: "all 0.15s", opacity: dark ? 0 : 1, transform: dark ? "rotate(90deg) scale(0)" : "rotate(0deg) scale(1)" }} />
              <Moon size={16} strokeWidth={1.5} style={{ position: "absolute", inset: 0, transition: "all 0.15s", opacity: dark ? 1 : 0, transform: dark ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)" }} />
            </div>
          </button>
          <a href="https://drive.google.com/file/d/1urZHmHllhfD-G9JwVkBSEJpRsW-Fn4R1/view" target="_blank" rel="noopener noreferrer" style={{ ...btn, color: resumeH ? "var(--color-inv-text-1)" : "var(--color-text-primary)", backgroundColor: resumeH ? "var(--color-inv-bg)" : "transparent" }} {...resumeB}>Resume</a>
          <a href="mailto:hello@bengeorge.in" style={{ ...btn, backgroundColor: "var(--color-email-bg)", color: "var(--color-email-text)", opacity: emailH ? 0.8 : 1, transition: "opacity 0.07s" }} {...emailB}>Email</a>
        </div>
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ children, bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <section style={{ paddingTop: 96, paddingBottom: 56, backgroundColor: bg ?? "var(--color-bg)" }}>
      <Wrap>{children}</Wrap>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CaseStudy01v2() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""} style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <Navbar dark={dark} toggleDark={() => setDark(!dark)} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "var(--color-nav-bg)", paddingTop: 96, paddingBottom: 64 }}>
        <Wrap>
          <p style={{ fontFamily: fM, fontWeight: 500, fontSize: 12, letterSpacing: "1.4px", textTransform: "uppercase", lineHeight: 1.6, color: "var(--color-text-secondary)", marginBottom: 24 }}>
            CASE 01 // Activation_OMNIPRACTICE
          </p>

          {/* Title card — brand fill */}
          <div style={{ backgroundColor: "var(--color-brand)", padding: "48px", marginBottom: 64 }}>
            <h1 style={{ fontFamily: fH, fontWeight: 500, fontSize: "clamp(28px,5vw,48px)", lineHeight: 1.1, letterSpacing: "-0.04em", color: "#ffffff", margin: "0 0 16px", maxWidth: CONTENT }}>
              Designing for user activation against a massive 86% drop-off
            </h1>
            <p style={{ fontFamily: fH, fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.85)", margin: "0 0 40px" }}>
              Activation increased from{" "}
              <span style={{ fontFamily: fM, fontWeight: 700, fontSize: 15, letterSpacing: "1.2px", color: "#ffffff" }}>14% → 41%</span>
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 48px" }}>
              <div>
                <p style={{ fontFamily: fM, fontWeight: 400, fontSize: 14, letterSpacing: "-0.28px", textTransform: "uppercase", color: "#ffffff", margin: 0 }}>Ben George</p>
                <p style={{ fontFamily: fM, fontWeight: 400, fontSize: 14, letterSpacing: "-0.28px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginTop: 4 }}>for Omnipractice</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                {[["Role","Design Lead [Feature owner]"],["Team","1 Designer, 4 Engineers, 1 PM"],["Timeline","5 weeks"],["Users","Solo & Small mental health clinics [US]"]].map(([l,v]) => (
                  <div key={l}>
                    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                      <p style={{ width: 120, flexShrink: 0, fontFamily: fM, fontWeight: 400, fontSize: 14, letterSpacing: "-0.28px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: 0, opacity: 0.8 }}>{l}</p>
                      <p style={{ fontFamily: fM, fontWeight: 500, fontSize: 14, letterSpacing: "0.28px", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", margin: 0 }}>{v}</p>
                    </div>
                    <div style={{ height: "0.5px", backgroundColor: "rgba(255,255,255,0.18)", marginTop: 8 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary 2×2 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "48px 48px" }}>
            {[
              { label: "Problem",         body: "Users dropped off before reaching core workflows, limiting adoption and revenue." },
              { label: "Why it mattered", body: "Low activation reduced conversion from paid sign-ups, skyrocketing acquisition cost." },
              { label: "What we did",     body: "Redesigned onboarding experience around user intent and reduced friction over core workflows." },
              { label: "Impact",          isMetric: true },
            ].map((card) => (
              <div key={card.label}>
                <p style={{ fontFamily: fM, fontWeight: 500, fontSize: 12, letterSpacing: "1.4px", textTransform: "uppercase", lineHeight: 1.6, color: "var(--color-text-secondary)", marginBottom: 12 }}>{card.label}</p>
                {card.isMetric ? (
                  <div>
                    <p style={{ fontFamily: fH, fontWeight: 500, fontSize: 18, lineHeight: 1.5, color: "var(--color-text-primary)", margin: "0 0 4px" }}>Activation improved from</p>
                    <p style={{ fontFamily: fD, fontSize: 24, lineHeight: 1.5, color: "var(--color-text-primary)", margin: 0 }}>14% → 41%</p>
                  </div>
                ) : (
                  <p style={{ fontFamily: fH, fontWeight: 500, fontSize: 18, lineHeight: 1.5, color: "var(--color-text-primary)", margin: 0 }}>{card.body}</p>
                )}
              </div>
            ))}
          </div>
        </Wrap>
      </div>

      {/* ── 01 / Context ──────────────────────────────────────────────────── */}
      <Section>
        <SecNum n="01." />
        <SecTitle>Omnipractice & the leak</SecTitle>
        <Narrow>
          <SubLabel>Omnipractice</SubLabel>
          <BodyStrong>Omnipractice is a web-based SaaS that helps mental health clinics in the US run their practice.</BodyStrong>

          <div style={{ height: 40 }} />

          <SubLabel>Challenge</SubLabel>
          <Body style={{ marginBottom: 20 }}>While the Enterprise segment remained stable, the Self-Serve funnel was leaking.</Body>
          <p style={{ fontFamily: fH, fontWeight: 500, fontSize: 28, lineHeight: 1.3, color: "var(--color-text-secondary)", margin: 0 }}>
            Marketing campaigns were successfully driving sign-ups, but a large share of these new users{" "}
            <span style={{ color: "var(--color-alert)" }}>failed to progress to meaningful usage</span>
            {", "}preventing conversion to paid plans.
          </p>

          <div style={{ height: 40 }} />

          <SubLabel>Activation</SubLabel>
          <Body style={{ marginBottom: 20 }}>Product data showed that users who scheduled even a single session with a client were significantly more likely to convert to a paid plan. This made the first scheduled session a strong indicator of real adoption.</Body>
          <Body style={{ marginBottom: 8 }}>We defined activation as:</Body>
          <BodyStrong>Activation = First session booked within 7 days of signup.</BodyStrong>

          <StatCallout value="14%" label="activation rate at baseline">
            <span style={{ color: "var(--color-alert)" }}>Only 14% of self-serve users reached this milestone</span> — meaning 86% of paid sign-ups were failing to experience the product's core value.
          </StatCallout>
        </Narrow>
        <Callout label="Goal">
          Our goal was to understand why activation was breaking down and help more users reach their{" "}
          <span style={{ fontWeight: 500 }}>first scheduled session.</span>
        </Callout>
      </Section>

      {/* ── 02 / Diagnosis ────────────────────────────────────────────────── */}
      <Section>
        <SecNum n="02." />
        <SecTitle>The leak</SecTitle>
        <Narrow>
          <SubLabel>Existing setup</SubLabel>
          <Body>After signing up, users landed directly in the product and were guided through tooltips and setup banners.</Body>
        </Narrow>

        <FigRow>
          <Fig figNo="fig 02.A" label="Tooltips" src={I.tooltipZ5} caption="Tooltips provided passive guidance within the interface." />
          <Fig figNo="fig 02.B" label="Banner States" src={I.bannerStates} caption="Setup banners attempted to guide users through essential practice configuration." />
        </FigRow>

        <Narrow>
          <SubLabel>Behavior</SubLabel>
          <Body style={{ marginBottom: 20 }}>Before making changes, we looked at where self-serve users were getting stuck.</Body>
          <BodyStrong>Funnel data showed that the most common first action after signup was clicking the Schedule session.</BodyStrong>
          <Body style={{ marginTop: 16 }}>In contrast, the "My Practice Setup" banner was frequently ignored.</Body>

          <div style={{ height: 40 }} />

          <SubLabel accent>Choke points</SubLabel>
          <Body>Session replays and heat maps revealed two clear choke points:</Body>
        </Narrow>

        <FigRow>
          <Fig figNo="fig 02.C" label="Tooltips" accentLabel="Choke Point 1" src={I.choke1} caption="When users attempted to schedule a session, the scheduling modal opened, but required fields such as client, provider, and service were empty. Most users stalled at this step." />
          <Fig figNo="fig 02.D" label="Tooltips" accentLabel="Choke Point 2" src={I.choke2} caption="Users who entered My Practice Setup exited the setup flow after completing one or two steps, abandoning the process before finishing the full practice configuration and rarely returning to complete it." />
        </FigRow>

        <Callout label="Working conclusion">
          Together, this suggested the need for a{" "}
          <span style={{ textDecoration: "underline", textDecorationSkipInk: "none" }}>linear, structured onboarding experience</span>
          {" "}that prepared the user account for scheduling.
        </Callout>
      </Section>

      {/* ── 03 / Iteration 1 ──────────────────────────────────────────────── */}
      <Section>
        <SecNum n="03." />
        <SecTitle>We introduced a 6-step linear onboarding wizard</SecTitle>
        <Narrow>
          <SubLabel>Flow</SubLabel>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0, marginBottom: 40 }}>
            {["Sign up","→","Profile","→","Practice","→","Location","→","Services","→","Team"].map((s, i) => (
              <div key={i} style={{ padding: "8px" }}>
                <p style={{ fontFamily: fM, fontWeight: s === "→" ? 400 : 500, fontSize: 14, letterSpacing: "0.64px", textTransform: "uppercase", color: "var(--color-text-primary)", whiteSpace: "nowrap", lineHeight: 1.6, margin: 0 }}>{s}</p>
              </div>
            ))}
          </div>
        </Narrow>

        <FigRow>
          <Fig figNo="fig 03.A" label="Signup" src={I.signup} caption="Users sign up as practice owners using Google or email before entering the onboarding flow." />
          <Fig figNo="fig 03.B" label="Profile Confirmation" src={I.profile} caption="Users confirm their name and profile details before beginning the practice setup process." />
        </FigRow>

        <Fig figNo="fig 03.C" label="Practice Information" src={I.practice} caption="Basic practice information is collected early because it is required across invoices, forms, and documentation." />
        <Fig figNo="fig 03.D" label="Session Location" src={I.location} caption="Locations specify where sessions take place (offices or telehealth) and are required for scheduling and billing." />
        <Fig figNo="fig 03.E" label="Services" src={I.servicesBefore} caption="Services define what the practice offers and are required when scheduling sessions, making this a critical setup step for activation." />
        <Fig figNo="fig 03.F" label="Team Setup" src={I.team} caption="Practice owners can invite additional staff and assign roles. The owner is automatically set up as a provider, allowing practitioners to start scheduling immediately." />

        <Narrow>
          <SubLabel>Strategic cuts</SubLabel>
          <BodyStrong>To reduce friction and shorten time-to-first-session, we removed non-essential setup steps.</BodyStrong>
          <Body style={{ marginTop: 20 }}>
            What got the axe:<br />
            <strong style={{ fontFamily: fH, fontWeight: 500 }}>Availability</strong><br />
            A must only for client-side online booking. Provider-side scheduling could still work without it.<br /><br />
            <strong style={{ fontFamily: fH, fontWeight: 500 }}>Billing and Stripe setup</strong><br />
            Relevant only after users enabled paid workflows.
          </Body>
        </Narrow>

        <div style={{ marginTop: 64 }}>
          <p style={{ fontFamily: fM, fontWeight: 600, fontSize: 12, letterSpacing: "0.84px", textTransform: "uppercase", color: "var(--color-text-secondary)", marginBottom: 48 }}>
            OUTCOME // Iter 1: PARTIAL SUCCESS
          </p>
          <div style={{ border: "0.5px dashed var(--color-border)", padding: 48 }}>
            <StatCallout value="23%" label="activation rate">
              Activation rate increased from 14% to 23%, a 64% lift.
            </StatCallout>
            <BodyStrong>
              However, this meant{" "}
              <span style={{ color: "var(--color-alert)" }}>77% drop-off without activation</span>
              {", "}making it insufficient and unsustainable for a scalable self-serve funnel.
            </BodyStrong>
          </div>
        </div>
      </Section>

      {/* ── 04 / Understanding the drop-off ──────────────────────────────── */}
      <Section>
        <SecNum n="04." />
        <SecTitle>Understanding the drop-off</SecTitle>

        <Fig figNo="fig 04.A" label="Self Serve Funnel Drop Off" src={I.funnelDropoff} caption="Despite the wizard, the majority of users still abandoned before completing setup." />

        <Narrow>
          <SubLabel>Numbers</SubLabel>
          <ol style={{ fontFamily: fH, fontWeight: 400, fontSize: 17, lineHeight: 1.75, color: "var(--color-text-secondary)", paddingLeft: 0, listStyle: "none", margin: 0 }}>
            {[
              { label: "High Interest:", body: " 65% of users engaged with the wizard and filled out multiple steps." },
              { label: "Low Finish:", body: " Only 30% actually completed the setup." },
              { label: "The Result:", body: " A massive 77% drop-off, meaning most users left without scheduling their first session.", bold: true },
              { label: "Most skipped:", body: " Services remained the most skipped section in onboarding.", bold: true },
            ].map((item, i) => (
              <li key={i} style={{ marginBottom: 16, paddingLeft: 0 }}>
                <span style={{ fontWeight: 500 }}>{item.label}</span>
                <span>{item.body}</span>
              </li>
            ))}
          </ol>

          <div style={{ height: 40 }} />

          <SubLabel>Interviews</SubLabel>
          <Body style={{ marginBottom: 20 }}>We ran exit interviews and a short survey when users dropped off without scheduling a session. The most common response was consistent:</Body>
          <BodyStrong>"I haven't finished the setup yet."</BodyStrong>
        </Narrow>

        <Fig figNo="fig 04.B" label="User Research" src={I.userResearch} caption="Qualitative research surfaced that users understood they needed to set up services — but the blank form caused them to abandon rather than guess." />

        <Narrow>
          <SubLabel>Root cause</SubLabel>
          <BodyStrong>The Services step had no defaults, no examples, and required users to know their CPT billing codes upfront.</BodyStrong>
          <Body style={{ marginTop: 16 }}>Most self-serve users were solo practitioners, unfamiliar with billing codes. Faced with an empty form, they either skipped the step or quit entirely — leaving their account unready for scheduling.</Body>
        </Narrow>

        <Callout label="Insight">
          We needed to shift our goal from{" "}
          <em>completing setup</em>{" "}to{" "}
          <em>enabling evaluation</em>
          {" "}— and help users reach a positive answer as quickly as possible.
        </Callout>
      </Section>

      {/* ── 05 / Iteration 2 ──────────────────────────────────────────────── */}
      <Section>
        <SecNum n="05." />
        <SecTitle>We made 4 deliberate changes.</SecTitle>

        {/* Change 01 */}
        <div style={{ borderTop: "0.5px solid var(--color-border)", paddingTop: 32, marginBottom: 48 }}>
          <p style={{ fontFamily: fM, fontWeight: 500, fontSize: 11, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 16 }}>01 / Smart defaults</p>
          <Narrow>
            <Body style={{ marginBottom: 20 }}>We pre-populated the Services step with sensible defaults based on common mental health practice types — removing the blank-canvas friction that caused users to pause and abandon.</Body>
            <BodyStrong>Instead of asking users to configure from scratch, we gave them a working setup they could accept, edit, or discard.</BodyStrong>
          </Narrow>
          <FigRow>
            <Fig figNo="fig 05.A" label="Services — Redesigned" src={I.servicesAfter} caption="Service types now pre-populated based on common mental health clinic offerings. Users can edit or remove any default." />
            <Fig figNo="fig 05.B" label="Locations — Redesigned" src={I.locationsAfter} caption="Location fields pre-populate with Telehealth as the default — the most common starting point for new practices." />
          </FigRow>
          <Fig figNo="fig 05.C" label="Before / After — Services" caption="Left: the empty form users abandoned. Right: smart defaults that users could accept in one click.">
            <BeforeAfterMockup />
          </Fig>
        </div>

        {/* Change 02 */}
        <div style={{ borderTop: "0.5px solid var(--color-border)", paddingTop: 32, marginBottom: 48 }}>
          <p style={{ fontFamily: fM, fontWeight: 500, fontSize: 11, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 16 }}>02 / Flexible checklist</p>
          <Narrow>
            <Body>The rigid 6-step linear wizard was replaced with a persistent dashboard checklist. Users could complete tasks in any order, skip non-essential steps, and return to incomplete items without losing context.</Body>
          </Narrow>
          <Fig figNo="fig 05.D" label="Onboarding Checklist" src={I.checklist} caption="A persistent checklist replaced the wizard, letting users progress at their own pace in any order." />
        </div>

        {/* Change 03 */}
        <div style={{ borderTop: "0.5px solid var(--color-border)", paddingTop: 32, marginBottom: 48 }}>
          <p style={{ fontFamily: fM, fontWeight: 500, fontSize: 11, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 16 }}>03 / Sample data</p>
          <Narrow>
            <Body>We pre-loaded a dummy client and service into new accounts, so users could experience the full scheduling flow immediately — without completing setup first. Seeing the product in action increased confidence and reduced early churn.</Body>
          </Narrow>
        </div>

        {/* Change 04 */}
        <div style={{ borderTop: "0.5px solid var(--color-border)", paddingTop: 32, marginBottom: 0 }}>
          <p style={{ fontFamily: fM, fontWeight: 500, fontSize: 11, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 16 }}>04 / Just-in-time</p>
          <Narrow>
            <Body>Instead of forcing users through every setup step upfront, we surfaced requirements just-in-time — only when a user hit a workflow that needed it. Setup became a background task, not a gate.</Body>
          </Narrow>
        </div>

        <Fig figNo="fig 05.E" label="Final Outcome" src={I.finalOutcome} caption="The combined effect of smart defaults, flexible checklist, and just-in-time prompts drove a step-change in activation." />

        <div style={{ marginTop: 64 }}>
          <p style={{ fontFamily: fM, fontWeight: 600, fontSize: 12, letterSpacing: "0.84px", textTransform: "uppercase", color: "var(--color-text-secondary)", marginBottom: 48 }}>
            OUTCOME // Iter 2: <span style={{ color: "var(--color-text-primary)" }}>BREAKTHROUGH</span>
          </p>
          <div style={{ border: "0.5px dashed var(--color-border)", padding: 48 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 48, marginBottom: 40 }}>
              <OutcomeMetric from="14%" to="41%" label="activation rate" />
              <OutcomeMetric from="30%" to="70%" label="onb completion" />
            </div>
            <Callout label="Outcome">
              Activation increased from 14% to{" "}
              <span style={{ color: "var(--color-brand)" }}>~41%</span>.
              {" "}Onboarding completion skyrocketed from 30% to{" "}
              <span style={{ color: "var(--color-brand)" }}>70%</span>,
              {" "}and this lift translated directly into higher conversion to paid plans.
            </Callout>
          </div>
        </div>
      </Section>

      {/* ── 06 / Tradeoffs ────────────────────────────────────────────────── */}
      <Section>
        <SecNum n="06." />
        <SecTitle>Compliance credentials — when to ask?</SecTitle>
        <Narrow>
          <SubLabel>The debate</SubLabel>
          <Body>One of the sharpest debates during the project was whether to collect provider compliance details (license numbers, credentials) during onboarding or defer them to later workflows.</Body>
        </Narrow>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, margin: "40px 0" }}>
          <div style={{ padding: 32, backgroundColor: "var(--color-nav-bg)", border: "0.5px solid var(--color-border)" }}>
            <p style={{ fontFamily: fM, fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", textTransform: "uppercase", color: "var(--color-brand)", marginBottom: 16 }}>→ For — Collect upfront</p>
            <Body>Providers are sensitive to compliance (HIPAA, patient data). Asking for credentials early signals legitimacy and professionalism — especially for a new product competing with established players.</Body>
          </div>
          <div style={{ padding: 32, backgroundColor: "var(--color-nav-bg)", border: "0.5px solid var(--color-border)" }}>
            <p style={{ fontFamily: fM, fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 16 }}>← Against — Defer</p>
            <Body>Users first want to evaluate: is this product worth switching to? License numbers during onboarding add friction without immediate value — they're only required in billing or insurance workflows.</Body>
          </div>
        </div>

        <Narrow>
          <SubLabel>Decision</SubLabel>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: 20, border: "0.5px solid var(--color-brand)", backgroundColor: "var(--color-brand-surface)" }}>
            <span style={{ color: "var(--color-brand)", fontSize: 16, marginTop: 2 }}>✓</span>
            <p style={{ fontFamily: fM, fontWeight: 500, fontSize: 13, lineHeight: 1.5, color: "var(--color-text-primary)", margin: 0 }}>
              We chose to defer provider compliance details until billing, insurance, or client-facing workflows — when they're actually required.
            </p>
          </div>
        </Narrow>
      </Section>

      {/* ── Before & After Summary ────────────────────────────────────────── */}
      <BeforeAfterSummary />

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "var(--color-footer-bg)" }}>
        <div style={{ maxWidth: OUTER, margin: "0 auto", padding: `20px ${GUTTER}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: fM, fontWeight: 400, fontSize: 11, letterSpacing: "0.66px", textTransform: "uppercase", color: "var(--color-footer-text)", margin: 0 }}>
            Case 01 // Activation — Ben George
          </p>
          <a href="/" style={{ fontFamily: fM, fontWeight: 400, fontSize: 11, letterSpacing: "0.66px", textTransform: "uppercase", color: "var(--color-footer-text)", textDecoration: "none", opacity: 0.7 }}>
            ← Back to portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
