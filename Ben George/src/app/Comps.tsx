import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router";

// ─── hooks ───────────────────────────────────────────────────────────────────

function useHover() {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  return {
    hovered,
    pressed,
    reset: () => { setHovered(false); setPressed(false); },
    bind: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => { setHovered(false); setPressed(false); },
      onMouseDown:  () => setPressed(true),
      onMouseUp:    () => setPressed(false),
    },
  };
}

// ─── NavLink ─────────────────────────────────────────────────────────────────

function NavLink({ children, onClick, href }: { children: React.ReactNode; onClick?: () => void; href?: string }) {
  const { hovered, bind } = useHover();
  const style: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontWeight: 500,
    fontSize: "var(--text-label-nav)",
    letterSpacing: "var(--tracking-label-nav)",
    textTransform: "uppercase",
    lineHeight: "none",
    padding: "4px 8px",
    borderRadius: "var(--radius-xs)",
    cursor: "pointer",
    transition: "background-color 0.07s, color 0.07s",
    backgroundColor: hovered ? "var(--color-inv-bg)" : "transparent",
    color: hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)",
    textDecoration: "none",
    border: "none",
    background: hovered ? "var(--color-inv-bg)" : "transparent",
  };
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={style} {...bind}>{children}</a>;
  return <button onClick={onClick} style={style} {...bind}>{children}</button>;
}

// ─── SignalCard ───────────────────────────────────────────────────────────────

function SignalCard({ title, description }: { title: string; description: string }) {
  const { hovered, bind } = useHover();
  return (
    <div
      className="relative rounded-[8px] cursor-default"
      style={{ backgroundColor: hovered ? "var(--color-inv-bg)" : "transparent", transition: "background-color 0.07s" }}
      {...bind}
    >
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="flex flex-col gap-[16px] p-[24px] md:p-[32px]">
          <p className="font-['IBM_Plex_Mono'] font-medium leading-[1.2] text-[18px] md:text-[20px]" style={{ color: hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)", transition: "color 0.07s" }}>{title}</p>
          <p className="font-['PP_Neue_Montreal'] font-normal leading-[1.4] text-[14px] md:text-[16px]"  style={{ color: hovered ? "var(--color-inv-text-2)" : "var(--color-text-secondary)", transition: "color 0.07s" }}>{description}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[8px]" style={{ borderColor: hovered ? "transparent" : "var(--color-border)", transition: "border-color 0.07s" }} />
    </div>
  );
}

// ─── CaseCard ─────────────────────────────────────────────────────────────────

function CaseCard({ num, company, title, tags, metrics, href, thumbnail, thumbnailFull, thumbnailReveal = 'up', thumbnailStatic = false, thumbnailBelow = false }: {
  num: string; company: string; title: string; tags: string;
  metrics: { value: string; label: string }[]; href: string; thumbnail?: string; thumbnailFull?: boolean; thumbnailReveal?: 'up' | 'down'; thumbnailStatic?: boolean; thumbnailBelow?: boolean;
}) {
  const { hovered, pressed, reset, bind } = useHover();
  const navigate = useNavigate();
  const pc   = hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)";
  const sc   = hovered ? "var(--color-inv-text-2)" : "var(--color-text-secondary)";
  const tc   = hovered ? "var(--color-inv-text-2)" : "var(--color-text-tertiary)";
  const ease = "cubic-bezier(0.4,0,0.2,1)";

  const animatedThumbnail = thumbnail && !thumbnailStatic && (
    <div style={{ display: "grid", gridTemplateRows: hovered ? "1fr" : "0fr", transition: `grid-template-rows 0.52s ${ease}` }}>
      <div style={{ overflow: "hidden" }}>
        <img
          src={thumbnail}
          alt=""
          draggable={false}
          style={{
            width: "100%",
            ...(thumbnailFull ? {} : {
              height: "clamp(160px, 26vw, 280px)",
              objectFit: "cover" as const,
              objectPosition: "center",
            }),
            display: "block",
            transform: hovered ? "scale(1) translateY(0)" : `scale(1.06) translateY(${thumbnailBelow ? '-16px' : thumbnailReveal === 'down' ? '-16px' : '16px'})`,
            opacity: hovered ? 1 : 0,
            transition: `transform 0.52s ${ease}, opacity 0.38s ease`,
          }}
        />
      </div>
    </div>
  );

  return (
    <div
      className="relative w-full cursor-pointer rounded-[4px] overflow-hidden"
      style={{
        backgroundColor: hovered ? "var(--color-inv-bg)" : "transparent",
        transform: pressed ? "scale(0.988)" : "scale(1)",
        transition: pressed
          ? `transform 0.05s cubic-bezier(0.4,0,0.6,1), background-color 0.07s`
          : `transform 0.12s cubic-bezier(0.0,0,0.2,1), background-color 0.07s`,
      }}
      {...bind}
      onClick={() => { reset(); href.startsWith("/") ? navigate(href) : window.open(href, "_blank", "noopener,noreferrer"); }}
    >
      {thumbnail && thumbnailStatic && (
        <img src={thumbnail} alt="" draggable={false} style={{ width: "100%", ...(thumbnailFull ? {} : { height: "clamp(160px, 26vw, 280px)", objectFit: "cover" as const, objectPosition: "center" }), display: "block" }} />
      )}
      {!thumbnailBelow && animatedThumbnail}
      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-[minmax(0,0.5fr)_minmax(0,4fr)_minmax(0,2fr)] gap-x-[96px] py-[48px] px-[16px]">
        <p className="font-['Departure_Mono'] font-normal leading-none text-[40px] tracking-[0.8px] transition-colors duration-200" style={{ color: sc }}>{num}</p>
        <div className="flex flex-col gap-[32px] justify-center">
          <div className="flex flex-col gap-[16px]">
            <p className="font-['IBM_Plex_Mono'] font-medium leading-none text-[12px] tracking-[0.96px] uppercase transition-colors duration-200" style={{ color: sc }}>{company}</p>
            <p className="font-['PP_Neue_Montreal'] font-medium leading-[1.2] text-[32px] transition-colors duration-200" style={{ color: pc }}>{title}</p>
          </div>
          <p className="font-['IBM_Plex_Mono'] font-normal leading-[1.5] text-[13px] tracking-[0.52px] uppercase transition-colors duration-200" style={{ color: sc }}>{tags}</p>
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-['IBM_Plex_Mono'] font-medium leading-none text-[12px] tracking-[0.96px] uppercase transition-colors duration-200" style={{ color: tc }}>impact</p>
          <div className="flex flex-col gap-[30px]">
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col gap-[8px]">
                <p className="font-['IBM_Plex_Mono'] font-medium leading-[1.2] text-[16px] tracking-[-0.32px] uppercase transition-colors duration-200" style={{ color: pc }}>{m.value}</p>
                <p className="font-['IBM_Plex_Mono'] font-normal leading-[1.2] text-[11px] tracking-[0.66px] uppercase transition-colors duration-200" style={{ color: sc }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Tablet */}
      <div className="hidden md:flex lg:hidden flex-col gap-[24px] py-[36px] px-[16px]">
        <div className="flex gap-[24px] items-start">
          <p className="font-['Departure_Mono'] font-normal leading-none text-[32px] tracking-[0.8px] transition-colors duration-200" style={{ color: sc }}>{num}</p>
          <div className="flex flex-col gap-[12px] flex-1">
            <p className="font-['IBM_Plex_Mono'] font-medium leading-none text-[12px] tracking-[0.96px] uppercase transition-colors duration-200" style={{ color: sc }}>{company}</p>
            <p className="font-['PP_Neue_Montreal'] font-medium leading-[1.2] text-[26px] transition-colors duration-200" style={{ color: pc }}>{title}</p>
          </div>
        </div>
        <p className="font-['IBM_Plex_Mono'] font-normal leading-[1.5] text-[12px] tracking-[0.52px] uppercase transition-colors duration-200" style={{ color: sc }}>{tags}</p>
        <div className="flex flex-col gap-[16px]">
          <p className="font-['IBM_Plex_Mono'] font-medium leading-none text-[12px] tracking-[0.96px] uppercase transition-colors duration-200" style={{ color: tc }}>impact</p>
          <div className="flex gap-[32px]">
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col gap-[8px]">
                <p className="font-['IBM_Plex_Mono'] font-medium leading-[1.2] text-[15px] tracking-[-0.32px] uppercase transition-colors duration-200" style={{ color: pc }}>{m.value}</p>
                <p className="font-['IBM_Plex_Mono'] font-normal leading-[1.2] text-[11px] tracking-[0.66px] uppercase transition-colors duration-200" style={{ color: sc }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="flex md:hidden flex-col gap-[20px] py-[32px] px-[8px]">
        <div className="flex gap-[16px] items-start">
          <p className="font-['Departure_Mono'] font-normal leading-none text-[28px] tracking-[0.8px] transition-colors duration-200" style={{ color: sc }}>{num}</p>
          <div className="flex flex-col gap-[10px] flex-1">
            <p className="font-['IBM_Plex_Mono'] font-medium leading-none text-[11px] tracking-[0.96px] uppercase transition-colors duration-200" style={{ color: sc }}>{company}</p>
            <p className="font-['PP_Neue_Montreal'] font-medium leading-[1.2] text-[22px] transition-colors duration-200" style={{ color: pc }}>{title}</p>
          </div>
        </div>
        <p className="font-['IBM_Plex_Mono'] font-normal leading-[1.5] text-[11px] tracking-[0.52px] uppercase transition-colors duration-200" style={{ color: sc }}>{tags}</p>
        <div className="flex flex-col gap-[12px]">
          <p className="font-['IBM_Plex_Mono'] font-medium leading-none text-[11px] tracking-[0.96px] uppercase transition-colors duration-200" style={{ color: tc }}>impact</p>
          <div className="flex gap-[24px]">
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col gap-[6px]">
                <p className="font-['IBM_Plex_Mono'] font-medium leading-[1.2] text-[14px] tracking-[-0.32px] uppercase transition-colors duration-200" style={{ color: pc }}>{m.value}</p>
                <p className="font-['IBM_Plex_Mono'] font-normal leading-[1.2] text-[10px] tracking-[0.66px] uppercase transition-colors duration-200" style={{ color: sc }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {thumbnailBelow && animatedThumbnail}
      <div aria-hidden="true" className="absolute border-b border-solid inset-0 pointer-events-none" style={{ borderColor: hovered ? "transparent" : "var(--color-border-case)", transition: "border-color 0.07s" }} />
    </div>
  );
}

// ─── ContactCard ──────────────────────────────────────────────────────────────

function ContactCard({ label, linkText, href, onClick }: {
  label: string; linkText: string; href?: string; onClick?: () => void;
}) {
  const { hovered, pressed, reset, bind } = useHover();
  const inner = (
    <div
      className="relative w-full cursor-pointer rounded-[4px]"
      style={{
        backgroundColor: hovered ? "var(--color-inv-bg)" : "transparent",
        transform: pressed ? "scale(0.988)" : "scale(1)",
        transition: pressed
          ? "transform 0.05s cubic-bezier(0.4,0,0.6,1), background-color 0.07s"
          : "transform 0.12s cubic-bezier(0.0,0,0.2,1), background-color 0.07s",
      }}
      {...bind}
    >
      <div className="flex items-center overflow-clip py-[18px] px-[8px]">
        <div className="w-[80px] md:w-[100px] shrink-0">
          <p className="font-['IBM_Plex_Mono'] font-normal leading-[1.2] text-[11px] tracking-[0.66px] uppercase" style={{ color: hovered ? "var(--color-inv-text-2)" : "var(--color-text-muted)", transition: "color 0.07s" }}>{label}</p>
        </div>
        <div className="flex gap-[13px] items-center">
          <p className="font-['IBM_Plex_Mono'] font-medium leading-[20px] text-[14px]" style={{ color: hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)", transition: "color 0.07s" }}>↗</p>
          <p className="font-['IBM_Plex_Mono'] font-normal leading-[20px] text-[12px] md:text-[14px]"   style={{ color: hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)", transition: "color 0.07s" }}>{linkText}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-b border-solid inset-0 pointer-events-none" style={{ borderColor: hovered ? "transparent" : "var(--color-border)", transition: "border-color 0.07s" }} />
    </div>
  );
  if (onClick) return <div onClick={() => { reset(); onClick(); }}>{inner}</div>;
  return <a href={href} target="_blank" rel="noopener noreferrer" onClick={reset}>{inner}</a>;
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div className={`fixed bottom-[32px] left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[16px] pointer-events-none"}`}>
      <div className="bg-[#191d1b] text-[#d1d5d3] font-['IBM_Plex_Mono'] text-[12px] tracking-[0.66px] uppercase px-[20px] py-[12px] rounded-[6px] border border-[#2a2e2c]">
        {message}
      </div>
    </div>
  );
}

// ─── page helpers ─────────────────────────────────────────────────────────────

function Divider() {
  return <div className="w-full" style={{ height: "0.5px", backgroundColor: "var(--color-border)" }} />;
}

function CompSection({ label, note, children }: { label: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-[40px] py-[72px]">
      <div className="flex items-baseline gap-[16px]">
        <p className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[0.96px] uppercase" style={{ color: "var(--color-text-muted)" }}>{label}</p>
        {note && <p className="font-['IBM_Plex_Mono'] font-normal text-[11px] tracking-[0.44px]" style={{ color: "var(--color-text-tertiary)" }}>{note}</p>}
      </div>
      {children}
    </section>
  );
}

function VariantLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['IBM_Plex_Mono'] font-normal text-[10px] tracking-[0.8px] uppercase mb-[12px]" style={{ color: "var(--color-text-tertiary)" }}>{children}</p>
  );
}

// ─── data ─────────────────────────────────────────────────────────────────────

const allCases = [
  { num: "01", company: "Omnipractice", title: "Designing for user activation against a massive 86% drop-off", tags: "Healthcare SaaS · b2b · Lead Designer · 5 weeks", metrics: [{ value: "14 → 41%", label: "activation_rate" }, { value: "30 → 70%", label: "onb_completion" }], href: "/case/01", thumbnail: "/images/thumbnails/case-01.png" },
  { num: "02", company: "Omnipractice", title: "Practice management SaaS for mental health clinics in the US", tags: "Healthcare SaaS · b2b & b2c · Lead Designer · 8 months", metrics: [{ value: "35% decrease", label: "claim_rejections" }, { value: "100+ components", label: "design_system" }], href: "https://wondrous-need-786173.framer.app/", thumbnail: "/images/thumbnails/case-02.png" },
  { num: "03", company: "Fairsplits", title: "Lifestyle finance app for trips and hangouts", tags: "Consumer app · Mobile · 0→1 · Founding designer · 2025", metrics: [{ value: "released", label: "app_store" }, { value: "released", label: "play_store" }], href: "https://www.behance.net/gallery/217296307/Fairsplits-UIUX-Case-study-Bill-splitting-app", thumbnail: "/images/thumbnails/case-03.png" },
];

const signalCards = [
  { title: "0 → 1", description: "Experienced in 0-to-1 environments. I take raw, ambiguous requirements and translate them into structured, launch-ready software." },
  { title: "Design systems", description: "Built and managed core component libraries. I translate complex interface patterns into strict, reusable rules that speed up engineering." },
  { title: "6", description: "Six years in product design, including five continuous years at one startup. I build systems meant to scale, and I stay to maintain and evolve them." },
  { title: "Distributed teams", description: "Collaborated daily with remote engineering teams. I rely on clear, asynchronous documentation to keep cross-timezone projects on schedule." },
];

const contacts = [
  { label: "EMAIL",    linkText: "hello@bengeorge.in",           href: undefined,                                      isEmail: true  },
  { label: "LINKEDIN", linkText: "linkedin.com/in/iambengeorge/", href: "https://linkedin.com/in/iambengeorge/" },
  { label: "BEHANCE",  linkText: "behance.net/ben_george",        href: "https://behance.net/ben_george" },
  { label: "MEDIUM",   linkText: "medium.com/@iambengeorge",      href: "https://medium.com/@iambengeorge" },
];

// ─── HeroTitleCard ────────────────────────────────────────────────────────────

function HeroTitleCard({ variant }: { variant: "bordered" | "brand" }) {
  const isBrand = variant === "brand";

  const bg     = isBrand ? "var(--color-brand)"    : "var(--color-nav-bg)";
  const h1c    = isBrand ? "#ffffff"               : "var(--color-text-primary)";
  const bodyc  = isBrand ? "rgba(255,255,255,0.85)": "var(--color-text-primary)";
  const metricc= isBrand ? "#ffffff"               : "var(--color-brand)";
  const labelc = isBrand ? "rgba(255,255,255,0.55)": "var(--color-text-secondary)";
  const valuec = isBrand ? "rgba(255,255,255,0.9)" : "var(--color-text-secondary)";
  const dividerc = isBrand ? "rgba(255,255,255,0.18)" : "var(--color-border)";
  const border = isBrand ? undefined : "0.5px solid var(--color-border)";

  const fm  = "'IBM Plex Mono', monospace";
  const fnm = "'PP Neue Montreal', sans-serif";

  const metaRows = [
    { label: "Role",     value: "Design Lead [Feature owner]" },
    { label: "Team",     value: "1 Designer, 4 Engineers, 1 PM" },
    { label: "Timeline", value: "5 weeks" },
    { label: "Users",    value: "Solo & Small mental health clinics [US]" },
  ];

  return (
    <div style={{ border, backgroundColor: bg, padding: "48px 48px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {/* H1 + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h1 style={{ fontFamily: fnm, fontWeight: 500, fontSize: "clamp(28px,5vw,48px)", lineHeight: 1.1, letterSpacing: "-0.04em", color: h1c, margin: 0 }}>
            Increasing user activation by redesigning onboarding around user intent
          </h1>
          <p style={{ fontFamily: fnm, fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: bodyc, margin: 0 }}>
            Activation increased from{" "}
            <span style={{ fontFamily: fm, fontWeight: 700, fontSize: 15, letterSpacing: "1.2px", color: metricc }}>14% → 41%</span>
          </p>
        </div>
        {/* Meta */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <p style={{ fontFamily: fm, fontWeight: 400, fontSize: 14, letterSpacing: "-0.28px", textTransform: "uppercase", color: h1c, margin: 0 }}>Ben George</p>
            <p style={{ fontFamily: fm, fontWeight: 400, fontSize: 14, letterSpacing: "-0.28px", textTransform: "uppercase", color: labelc, margin: 0 }}>for Omnipractice</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {metaRows.map(({ label, value }) => (
              <div key={label}>
                <div style={{ display: "flex", gap: 24, alignItems: "center", paddingBottom: 0 }}>
                  <p style={{ width: 120, flexShrink: 0, fontFamily: fm, fontWeight: 400, fontSize: 14, letterSpacing: "-0.28px", textTransform: "uppercase", color: labelc, margin: 0, opacity: 0.8 }}>{label}</p>
                  <p style={{ fontFamily: fm, fontWeight: 500, fontSize: 14, letterSpacing: "0.28px", textTransform: "uppercase", color: valuec, margin: 0 }}>{value}</p>
                </div>
                <div style={{ height: "0.5px", backgroundColor: dividerc, marginTop: 8 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Comps page ───────────────────────────────────────────────────────────────

export default function Comps() {
  const [dark, setDark]   = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });
  const { hovered: toggleHovered, bind: toggleBind } = useHover();
  const { hovered: backHovered, bind: backBind }     = useHover();
  const navigate = useNavigate();

  const showToast = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2000);
  };

  return (
    <div className={`flex flex-col items-center min-h-screen${dark ? " dark" : ""}`} style={{ backgroundColor: "var(--color-bg)" }}>

      {/* ── header ── */}
      <div className="w-full sticky top-0 z-50" style={{ backgroundColor: "var(--color-nav-bg)" }}>
        <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 flex items-center justify-between py-[16px]">
          <div className="flex items-center gap-[12px]">
            <button
              onClick={() => navigate("/")}
              className="font-['IBM_Plex_Mono'] font-semibold text-[14px] leading-none uppercase cursor-pointer px-[8px] py-[4px] rounded-[4px]"
              style={{
                color: backHovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)",
                backgroundColor: backHovered ? "var(--color-inv-bg)" : "transparent",
                transition: "background-color 0.07s, color 0.07s",
                border: "none",
              }}
              {...backBind}
            >
              Ben George
            </button>
            <span className="font-['IBM_Plex_Mono'] text-[12px]" style={{ color: "var(--color-text-tertiary)" }}>/</span>
            <p className="font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[0.96px] uppercase" style={{ color: "var(--color-text-secondary)" }}>Comps</p>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className="cursor-pointer p-[4px_8px] rounded-[4px]"
            style={{
              color: toggleHovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)",
              backgroundColor: toggleHovered ? "var(--color-inv-bg)" : "transparent",
              transition: "background-color 0.07s, color 0.07s",
            }}
            {...toggleBind}
            aria-label="Toggle dark mode"
          >
            <div className="relative w-[16px] h-[16px]">
              <Sun  size={16} strokeWidth={1.5} className={`absolute inset-0 transition-all duration-150 ${dark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`} />
              <Moon size={16} strokeWidth={1.5} className={`absolute inset-0 transition-all duration-150 ${dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`} />
            </div>
          </button>
        </div>
        <div aria-hidden="true" className="absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: "var(--color-border)" }} />
      </div>

      {/* ── content ── */}
      <div className="w-full max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0">

        {/* CaseCard — with thumbnails */}
        <CompSection label="CaseCard" note="hover to preview thumbnail">
          <div className="flex flex-col">
            {allCases.map(c => <CaseCard key={c.num} {...c} />)}
          </div>
        </CompSection>

        <Divider />

        {/* Case 01 thumbnail — variant comparison */}
        <CompSection label="Case 01 // thumbnail variants" note="hover each to compare A vs A2">
          <div className="flex flex-col">
            <VariantLabel>Variant A — clean split, equal weight</VariantLabel>
            <CaseCard
              num="01"
              company="Omnipractice"
              title="Designing for user activation against a massive 86% drop-off"
              tags="Healthcare SaaS · b2b · Lead Designer · 5 weeks"
              metrics={[{ value: "14 → 41%", label: "activation_rate" }, { value: "30 → 70%", label: "onb_completion" }]}
              href="/case/01"
              thumbnail="/images/thumbnails/variant-A.png"
              thumbnailFull
            />
          </div>
          <div className="flex flex-col">
            <VariantLabel>Variant A2 — before dimmed, arrow badge</VariantLabel>
            <CaseCard
              num="01"
              company="Omnipractice"
              title="Designing for user activation against a massive 86% drop-off"
              tags="Healthcare SaaS · b2b · Lead Designer · 5 weeks"
              metrics={[{ value: "14 → 41%", label: "activation_rate" }, { value: "30 → 70%", label: "onb_completion" }]}
              href="/case/01"
              thumbnail="/images/thumbnails/variant-A2.png"
              thumbnailFull
            />
          </div>
          <div className="flex flex-col">
            <VariantLabel>Variant A2 — image below info row</VariantLabel>
            <CaseCard
              num="01"
              company="Omnipractice"
              title="Designing for user activation against a massive 86% drop-off"
              tags="Healthcare SaaS · b2b · Lead Designer · 5 weeks"
              metrics={[{ value: "14 → 41%", label: "activation_rate" }, { value: "30 → 70%", label: "onb_completion" }]}
              href="/case/01"
              thumbnail="/images/thumbnails/variant-A2.png"
              thumbnailFull
              thumbnailBelow
            />
          </div>
        </CompSection>

        <Divider />

        {/* CaseCard — no thumbnail */}
        <CompSection label="CaseCard // no thumbnail" note="fallback — no image">
          <div className="flex flex-col">
            {allCases.map(c => <CaseCard key={c.num} {...c} thumbnail={undefined} />)}
          </div>
        </CompSection>

        <Divider />

        {/* SignalCard */}
        <CompSection label="SignalCard">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px]">
            {signalCards.map((c, i) => <SignalCard key={i} {...c} />)}
          </div>
        </CompSection>

        <Divider />

        {/* NavLink */}
        <CompSection label="NavLink">
          <div>
            <VariantLabel>as button</VariantLabel>
            <div className="flex gap-[4px] flex-wrap">
              <NavLink onClick={() => {}}>Work</NavLink>
              <NavLink onClick={() => {}}>Resume</NavLink>
              <NavLink onClick={() => {}}>Contact</NavLink>
            </div>
          </div>
          <div>
            <VariantLabel>as anchor (opens new tab)</VariantLabel>
            <div className="flex gap-[4px]">
              <NavLink href="https://drive.google.com/file/d/1urZHmHllhfD-G9JwVkBSEJpRsW-Fn4R1/view">Resume ↗</NavLink>
            </div>
          </div>
          <div>
            <VariantLabel>email pill (used in navbar)</VariantLabel>
            <div>
              <button
                className="px-[8px] py-[4px] rounded-[4px] cursor-pointer font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[0.96px] uppercase"
                style={{ backgroundColor: "var(--color-email-bg)", color: "var(--color-email-text)", border: "none" }}
              >
                Email
              </button>
            </div>
          </div>
        </CompSection>

        <Divider />

        {/* ContactCard */}
        <CompSection label="ContactCard">
          <div className="flex flex-col">
            {contacts.map(ct => (
              <ContactCard
                key={ct.label}
                label={ct.label}
                linkText={ct.linkText}
                href={ct.href}
                onClick={ct.isEmail ? () => showToast("Email copied to clipboard!") : undefined}
              />
            ))}
          </div>
        </CompSection>

        <Divider />

        {/* Toast */}
        <CompSection label="Toast">
          <div>
            <VariantLabel>trigger</VariantLabel>
            <button
              onClick={() => showToast("This is a toast notification!")}
              className="font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[0.96px] uppercase px-[16px] py-[10px] rounded-[6px] cursor-pointer"
              style={{ backgroundColor: "var(--color-inv-bg)", color: "var(--color-inv-text-1)", border: "none" }}
            >
              Show toast
            </button>
          </div>
        </CompSection>

        <Divider />

        {/* Case 01 — hero title card variants */}
        <CompSection label="Case 01 // hero title card" note="border vs brand fill">
          <div>
            <VariantLabel>Option A — bordered</VariantLabel>
            <HeroTitleCard variant="bordered" />
          </div>
          <div>
            <VariantLabel>Option B — brand fill (white text, small text ~4.4:1 contrast)</VariantLabel>
            <HeroTitleCard variant="brand" />
          </div>
        </CompSection>

      </div>

      {/* ── footer ── */}
      <div className="w-full mt-[80px]" style={{ backgroundColor: "var(--color-footer-bg)" }}>
        <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 py-[20px]">
          <p className="font-['IBM_Plex_Mono'] font-normal text-[11px] tracking-[0.66px] uppercase" style={{ color: "var(--color-footer-text)" }}>comps // component playground</p>
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
