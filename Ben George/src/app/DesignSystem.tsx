import { useState, useMemo } from "react";
import { Sun, Moon } from "lucide-react";
import tokensRaw from "../styles/tokens.css?raw";

// ------------------------------------------------------------------ //
// Helpers
// ------------------------------------------------------------------ //
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="w-full max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 py-[64px] border-b" style={{ borderColor: "var(--color-border)" }}>
      <p className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[0.06em] uppercase mb-[40px]" style={{ color: "var(--color-text-muted)" }}>{title}</p>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['IBM_Plex_Mono'] font-normal text-[10px] tracking-[0.06em] uppercase mt-[8px]" style={{ color: "var(--color-text-tertiary)" }}>
      {children}
    </p>
  );
}

// ------------------------------------------------------------------ //
// Auto-parse color tokens from tokens.css
// ------------------------------------------------------------------ //

function rgbaToHex(value: string): string {
  const m = value.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return value.trim();
  return `#${parseInt(m[1]).toString(16).padStart(2,"0")}${parseInt(m[2]).toString(16).padStart(2,"0")}${parseInt(m[3]).toString(16).padStart(2,"0")}`;
}

function parseVarsFromBlock(block: string): Record<string, string> {
  const vars: Record<string, string> = {};
  const re = /--(color-[^:\n]+):\s*([^;\n]+);/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    vars[`--${m[1].trim()}`] = m[2].trim();
  }
  return vars;
}

function buildColorGroups(css: string) {
  const rootBlock = css.match(/:root\s*\{([\s\S]*?)\}/)?.[1] ?? "";
  const darkBlock = css.match(/\.dark\s*\{([\s\S]*?)\}/)?.[1] ?? "";
  const light = parseVarsFromBlock(rootBlock);
  const dark  = parseVarsFromBlock(darkBlock);

  // Group by segment after --color-  (e.g. bg, text, border, …)
  const GROUP_LABELS: Record<string, string> = {
    bg: "Background", text: "Text", border: "Border", nav: "Navigation",
    brand: "Brand", alert: "Alert", inv: "Inverted", footer: "Footer",
    email: "Email", image: "Image",
  };
  const GROUP_ORDER = ["bg","nav","image","text","border","brand","alert","inv","footer","email"];

  const buckets: Record<string, { var: string; light: string; dark: string; label: string }[]> = {};
  for (const key of Object.keys(light)) {
    const prefix = key.replace("--color-", "").split("-")[0];
    if (!buckets[prefix]) buckets[prefix] = [];
    const lv = light[key] ?? "";
    const dv = dark[key]  ?? lv;
    const label = key.replace("--color-", "").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" / ");
    buckets[prefix].push({ var: key, light: rgbaToHex(lv), dark: rgbaToHex(dv), label });
  }

  return GROUP_ORDER
    .filter(p => buckets[p])
    .map(p => ({ group: GROUP_LABELS[p] ?? p, tokens: buckets[p] }));
}

function ColorSwatch({ label, cssVar, light, dark }: { label: string; cssVar: string; light: string; dark: string }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="w-full h-[56px] rounded-[6px] overflow-hidden flex border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <div className="flex-1 flex items-end p-[6px]" style={{ backgroundColor: light }}>
          <span className="font-['IBM_Plex_Mono'] text-[9px] tracking-[0.04em] uppercase px-[4px] py-[2px] rounded-[2px]"
            style={{ backgroundColor: "rgba(0,0,0,0.12)", color: "rgba(0,0,0,0.6)" }}>L</span>
        </div>
        <div className="flex-1 flex items-end p-[6px]" style={{ backgroundColor: dark }}>
          <span className="font-['IBM_Plex_Mono'] text-[9px] tracking-[0.04em] uppercase px-[4px] py-[2px] rounded-[2px]"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}>D</span>
        </div>
      </div>
      <div>
        <p className="font-['IBM_Plex_Mono'] font-normal text-[11px]" style={{ color: "var(--color-text-secondary)" }}>{label}</p>
        <p className="font-['IBM_Plex_Mono'] font-normal text-[10px] mt-[1px]" style={{ color: "var(--color-text-tertiary)" }}>{cssVar}</p>
        <div className="flex gap-[8px] mt-[4px]">
          <span className="font-['IBM_Plex_Mono'] font-normal text-[10px]" style={{ color: "var(--color-text-tertiary)" }}>{light}</span>
          <span className="font-['IBM_Plex_Mono'] font-normal text-[10px]" style={{ color: "var(--color-text-tertiary)" }}>·</span>
          <span className="font-['IBM_Plex_Mono'] font-normal text-[10px]" style={{ color: "var(--color-text-tertiary)" }}>{dark}</span>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ //
// Typography data
// ------------------------------------------------------------------ //
const typeStyles = [
  {
    name: "Display H1",
    cssVar: "Display / H1",
    font: "'PP Neue Montreal'",
    size: "var(--text-display-h1)",
    leading: "var(--leading-display-h1)",
    tracking: "var(--tracking-display-h1)",
    weight: 500,
    sample: "I design software.",
  },
  {
    name: "Display H2",
    cssVar: "Display / H2",
    font: "'PP Neue Montreal'",
    size: "var(--text-display-h2)",
    leading: "var(--leading-display-h2)",
    tracking: "var(--tracking-display-h2)",
    weight: 500,
    sample: "Systems that scale.",
  },
  {
    name: "Title 1",
    cssVar: "title / t1",
    font: "'PP Neue Montreal'",
    size: "var(--text-title-1)",
    leading: "var(--leading-title-1)",
    tracking: "var(--tracking-title-1)",
    weight: 500,
    sample: "Section heading",
  },
  {
    name: "Title 2",
    cssVar: "title / t2",
    font: "'IBM Plex Mono'",
    size: "var(--text-title-2)",
    leading: "var(--leading-title-2)",
    tracking: "0em",
    weight: 500,
    sample: "Card title",
  },
  {
    name: "Body 1",
    cssVar: "Body / B1",
    font: "'PP Neue Montreal'",
    size: "var(--text-body-1)",
    leading: "var(--leading-body-1)",
    tracking: "0em",
    weight: 400,
    sample: "For the last 6 years, I've worked in high-speed startup environments, taking products from initial concept to market.",
  },
  {
    name: "Body 2",
    cssVar: "Body / b2",
    font: "'PP Neue Montreal'",
    size: "var(--text-body-2)",
    leading: "var(--leading-body-2)",
    tracking: "0em",
    weight: 400,
    sample: "Secondary body copy — used for descriptions and supporting text.",
  },
  {
    name: "Label Nav",
    cssVar: "Labels / nav",
    font: "'IBM Plex Mono'",
    size: "var(--text-label-nav)",
    leading: "var(--leading-label-nav)",
    tracking: "var(--tracking-label-nav)",
    weight: 500,
    textTransform: "uppercase" as const,
    sample: "Work · Resume · Contact",
  },
  {
    name: "Label 1",
    cssVar: "Labels / L1",
    font: "'IBM Plex Mono'",
    size: "var(--text-label-1)",
    leading: "var(--leading-label-1)",
    tracking: "var(--tracking-label-1)",
    weight: 400,
    textTransform: "uppercase" as const,
    sample: "activation_rate · impact · cases",
  },
  {
    name: "Data Massive",
    cssVar: "Data / D1 Massive",
    font: "'Departure Mono'",
    size: "var(--text-data-massive)",
    leading: "var(--leading-data)",
    tracking: "var(--tracking-data)",
    weight: 400,
    sample: "01",
  },
  {
    name: "Data Small",
    cssVar: "Data / small",
    font: "'Departure Mono'",
    size: "var(--text-data-small)",
    leading: "var(--leading-data-small)",
    tracking: "0em",
    weight: 400,
    sample: "14 → 41%",
  },
];

// ------------------------------------------------------------------ //
// Spacing data
// ------------------------------------------------------------------ //
const spacingTokens = [
  { name: "--space-micro-1", value: "4px", label: "Micro / 1" },
  { name: "--space-micro-2", value: "8px", label: "Micro / 2" },
  { name: "--space-micro-3", value: "12px", label: "Micro / 3" },
  { name: "--space-comp-1", value: "16px", label: "Component / 1" },
  { name: "--space-comp-2", value: "24px", label: "Component / 2" },
  { name: "--space-comp-3", value: "32px", label: "Component / 3" },
  { name: "--space-comp-4", value: "48px", label: "Component / 4" },
  { name: "--space-section-1", value: "80px", label: "Section / 1" },
  { name: "--space-section-2", value: "120px", label: "Section / 2" },
  { name: "--space-section-3", value: "160px", label: "Section / 3" },
];

// ------------------------------------------------------------------ //
// Component samples
// ------------------------------------------------------------------ //
function HoverButton({ children, inverted = false }: { children: React.ReactNode; inverted?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        fontSize: "var(--text-label-nav)",
        letterSpacing: "var(--tracking-label-nav)",
        textTransform: "uppercase",
        padding: "4px 8px",
        borderRadius: "var(--radius-xs)",
        cursor: "pointer",
        transition: "background-color 0.07s, color 0.07s",
        backgroundColor: inverted
          ? hovered ? "var(--color-text-primary)" : "var(--color-inv-bg)"
          : hovered ? "var(--color-inv-bg)" : "transparent",
        color: inverted
          ? hovered ? "var(--color-inv-text-1)" : "var(--color-inv-text-1)"
          : hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)",
        border: "none",
      }}
    >
      {children}
    </button>
  );
}

function EmailBadge() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        fontSize: "var(--text-label-nav)",
        letterSpacing: "var(--tracking-label-nav)",
        textTransform: "uppercase",
        padding: "4px 8px",
        borderRadius: "var(--radius-xs)",
        cursor: "pointer",
        transition: "opacity 0.07s",
        backgroundColor: "var(--color-email-bg)",
        color: "var(--color-email-text)",
        opacity: hovered ? 0.7 : 1,
        border: "none",
      }}
    >
      Email
    </button>
  );
}

function SignalCardSample({ title, description }: { title: string; description: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative rounded-[8px] cursor-default"
      style={{
        backgroundColor: hovered ? "var(--color-inv-bg)" : "transparent",
        transition: "background-color 0.07s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-clip rounded-[inherit]">
        <div className="flex flex-col gap-[16px] p-[24px]">
          <p className="font-['IBM_Plex_Mono'] font-medium leading-[1.2] text-[18px]" style={{ color: hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)", transition: "color 0.07s" }}>{title}</p>
          <p className="font-['PP_Neue_Montreal'] font-normal leading-[1.4] text-[14px]" style={{ color: hovered ? "var(--color-inv-text-2)" : "var(--color-text-secondary)", transition: "color 0.07s" }}>{description}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[8px]" style={{ borderColor: hovered ? "transparent" : "var(--color-border)", transition: "border-color 0.07s" }} />
    </div>
  );
}

function CaseCardSample() {
  const [hovered, setHovered] = useState(false);
  const pc = hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)";
  const sc = hovered ? "var(--color-inv-text-2)" : "var(--color-text-secondary)";
  const tc = hovered ? "var(--color-inv-text-2)" : "var(--color-text-tertiary)";
  return (
    <div
      className="relative w-full cursor-pointer rounded-[4px]"
      style={{
        backgroundColor: hovered ? "var(--color-inv-bg)" : "transparent",
        transition: "background-color 0.07s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid grid-cols-[minmax(0,0.5fr)_minmax(0,4fr)_minmax(0,2fr)] gap-x-[48px] py-[32px] px-[16px]">
        <p className="font-['Departure_Mono'] font-normal leading-none text-[32px] tracking-[0.8px] transition-colors duration-200" style={{ color: sc }}>01</p>
        <div className="flex flex-col gap-[16px] justify-center">
          <p className="font-['IBM_Plex_Mono'] font-medium leading-none text-[12px] tracking-[0.96px] uppercase" style={{ color: sc }}>Omnipractice</p>
          <p className="font-['PP_Neue_Montreal'] font-medium leading-[1.2] text-[22px] transition-colors duration-200" style={{ color: pc }}>Designing for user activation</p>
          <p className="font-['IBM_Plex_Mono'] font-normal leading-[1.5] text-[12px] tracking-[0.52px] uppercase" style={{ color: sc }}>Healthcare SaaS · Lead Designer</p>
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-['IBM_Plex_Mono'] font-medium leading-none text-[12px] tracking-[0.96px] uppercase" style={{ color: tc }}>impact</p>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[6px]">
              <p className="font-['IBM_Plex_Mono'] font-medium leading-[1.2] text-[14px] uppercase" style={{ color: pc }}>14 → 41%</p>
              <p className="font-['IBM_Plex_Mono'] font-normal leading-[1.2] text-[10px] tracking-[0.66px] uppercase" style={{ color: sc }}>activation_rate</p>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-b border-solid inset-0 pointer-events-none" style={{ borderColor: hovered ? "transparent" : "var(--color-border-case)", transition: "border-color 0.07s" }} />
    </div>
  );
}

function ContactCardSample({ label, linkText }: { label: string; linkText: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative w-full cursor-pointer rounded-[4px]"
      style={{ backgroundColor: hovered ? "var(--color-inv-bg)" : "transparent", transition: "background-color 0.07s" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center py-[16px] px-[8px]">
        <div className="w-[80px] shrink-0">
          <p className="font-['IBM_Plex_Mono'] font-normal text-[11px] tracking-[0.66px] uppercase" style={{ color: hovered ? "var(--color-inv-text-2)" : "var(--color-text-muted)", transition: "color 0.07s" }}>{label}</p>
        </div>
        <div className="flex gap-[12px] items-center">
          <p className="font-['IBM_Plex_Mono'] font-medium text-[14px]" style={{ color: hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)", transition: "color 0.07s" }}>↗</p>
          <p className="font-['IBM_Plex_Mono'] font-normal text-[13px]" style={{ color: hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)", transition: "color 0.07s" }}>{linkText}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-b border-solid inset-0 pointer-events-none" style={{ borderColor: hovered ? "transparent" : "var(--color-border)", transition: "border-color 0.07s" }} />
    </div>
  );
}

// ------------------------------------------------------------------ //
// Main page
// ------------------------------------------------------------------ //
export default function DesignSystem() {
  const [dark, setDark] = useState(false);
  const colorGroups = useMemo(() => buildColorGroups(tokensRaw), []);

  return (
    <div className={`min-h-screen transition-colors duration-300${dark ? " dark" : ""}`} style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Header */}
      <div className="w-full sticky top-0 z-50 border-b" style={{ backgroundColor: "var(--color-nav-bg)", borderColor: "var(--color-border)" }}>
        <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 py-[16px] flex items-center justify-between">
          <div className="flex items-center gap-[24px]">
            <a href="/" className="font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[0.96px] uppercase transition-colors" style={{ color: "var(--color-text-secondary)", textDecoration: "none" }}>
              ← Ben George
            </a>
            <p className="font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[0.96px] uppercase" style={{ color: "var(--color-text-primary)" }}>
              Design System
            </p>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className="cursor-pointer p-[4px_8px] rounded-[4px] transition-colors"
            style={{ color: "var(--color-text-primary)", backgroundColor: "transparent", border: "none" }}
            aria-label="Toggle dark mode"
          >
            <div className="relative w-[16px] h-[16px]">
              <Sun size={16} strokeWidth={1.5} className={`absolute inset-0 transition-all duration-150 ${dark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`} />
              <Moon size={16} strokeWidth={1.5} className={`absolute inset-0 transition-all duration-150 ${dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Page title */}
      <div className="w-full max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 pt-[64px] pb-[40px]">
        <p className="font-['PP_Neue_Montreal'] font-medium text-[48px] leading-[1.1] tracking-[-0.02em]" style={{ color: "var(--color-text-primary)" }}>Design System</p>
        <p className="font-['PP_Neue_Montreal'] font-normal text-[16px] leading-[1.5] mt-[12px]" style={{ color: "var(--color-text-secondary)" }}>
          Tokens extracted from Figma · Folio_Home · <span className="font-['IBM_Plex_Mono'] text-[13px]">3awTxcTE10bBXE0ab6sbgW</span>
        </p>
      </div>

      {/* COLORS */}
      <Section title="Colors //">
        {/* Legend */}
        <div className="flex gap-[16px] mb-[32px]">
          <div className="flex items-center gap-[6px]">
            <div className="w-[20px] h-[12px] rounded-[2px]" style={{ backgroundColor: "#f9f9f9", border: "1px solid rgba(0,0,0,0.1)" }} />
            <span className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.06em] uppercase" style={{ color: "var(--color-text-tertiary)" }}>L Neutral (light)</span>
          </div>
          <div className="flex items-center gap-[6px]">
            <div className="w-[20px] h-[12px] rounded-[2px]" style={{ backgroundColor: "#121413" }} />
            <span className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.06em] uppercase" style={{ color: "var(--color-text-tertiary)" }}>Dark T (dark)</span>
          </div>
        </div>
        <div className="flex flex-col gap-[48px]">
          {colorGroups.map((group) => (
            <div key={group.group}>
              <p className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[0.06em] uppercase mb-[16px]" style={{ color: "var(--color-text-secondary)" }}>{group.group}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[16px]">
                {group.tokens.map((t) => (
                  <ColorSwatch key={t.var} label={t.label} cssVar={t.var} light={t.light} dark={t.dark} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TYPOGRAPHY */}
      <Section title="Typography //">
        <div className="flex flex-col">
          {typeStyles.map((s) => (
            <div key={s.name} className="flex flex-col md:flex-row md:items-baseline gap-[8px] md:gap-[40px] py-[24px] border-b" style={{ borderColor: "var(--color-border)" }}>
              <div className="w-[140px] shrink-0">
                <p className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[0.06em] uppercase" style={{ color: "var(--color-text-muted)" }}>{s.name}</p>
                <p className="font-['IBM_Plex_Mono'] font-normal text-[10px] mt-[2px]" style={{ color: "var(--color-text-tertiary)" }}>{s.cssVar}</p>
              </div>
              <p
                style={{
                  fontFamily: s.font,
                  fontSize: s.size,
                  lineHeight: s.leading,
                  letterSpacing: s.tracking,
                  fontWeight: s.weight,
                  textTransform: s.textTransform,
                  color: "var(--color-text-primary)",
                  flex: 1,
                  overflow: "hidden",
                }}
              >
                {s.sample}
              </p>
              <div className="hidden md:flex flex-col items-end gap-[2px] w-[160px] shrink-0">
                <p className="font-['IBM_Plex_Mono'] font-normal text-[10px]" style={{ color: "var(--color-text-tertiary)" }}>{s.size}</p>
                <p className="font-['IBM_Plex_Mono'] font-normal text-[10px]" style={{ color: "var(--color-text-tertiary)" }}>lh {s.leading}</p>
                <p className="font-['IBM_Plex_Mono'] font-normal text-[10px]" style={{ color: "var(--color-text-tertiary)" }}>ls {s.tracking}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SPACING */}
      <Section title="Spacing //">
        <div className="flex flex-col gap-[12px]">
          {spacingTokens.map((s) => (
            <div key={s.name} className="flex items-center gap-[24px]">
              <div className="w-[160px] shrink-0">
                <p className="font-['IBM_Plex_Mono'] font-normal text-[11px]" style={{ color: "var(--color-text-secondary)" }}>{s.name}</p>
                <p className="font-['IBM_Plex_Mono'] font-normal text-[10px] mt-[2px]" style={{ color: "var(--color-text-tertiary)" }}>{s.label}</p>
              </div>
              <div
                className="rounded-[2px]"
                style={{
                  width: s.value,
                  height: "20px",
                  backgroundColor: "var(--color-brand)",
                  flexShrink: 0,
                }}
              />
              <p className="font-['IBM_Plex_Mono'] font-medium text-[11px]" style={{ color: "var(--color-text-primary)" }}>{s.value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* COMPONENTS */}
      <Section title="Components //">
        <div className="flex flex-col gap-[48px]">

          {/* Nav buttons */}
          <div>
            <Label>NavLink — hover to see invert</Label>
            <div className="flex gap-[8px] mt-[16px] flex-wrap items-center">
              <HoverButton>Work</HoverButton>
              <HoverButton>Resume</HoverButton>
              <HoverButton>Contact</HoverButton>
              <EmailBadge />
            </div>
          </div>

          {/* Signal cards */}
          <div>
            <Label>Signal Cards — hover to see invert</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mt-[16px]">
              <SignalCardSample title="0 → 1" description="Experienced in 0-to-1 environments. I take raw, ambiguous requirements and translate them into structured, launch-ready software." />
              <SignalCardSample title="Design systems" description="Built and managed core component libraries. I translate complex interface patterns into strict, reusable rules." />
            </div>
          </div>

          {/* Case card */}
          <div>
            <Label>Case Card — hover to see invert</Label>
            <div className="mt-[16px]">
              <CaseCardSample />
            </div>
          </div>

          {/* Contact cards */}
          <div>
            <Label>Contact Row — hover to see invert</Label>
            <div className="mt-[16px]">
              <ContactCardSample label="Email" linkText="hello@bengeorge.in" />
              <ContactCardSample label="LinkedIn" linkText="linkedin.com/in/iambengeorge/" />
              <ContactCardSample label="Behance" linkText="behance.net/ben_george" />
            </div>
          </div>

          {/* Toast */}
          <div>
            <Label>Toast</Label>
            <div className="mt-[16px]">
              <div className="inline-block bg-[#191d1b] text-[#d1d5d3] font-['IBM_Plex_Mono'] text-[12px] tracking-[0.66px] uppercase px-[20px] py-[12px] rounded-[6px] border border-[#2a2e2c]">
                Email copied to clipboard!
              </div>
            </div>
          </div>

          {/* Footer */}
          <div>
            <Label>Footer</Label>
            <div className="mt-[16px] rounded-[6px] overflow-hidden" style={{ backgroundColor: "var(--color-footer-bg)" }}>
              <div className="px-[24px] py-[20px] flex flex-col md:flex-row justify-between items-center gap-[8px]">
                <p className="font-['IBM_Plex_Mono'] font-normal text-[11px] tracking-[0.66px] uppercase" style={{ color: "var(--color-footer-text)" }}>© 2026 BEN GEORGE. ALL RIGHTS RESERVED.</p>
                <p className="font-['IBM_Plex_Mono'] font-normal text-[11px] tracking-[0.66px] uppercase" style={{ color: "var(--color-footer-text)" }}>say hello@bengeorge.in</p>
              </div>
            </div>
          </div>

        </div>
      </Section>

      {/* Token reference */}
      <Section title="Token Reference //">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[48px] gap-y-[8px]">
          {[
            ["--font-heading", "'PP Neue Montreal'"],
            ["--font-mono", "'IBM Plex Mono'"],
            ["--font-data", "'Departure Mono'"],
            ["--container-width", "940px"],
            ["--space-col-gap", "96px"],
            ["--radius-xs", "4px"],
            ["--radius-sm", "6px"],
            ["--radius-md", "8px"],
          ].map(([name, value]) => (
            <div key={name} className="flex justify-between py-[8px] border-b" style={{ borderColor: "var(--color-border)" }}>
              <p className="font-['IBM_Plex_Mono'] font-normal text-[12px]" style={{ color: "var(--color-text-primary)" }}>{name}</p>
              <p className="font-['IBM_Plex_Mono'] font-normal text-[12px]" style={{ color: "var(--color-text-secondary)" }}>{value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Bottom pad */}
      <div className="h-[80px]" />
    </div>
  );
}
