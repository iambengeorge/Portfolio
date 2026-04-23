import { useState, useRef, useCallback } from "react";
import { Sun, Moon } from "lucide-react";

// ------------------------------------------------------------------ //
// Shared helpers
// ------------------------------------------------------------------ //
function useHover() {
  const [hovered, setHovered] = useState(false);
  return {
    hovered,
    bind: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  };
}

function smoothScrollTo(el: HTMLElement) {
  const start = window.scrollY;
  const target = el.getBoundingClientRect().top + window.scrollY;
  const duration = 350;
  const t0 = performance.now();
  const ease = (t: number) => 1 - Math.pow(1 - t, 4);
  const step = (now: number) => {
    const p = Math.min((now - t0) / duration, 1);
    window.scrollTo(0, start + (target - start) * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ------------------------------------------------------------------ //
// Navbar
// ------------------------------------------------------------------ //
function NavLink({ children, onClick, href }: { children: React.ReactNode; onClick?: () => void; href?: string }) {
  const { hovered, bind } = useHover();
  const style: React.CSSProperties = {
    fontFamily: "var(--font-mono)", fontWeight: 500,
    fontSize: "var(--text-label-nav)", letterSpacing: "var(--tracking-label-nav)",
    textTransform: "uppercase", padding: "4px 8px", borderRadius: "var(--radius-xs)",
    cursor: "pointer", transition: "background-color 0.07s, color 0.07s", textDecoration: "none",
    backgroundColor: hovered ? "var(--color-inv-bg)" : "transparent",
    color: hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)",
    border: "none",
  };
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={style} {...bind}>{children}</a>;
  return <button onClick={onClick} style={style} {...bind}>{children}</button>;
}

function Navbar({ dark, toggleDark, onScrollTo }: { dark: boolean; toggleDark: () => void; onScrollTo: (id: string) => void }) {
  const { hovered: toggleHovered, bind: toggleBind } = useHover();
  const { hovered: emailHovered, bind: emailBind } = useHover();

  return (
    <div className="w-full sticky top-0 z-50" style={{ backgroundColor: "var(--color-nav-bg)" }}>
      <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0">
        <div className="flex items-center justify-between py-[16px]">
          <div className="flex gap-[16px] items-center">
            <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <span className="font-['IBM_Plex_Mono'] font-semibold text-[14px] leading-none uppercase" style={{ color: "var(--color-text-primary)" }}>Ben George</span>
            </a>
            <span className="hidden sm:block font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[0.96px] uppercase leading-none" style={{ color: "var(--color-text-tertiary)" }}>/ Case 01</span>
          </div>
          <div className="flex gap-[8px] md:gap-[12px] items-center">
            <button
              onClick={toggleDark}
              className="cursor-pointer p-[4px_8px] rounded-[4px]"
              style={{ color: toggleHovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)", backgroundColor: toggleHovered ? "var(--color-inv-bg)" : "transparent", transition: "background-color 0.07s, color 0.07s", border: "none" }}
              {...toggleBind} aria-label="Toggle dark mode"
            >
              <div className="relative w-[16px] h-[16px]">
                <Sun size={16} strokeWidth={1.5} className={`absolute inset-0 transition-all duration-150 ${dark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`} />
                <Moon size={16} strokeWidth={1.5} className={`absolute inset-0 transition-all duration-150 ${dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`} />
              </div>
            </button>
            <div className="hidden sm:flex gap-[4px] items-center">
              <NavLink onClick={() => onScrollTo("outcome")}>Results</NavLink>
              <NavLink href="https://drive.google.com/file/d/1urZHmHllhfD-G9JwVkBSEJpRsW-Fn4R1/view">Resume</NavLink>
            </div>
            <a
              href="mailto:hello@bengeorge.in"
              className="px-[8px] py-[4px] rounded-[4px] cursor-pointer font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[0.96px] uppercase"
              style={{ backgroundColor: "var(--color-email-bg)", color: "var(--color-email-text)", textDecoration: "none", opacity: emailHovered ? 0.7 : 1, transition: "opacity 0.07s" }}
              {...emailBind}
            >Email</a>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-b border-solid inset-0 pointer-events-none" style={{ borderColor: "var(--color-border)" }} />
    </div>
  );
}

// ------------------------------------------------------------------ //
// Section wrapper
// ------------------------------------------------------------------ //
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[0.96px] uppercase mb-[24px]"
      style={{ color: "var(--color-text-muted)" }}>{children}</p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-['PP_Neue_Montreal'] font-medium text-[28px] md:text-[36px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] mb-[48px]"
      style={{ color: "var(--color-text-primary)" }}>{children}</h2>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-['PP_Neue_Montreal'] font-normal text-[15px] md:text-[17px] leading-[1.6] ${className}`}
      style={{ color: "var(--color-text-secondary)" }}>{children}</p>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[0.96px] uppercase mb-[12px]"
      style={{ color: "var(--color-text-muted)" }}>{children}</p>
  );
}

// ------------------------------------------------------------------ //
// Figure / image with caption
// ------------------------------------------------------------------ //
function Figure({ src, caption, figLabel, alt = "" }: { src: string; caption?: string; figLabel?: string; alt?: string }) {
  return (
    <figure className="flex flex-col gap-[12px]">
      <div className="w-full overflow-hidden rounded-[var(--radius-md)] border" style={{ borderColor: "var(--color-border)" }}>
        <img src={src} alt={alt} className="w-full h-auto block" />
      </div>
      {(figLabel || caption) && (
        <figcaption className="flex flex-col gap-[4px]">
          {figLabel && <span className="font-['IBM_Plex_Mono'] font-medium text-[10px] tracking-[0.06em] uppercase" style={{ color: "var(--color-text-muted)" }}>{figLabel}</span>}
          {caption && <span className="font-['IBM_Plex_Mono'] font-normal text-[11px] leading-[1.5]" style={{ color: "var(--color-text-tertiary)" }}>{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}

// ------------------------------------------------------------------ //
// Callout block (inverted)
// ------------------------------------------------------------------ //
function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="w-full py-[48px] md:py-[64px]" style={{ backgroundColor: "var(--color-inv-bg)" }}>
      <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0">
        <p className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[0.96px] uppercase mb-[20px]"
          style={{ color: "var(--color-inv-text-2)" }}>{label}</p>
        <p className="font-['PP_Neue_Montreal'] font-medium text-[18px] md:text-[22px] lg:text-[26px] leading-[1.4]"
          style={{ color: "var(--color-inv-text-1)" }}>{children}</p>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ //
// Outcome block (inverted with big metric)
// ------------------------------------------------------------------ //
function OutcomeBlock({ label, metrics, body, id }: {
  label: string;
  metrics: { value: string; sublabel: string }[];
  body: string;
  id?: string;
}) {
  return (
    <div id={id} className="w-full py-[64px] md:py-[80px]" style={{ backgroundColor: "var(--color-inv-bg)" }}>
      <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0">
        <p className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[0.96px] uppercase mb-[40px]"
          style={{ color: "var(--color-inv-text-2)" }}>{label}</p>
        <div className="flex flex-wrap gap-[48px] md:gap-[80px] mb-[40px]">
          {metrics.map((m, i) => (
            <div key={i} className="flex flex-col gap-[8px]">
              <p className="font-['Departure_Mono'] font-normal leading-[1] tracking-[0.02em] text-[56px] md:text-[72px]"
                style={{ color: "var(--color-brand)" }}>{m.value}</p>
              <p className="font-['IBM_Plex_Mono'] font-normal text-[11px] tracking-[0.66px] uppercase"
                style={{ color: "var(--color-inv-text-2)" }}>{m.sublabel}</p>
            </div>
          ))}
        </div>
        <p className="font-['PP_Neue_Montreal'] font-normal text-[15px] md:text-[17px] leading-[1.6] max-w-[640px]"
          style={{ color: "var(--color-inv-text-2)" }}>{body}</p>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ //
// Divider
// ------------------------------------------------------------------ //
function Divider() {
  return <div className="w-full border-t" style={{ borderColor: "var(--color-border)" }} />;
}

// ------------------------------------------------------------------ //
// Section container
// ------------------------------------------------------------------ //
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 ${className}`}>
      {children}
    </div>
  );
}

// ------------------------------------------------------------------ //
// Main page
// ------------------------------------------------------------------ //
export default function CaseStudy01() {
  const [dark, setDark] = useState(false);
  const outcomeRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) smoothScrollTo(el);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300${dark ? " dark" : ""}`}
      style={{ backgroundColor: "var(--color-bg)" }}>

      <Navbar dark={dark} toggleDark={() => setDark(!dark)} onScrollTo={scrollTo} />

      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <Section className="pt-[64px] md:pt-[80px] pb-[80px] md:pb-[120px]">
        {/* Eyebrow */}
        <p className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[0.96px] uppercase mb-[24px]"
          style={{ color: "var(--color-text-muted)" }}>CASE 01 // Activation_Omnipractice</p>

        {/* Hero card */}
        <div className="relative rounded-[var(--radius-md)] p-[24px] md:p-[40px] mb-[48px]"
          style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <h1 className="font-['PP_Neue_Montreal'] font-medium text-[28px] md:text-[40px] lg:text-[52px] leading-[1.05] tracking-[-0.02em] mb-[24px]"
            style={{ color: "var(--color-text-primary)" }}>
            Increasing user activation by redesigning onboarding around user intent
          </h1>

          {/* Stat */}
          <p className="font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[0.96px] uppercase mb-[40px]"
            style={{ color: "var(--color-text-secondary)" }}>
            Activation increased from{" "}
            <span style={{ color: "var(--color-brand)" }}>14%</span>
            {" → "}
            <span style={{ color: "var(--color-brand)" }}>41%</span>
          </p>

          {/* Info table */}
          <div className="flex flex-col md:flex-row gap-[24px] md:gap-[48px]">
            <div className="shrink-0">
              <p className="font-['IBM_Plex_Mono'] font-semibold text-[12px] tracking-[0.96px] uppercase"
                style={{ color: "var(--color-text-primary)" }}>Ben George</p>
              <p className="font-['IBM_Plex_Mono'] font-normal text-[12px] tracking-[0.96px] uppercase mt-[4px]"
                style={{ color: "var(--color-text-tertiary)" }}>for Omnipractice</p>
            </div>
            <div className="flex flex-col flex-1 border-t" style={{ borderColor: "var(--color-border)" }}>
              {[
                { label: "Role", value: "Design Lead [Feature Owner]" },
                { label: "Team", value: "1 Designer, 4 Engineers, 1 PM" },
                { label: "Timeline", value: "5 Weeks" },
                { label: "Users", value: "Solo & Small mental health clinics [US]" },
              ].map((row) => (
                <div key={row.label} className="flex gap-[24px] py-[10px] border-b" style={{ borderColor: "var(--color-border)", borderStyle: "dotted" }}>
                  <p className="w-[80px] shrink-0 font-['IBM_Plex_Mono'] font-normal text-[11px] tracking-[0.66px] uppercase"
                    style={{ color: "var(--color-text-muted)" }}>{row.label}</p>
                  <p className="font-['IBM_Plex_Mono'] font-normal text-[11px] tracking-[0.66px] uppercase"
                    style={{ color: "var(--color-text-primary)" }}>{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Executive summary 2×2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]" style={{ backgroundColor: "var(--color-border)" }}>
          {[
            { label: "Problem", body: "Users dropped off before reaching core workflows, limiting adoption and revenue." },
            { label: "Why it mattered", body: "Low activation reduced conversion from paid sign-ups, skyrocketing acquisition cost." },
            { label: "What we did", body: "Redesigned onboarding experience around user intent and reduced friction over core workflows." },
            { label: "Impact", isMetric: true },
          ].map((card) => (
            <div key={card.label} className="p-[24px] md:p-[32px]"
              style={{ backgroundColor: "var(--color-bg)" }}>
              <p className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[0.96px] uppercase mb-[12px]"
                style={{ color: "var(--color-text-muted)" }}>{card.label}</p>
              {card.isMetric ? (
                <div>
                  <p className="font-['PP_Neue_Montreal'] font-normal text-[15px] leading-[1.5] mb-[8px]"
                    style={{ color: "var(--color-text-secondary)" }}>Activation improved from</p>
                  <p className="font-['Departure_Mono'] font-normal text-[36px] leading-[1] tracking-[0.02em]"
                    style={{ color: "var(--color-brand)" }}>14% → 41%</p>
                </div>
              ) : (
                <p className="font-['PP_Neue_Montreal'] font-normal text-[15px] leading-[1.5]"
                  style={{ color: "var(--color-text-secondary)" }}>{card.body}</p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ============================================================ */}
      {/* 01 / CONTEXT                                                  */}
      {/* ============================================================ */}
      <Section className="py-[80px] md:py-[120px]">
        <SectionLabel>01 / Context</SectionLabel>
        <SectionTitle>Omnipractice & the leak</SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-x-[64px] gap-y-[48px]">
          <div className="flex flex-col gap-[32px]">
            <div>
              <SubHeading>Omnipractice</SubHeading>
              <Body>Omnipractice is a web-based SaaS that helps mental health clinics in the US run their practice.</Body>
            </div>
            <div>
              <SubHeading>Challenge</SubHeading>
              <Body>While the Enterprise segment remained stable, the Self-Serve funnel was leaking.</Body>
              <Body className="mt-[16px]">Marketing campaigns were successfully driving sign-ups, but a large share of these new users{" "}
                <strong style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>failed to progress to meaningful usage</strong>,
                {" "}preventing conversion to paid plans.</Body>
            </div>
          </div>
          <div>
            <SubHeading>Activation</SubHeading>
            <Body>Product data showed that users who scheduled even a single session with a client were significantly more likely to convert to a paid plan. This made the first scheduled session a strong indicator of real adoption.</Body>
            <Body className="mt-[16px]">We defined activation as:</Body>
            <div className="mt-[20px] p-[20px] rounded-[var(--radius-sm)] border"
              style={{ borderColor: "var(--color-brand)", backgroundColor: "var(--color-brand-surface)" }}>
              <p className="font-['IBM_Plex_Mono'] font-medium text-[13px] leading-[1.5]"
                style={{ color: "var(--color-text-primary)" }}>
                Activation = First session booked within 7 days of signup.
              </p>
            </div>
            <Body className="mt-[20px]">At the time, only{" "}
              <strong style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>14%</strong>
              {" "}of self-serve users reached this milestone.</Body>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* GOAL CALLOUT                                                   */}
      {/* ============================================================ */}
      <Callout label="Goal">
        Our goal was to understand why activation was breaking down and help more users reach their first scheduled session.
      </Callout>

      <Divider />

      {/* ============================================================ */}
      {/* 02 / DIAGNOSIS                                                 */}
      {/* ============================================================ */}
      <Section className="py-[80px] md:py-[120px]">
        <SectionLabel>02 / Diagnosis</SectionLabel>
        <SectionTitle>The leak</SectionTitle>

        {/* Existing setup */}
        <div className="mb-[64px]">
          <SubHeading>Existing setup</SubHeading>
          <Body className="mb-[32px]">After signing up, users landed directly in the product and were guided through tooltips and setup banners.</Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            <Figure
              src="/images/case-01/tooltip.png"
              figLabel="fig 02.A // Tooltips"
              caption="Tooltips provided passive guidance within the interface."
              alt="Tooltip UI"
            />
            <Figure
              src="/images/case-01/banner-states.png"
              figLabel="fig 02.B // Setup Banners"
              caption="Setup banners attempted to guide users through essential practice configuration."
              alt="Setup banner states"
            />
          </div>
        </div>

        {/* Behavior */}
        <div className="mb-[64px]">
          <SubHeading>Behavior</SubHeading>
          <Body className="mb-[16px]">Before making changes, we looked at where self-serve users were getting stuck.</Body>
          <Body>Funnel data showed that the most common first action after signup was clicking{" "}
            <strong style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>Schedule Session</strong>.
            In contrast, the "My Practice Setup" banner was frequently ignored.</Body>
        </div>

        {/* Choke points */}
        <div>
          <SubHeading>Choke points</SubHeading>
          <Body className="mb-[32px]">Session replays and heat maps revealed two clear choke points:</Body>
          <div className="flex flex-col gap-[32px]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-[24px] items-start">
              <Figure
                src="/images/case-01/choke-1.png"
                figLabel="fig 02.C // Choke point 1"
                caption="When users attempted to schedule a session, the modal opened but required fields such as client, provider, and service were empty. Most users stalled at this step."
                alt="Scheduling modal with empty required fields"
              />
              <Figure
                src="/images/case-01/choke-2.png"
                figLabel="fig 02.D // Choke point 2"
                caption="Users who entered My Practice Setup exited the flow after completing one or two steps, abandoning the process before finishing and rarely returning."
                alt="Practice setup flow abandonment"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* WORKING CONCLUSION CALLOUT                                     */}
      {/* ============================================================ */}
      <Callout label="Working conclusion">
        Together, this suggested the need for a structured onboarding experience that prepared the user account for scheduling — before they ever tried to book a session.
      </Callout>

      <Divider />

      {/* ============================================================ */}
      {/* 03 / ITERATION 1                                               */}
      {/* ============================================================ */}
      <Section className="py-[80px] md:py-[120px]">
        <SectionLabel>03 / Iteration 1</SectionLabel>
        <SectionTitle>We introduced a 6-step linear onboarding wizard</SectionTitle>

        {/* Flow */}
        <div className="flex flex-wrap gap-[0px] mb-[48px] overflow-x-auto">
          {["Sign up", "Profile", "Practice", "Location", "Services", "Team"].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-[0px]">
              <div className="flex items-center gap-[8px] px-[12px] py-[8px] rounded-[var(--radius-xs)]"
                style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
                <span className="font-['IBM_Plex_Mono'] font-normal text-[10px] tracking-[0.06em] uppercase"
                  style={{ color: "var(--color-text-tertiary)" }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[0.06em] uppercase"
                  style={{ color: "var(--color-text-primary)" }}>{step}</span>
              </div>
              {i < arr.length - 1 && (
                <span className="px-[6px] font-['IBM_Plex_Mono'] text-[12px]"
                  style={{ color: "var(--color-text-tertiary)" }}>→</span>
              )}
            </div>
          ))}
        </div>

        {/* 6 step screenshots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] mb-[64px]">
          <Figure src="/images/case-01/onb-signup.png" figLabel="fig 03.A // Signup" caption="Users sign up as practice owners using Google or email before entering the onboarding flow." alt="Sign up screen" />
          <Figure src="/images/case-01/onb-profile.png" figLabel="fig 03.B // Profile confirmation" caption="Users confirm their name and profile details before beginning the practice setup process." alt="Profile confirmation" />
          <Figure src="/images/case-01/onb-practice.png" figLabel="fig 03.C // Practice information" caption="Basic practice information is collected early because it is required across invoices, forms, and documentation." alt="Practice information" />
          <Figure src="/images/case-01/onb-location.png" figLabel="fig 03.D // Session location" caption="Locations specify where sessions take place — offices or telehealth — and are required for scheduling and billing." alt="Session location" />
          <Figure src="/images/case-01/onb-services.png" figLabel="fig 03.E // Services" caption="Services define what the practice offers and are required when scheduling sessions, making this a critical setup step." alt="Services setup" />
          <Figure src="/images/case-01/onb-team.png" figLabel="fig 03.F // Team setup" caption="Practice owners can invite staff and assign roles. The owner is automatically set up as a provider, allowing immediate scheduling." alt="Team setup" />
        </div>

        {/* Strategic cuts */}
        <div className="border-t pt-[48px]" style={{ borderColor: "var(--color-border)" }}>
          <SubHeading>Strategic cuts</SubHeading>
          <Body className="mb-[32px]">To reduce friction and shorten time-to-first-session, we removed non-essential setup steps.</Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            {[
              { title: "Availability", body: "A must only for client-side online booking. Provider-side scheduling could still work without it." },
              { title: "Billing & Stripe setup", body: "Relevant only after users enabled paid workflows — not a day-one requirement." },
            ].map((item) => (
              <div key={item.title} className="p-[20px] rounded-[var(--radius-sm)] border"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-secondary)" }}>
                <p className="font-['IBM_Plex_Mono'] font-medium text-[13px] mb-[8px]"
                  style={{ color: "var(--color-text-primary)" }}>✕ {item.title}</p>
                <p className="font-['PP_Neue_Montreal'] font-normal text-[14px] leading-[1.5]"
                  style={{ color: "var(--color-text-secondary)" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* OUTCOME 01                                                     */}
      {/* ============================================================ */}
      <OutcomeBlock
        label="Outcome // Iter 1: Partial success"
        metrics={[{ value: "23%", sublabel: "Activation rate ↑" }]}
        body="Activation rate increased from 14% to 23% — a 64% lift. However, this meant 77% drop-off without activation, making it insufficient and unsustainable for a scalable self-serve funnel."
      />

      <Divider />

      {/* ============================================================ */}
      {/* 04 / WHY DID IT STILL FAIL                                    */}
      {/* ============================================================ */}
      <Section className="py-[80px] md:py-[120px]">
        <SectionLabel>04 / Post-mortem</SectionLabel>
        <SectionTitle>Why did it still fail?</SectionTitle>

        {/* Funnel chart */}
        <Figure
          src="/images/case-01/funnel-chart.png"
          figLabel="fig 04.A // Self-serve funnel drop-off"
          caption="Despite the wizard, the majority of users still abandoned before completing setup."
          alt="Funnel drop-off chart"
        />

        {/* Numbers */}
        <div className="mt-[48px] flex flex-col gap-[0px]">
          {[
            { num: "01", label: "High Interest", body: "65% of users engaged with the wizard and filled out multiple steps." },
            { num: "02", label: "Low Finish", body: "Only 30% actually completed the full setup." },
            { num: "03", label: "The Result", body: "A massive 77% drop-off — most users left without scheduling their first session.", strong: true },
            { num: "04", label: "Most skipped", body: "Services remained the most skipped section in onboarding.", strong: true },
          ].map((item) => (
            <div key={item.num} className="flex gap-[24px] md:gap-[40px] py-[24px] border-b" style={{ borderColor: "var(--color-border)" }}>
              <p className="font-['Departure_Mono'] font-normal text-[24px] leading-none w-[40px] shrink-0 mt-[4px]"
                style={{ color: "var(--color-text-tertiary)" }}>{item.num}</p>
              <div className="flex flex-col gap-[6px]">
                <p className="font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[0.96px] uppercase"
                  style={{ color: "var(--color-text-muted)" }}>{item.label}</p>
                <p className="font-['PP_Neue_Montreal'] font-normal text-[16px] leading-[1.5]"
                  style={{ color: item.strong ? "var(--color-text-primary)" : "var(--color-text-secondary)", fontWeight: item.strong ? 500 : 400 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Exit survey */}
        <div className="mt-[48px]">
          <SubHeading>Exit survey</SubHeading>
          <Body className="mb-[24px]">When users closed the tab or logged out without scheduling a session, we asked one question: <em>"What stopped you from scheduling your first session today?"</em></Body>
          <Figure
            src="/images/case-01/exit-survey.png"
            figLabel="fig 04.B // Exit survey responses"
            caption={`The most common response was: "I haven't finished the setup yet."`}
            alt="Exit survey responses"
          />
        </div>
      </Section>

      {/* ============================================================ */}
      {/* INSIGHT CALLOUT                                                */}
      {/* ============================================================ */}
      <Callout label="Insight">
        We needed to shift our goal from completing setup to enabling evaluation — and help users reach a positive answer as quickly as possible.
      </Callout>

      <Divider />

      {/* ============================================================ */}
      {/* 05 / ITERATION 2                                               */}
      {/* ============================================================ */}
      <Section className="py-[80px] md:py-[120px]">
        <SectionLabel>05 / Iteration 2</SectionLabel>
        <SectionTitle>We made 4 deliberate changes.</SectionTitle>

        <div className="flex flex-col gap-[80px]">
          {/* Change 01 — Smart defaults */}
          <div>
            <div className="flex items-baseline gap-[16px] mb-[24px]">
              <span className="font-['Departure_Mono'] text-[24px]" style={{ color: "var(--color-text-tertiary)" }}>01</span>
              <p className="font-['IBM_Plex_Mono'] font-medium text-[13px] tracking-[0.06em] uppercase" style={{ color: "var(--color-text-primary)" }}>Smart Defaults</p>
            </div>
            <Body className="mb-[24px]">We pre-populated form fields with sensible defaults based on signup data — timezone, common service types, and provider name — reducing the blank-canvas friction that caused users to pause and abandon.</Body>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              <Figure src="/images/case-01/iter2-services.png" figLabel="fig 05.A // Services — redesigned" caption="Service types now pre-suggested based on common mental health clinic offerings." alt="Redesigned services setup" />
              <Figure src="/images/case-01/iter2-locations.png" figLabel="fig 05.B // Locations — redesigned" caption="Location fields pre-populate with Telehealth as a default, the most common starting point." alt="Redesigned locations setup" />
            </div>
          </div>

          {/* Change 02 — Sample data */}
          <div>
            <div className="flex items-baseline gap-[16px] mb-[24px]">
              <span className="font-['Departure_Mono'] text-[24px]" style={{ color: "var(--color-text-tertiary)" }}>02</span>
              <p className="font-['IBM_Plex_Mono'] font-medium text-[13px] tracking-[0.06em] uppercase" style={{ color: "var(--color-text-primary)" }}>Sample Data</p>
            </div>
            <Body className="mb-[24px]">We pre-loaded a dummy client and service into new accounts, so users could experience the full scheduling flow immediately — without completing setup first. Seeing the product in action increased confidence and reduced early churn.</Body>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              <Figure src="/images/case-01/iter2-screen1.png" figLabel="fig 05.C // Sample client loaded" caption="A pre-loaded sample client lets users immediately attempt scheduling and see the core workflow." alt="Sample client in scheduling flow" />
              <Figure src="/images/case-01/iter2-screen2.png" figLabel="fig 05.D // Sample session" caption="Users can book a sample session end-to-end before any real data is added." alt="Sample session booking" />
            </div>
          </div>

          {/* Change 03 — Non-blocking setup */}
          <div>
            <div className="flex items-baseline gap-[16px] mb-[24px]">
              <span className="font-['Departure_Mono'] text-[24px]" style={{ color: "var(--color-text-tertiary)" }}>03</span>
              <p className="font-['IBM_Plex_Mono'] font-medium text-[13px] tracking-[0.06em] uppercase" style={{ color: "var(--color-text-primary)" }}>Non-blocking Setup</p>
            </div>
            <Body className="mb-[24px]">Instead of forcing users through every setup step upfront, we surfaced requirements just-in-time — only when a user hit a workflow that needed it. Setup became a background task, not a gate.</Body>
            <Figure src="/images/case-01/iter2-screen3.png" figLabel="fig 05.E // Just-in-time prompts" caption="Setup requirements surface inline within the workflow rather than as upfront blockers." alt="Just-in-time setup prompts" />
          </div>

          {/* Change 04 — Action-oriented checklist */}
          <div>
            <div className="flex items-baseline gap-[16px] mb-[24px]">
              <span className="font-['Departure_Mono'] text-[24px]" style={{ color: "var(--color-text-tertiary)" }}>04</span>
              <p className="font-['IBM_Plex_Mono'] font-medium text-[13px] tracking-[0.06em] uppercase" style={{ color: "var(--color-text-primary)" }}>Action-oriented Checklist</p>
            </div>
            <Body className="mb-[24px]">The rigid 6-step linear wizard was replaced with a persistent dashboard checklist. Users could complete tasks in any order, skip non-essential steps, and return to incomplete items without losing context.</Body>
            <Figure src="/images/case-01/iter2-checklist.png" figLabel="fig 05.F // Onboarding checklist" caption="A persistent checklist replaced the wizard, letting users progress at their own pace in any order." alt="Onboarding checklist" />
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* OUTCOME 02                                                     */}
      {/* ============================================================ */}
      <OutcomeBlock
        id="outcome"
        label="Outcome // Iter 2: Breakthrough"
        metrics={[
          { value: "41%", sublabel: "Activation rate ↑" },
          { value: "70%", sublabel: "Onboarding completion ↑" },
        ]}
        body="Activation increased from 23% to ~41%, and this lift translated directly into higher conversion to paid plans and increased revenue from the self-serve funnel. Onboarding completion rates skyrocketed to 85% (from 30%)."
      />

      <Divider />

      {/* ============================================================ */}
      {/* DESIGN TRADEOFFS                                               */}
      {/* ============================================================ */}
      <Section className="py-[80px] md:py-[120px]">
        <SectionLabel>Design Tradeoffs</SectionLabel>
        <SectionTitle>Compliance credentials — when to ask?</SectionTitle>

        <Body className="mb-[48px]">One of the sharpest debates during the project was whether to collect provider compliance details (license numbers, credentials) during onboarding or defer them to later workflows.</Body>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] mb-[32px]" style={{ backgroundColor: "var(--color-border)" }}>
          <div className="p-[24px] md:p-[32px]" style={{ backgroundColor: "var(--color-bg)" }}>
            <p className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[0.96px] uppercase mb-[16px]"
              style={{ color: "var(--color-brand)" }}>→ For — Enable upfront in onboarding</p>
            <Body>Providers are highly sensitive to compliance (HIPAA, patient data), even if they don't fully understand the details. Asking for credentials early signals legitimacy and professionalism — especially for a new product competing with established players. Early compliance setup helps build trust and reduces initial skepticism.</Body>
          </div>
          <div className="p-[24px] md:p-[32px]" style={{ backgroundColor: "var(--color-bg)" }}>
            <p className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[0.96px] uppercase mb-[16px]"
              style={{ color: "var(--color-text-muted)" }}>← Against — Defer to later</p>
            <Body>Users first want to evaluate: is this product worth switching to? Entering license numbers during onboarding adds friction without immediate value. License numbers can be deferred to billing, insurance, or client-facing workflows — when compliance is actually required.</Body>
          </div>
        </div>

        {/* Decision */}
        <div className="flex items-start gap-[16px] p-[20px] rounded-[var(--radius-sm)] border"
          style={{ borderColor: "var(--color-brand)", backgroundColor: "var(--color-brand-surface)" }}>
          <span className="text-[16px] mt-[2px]" style={{ color: "var(--color-brand)" }}>✓</span>
          <p className="font-['IBM_Plex_Mono'] font-medium text-[13px] leading-[1.5]"
            style={{ color: "var(--color-text-primary)" }}>
            We chose to defer provider compliance details until billing, insurance, or client-facing workflows — when they're actually required.
          </p>
        </div>
      </Section>

      <Divider />

      {/* ============================================================ */}
      {/* SUMMARY TABLE                                                  */}
      {/* ============================================================ */}
      <Section className="py-[80px] md:py-[120px]">
        <SectionLabel>Summary</SectionLabel>
        <SectionTitle>Before & after</SectionTitle>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                {["Attribute", "Started here", "Action taken", "Impact"].map((h) => (
                  <th key={h} className="text-left py-[12px] pr-[24px] font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[0.96px] uppercase"
                    style={{ color: "var(--color-text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { attr: "Activation rate", before: "14%", action: "Linear onboarding → Smart defaults + Sample data + Action-oriented checklist", impact: "14% → 41%" },
                { attr: "Onb. completion", before: "30%", action: "Replaced rigid wizard with flexible, non-blocking checklist", impact: "30% → 70%" },
                { attr: "Funnel health", before: "77% drop-off", action: "Shifted goal from setup completion to enabling evaluation", impact: "Scalable self-serve conversion" },
              ].map((row) => (
                <tr key={row.attr} className="border-b" style={{ borderColor: "var(--color-border)" }}>
                  <td className="py-[20px] pr-[24px] font-['IBM_Plex_Mono'] font-medium text-[12px] uppercase tracking-[0.06em] align-top" style={{ color: "var(--color-text-primary)" }}>{row.attr}</td>
                  <td className="py-[20px] pr-[24px] font-['Departure_Mono'] text-[14px] align-top" style={{ color: "var(--color-text-secondary)" }}>{row.before}</td>
                  <td className="py-[20px] pr-[24px] font-['PP_Neue_Montreal'] text-[14px] leading-[1.5] align-top max-w-[280px]" style={{ color: "var(--color-text-secondary)" }}>{row.action}</td>
                  <td className="py-[20px] font-['Departure_Mono'] text-[14px] align-top" style={{ color: "var(--color-brand)" }}>{row.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Divider />

      {/* ============================================================ */}
      {/* FOOTER                                                         */}
      {/* ============================================================ */}
      <div className="w-full transition-colors duration-300" style={{ backgroundColor: "var(--color-footer-bg)" }}>
        <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 py-[20px] flex flex-col md:flex-row justify-between items-center gap-[8px]">
          <p className="font-['IBM_Plex_Mono'] font-normal text-[11px] tracking-[0.66px] uppercase"
            style={{ color: "var(--color-footer-text)" }}>© 2026 Ben George. All rights reserved.</p>
          <a href="/" className="font-['IBM_Plex_Mono'] font-normal text-[11px] tracking-[0.66px] uppercase"
            style={{ color: "var(--color-footer-text)", textDecoration: "none", opacity: 0.7 }}>← Back to portfolio</a>
        </div>
      </div>

    </div>
  );
}
