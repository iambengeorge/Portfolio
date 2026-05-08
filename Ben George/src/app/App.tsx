import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { Sun, Moon } from "lucide-react";
import sceneJson from "../imports/space_for_mind_remix-1.json";

const UNICORN_SDK_URL = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.9/dist/unicornStudio.umd.js";
const SCENE_PROJECT_ID = (sceneJson as any).id as string;

function UnicornBg({ opacity }: { opacity: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      // Skip in headless prerender environments (Puppeteer sets navigator.webdriver)
      if (navigator.webdriver) return;
      if (!(window as any).UnicornStudio) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement("script");
          s.src = UNICORN_SDK_URL;
          s.onload = () => resolve();
          s.onerror = () => reject(new Error("Failed to load SDK"));
          document.head.appendChild(s);
        });
      }
      if (cancelled || !containerRef.current) return;

      const US = (window as any).UnicornStudio;
      if (!US?.addScene) return;

      const originalFetch = window.fetch;
      window.fetch = async function patchedFetch(input: any, init?: any) {
        const url = typeof input === "string" ? input : input?.url || "";
        if (url.includes(SCENE_PROJECT_ID)) {
          return new Response(JSON.stringify(sceneJson), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        return originalFetch.call(window, input, init);
      };

      try {
        const scene = await US.addScene({
          elementId: containerRef.current.id,
          fps: 60,
          scale: 1,
          dpi: 1.5,
          projectId: SCENE_PROJECT_ID,
          production: false,
          lazyLoad: false,
        });
        if (!cancelled && scene) {
          sceneRef.current = scene;
        } else {
          scene?.destroy();
        }
      } catch (e) {
        console.error("Unicorn scene init error:", e);
      } finally {
        window.fetch = originalFetch;
      }
    }

    init();
    return () => {
      cancelled = true;
      sceneRef.current?.destroy();
      sceneRef.current = null;
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        id="unicorn-bg"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity }}
      />
      <style>{`
        #unicorn-bg a[href*="unicorn.studio"],
        #unicorn-bg a[href*="unicornstudio"],
        [data-us-project] a[href*="unicorn.studio"],
        [data-us-project] a[href*="unicornstudio"],
        a[href*="unicorn.studio"][target="_blank"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
          position: absolute !important;
          clip: rect(0,0,0,0) !important;
        }
        #unicorn-bg canvas,
        [data-us-project] canvas {
          border: none !important;
          outline: none !important;
          border-radius: 0 !important;
        }
      `}</style>
    </>
  );
}

function useISTClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const h = ist.getHours();
      const m = ist.getMinutes().toString().padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      setTime(`${h % 12 || 12}:${m} ${ampm}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

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
      onMouseDown: () => setPressed(true),
      onMouseUp: () => setPressed(false),
    },
  };
}

function smoothScrollTo(element: HTMLElement) {
  const start = window.scrollY;
  const target = element.getBoundingClientRect().top + window.scrollY;
  const distance = target - start;
  const duration = 350;
  const startTime = performance.now();
  function easeOutQuart(t: number) { return 1 - Math.pow(1 - t, 4); }
  function step(now: number) {
    const p = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, start + distance * easeOutQuart(p));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function NavLink({ children, onClick, href }: { children: React.ReactNode; onClick?: () => void; href?: string }) {
  const { hovered, bind } = useHover();
  const style: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontWeight: 500,
    fontSize: "var(--text-label-nav)",
    letterSpacing: "var(--tracking-label-nav)",
    textTransform: "uppercase" as const,
    lineHeight: "none",
    padding: "4px 8px",
    borderRadius: "var(--radius-xs)",
    cursor: "pointer",
    transition: "background-color 0.07s, color 0.07s",
    backgroundColor: hovered ? "var(--color-inv-bg)" : "transparent",
    color: hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)",
    textDecoration: "none",
  };
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={style} {...bind}>{children}</a>;
  return <button onClick={onClick} style={style} {...bind}>{children}</button>;
}

function Navbar({ dark, toggleDark, onScrollTo, onEmail }: { dark: boolean; toggleDark: () => void; onScrollTo: (id: string) => void; onEmail: () => void }) {
  const time = useISTClock();
  const { hovered: toggleHovered, bind: toggleBind } = useHover();
  const { hovered: emailHovered, bind: emailBind } = useHover();

  return (
    <div className="w-full sticky top-0 z-50" style={{ backgroundColor: "var(--color-nav-bg)" }}>
      <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0">
        <div className="flex items-center justify-between py-[16px] w-full">
          <div className="flex gap-[16px] items-center uppercase" style={{ color: "var(--color-text-primary)" }}>
            <p className="font-['IBM_Plex_Mono'] font-semibold text-[14px] leading-none shrink-0">Ben George</p>
            <div className="hidden sm:flex gap-[4px] md:gap-[8px] items-center font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[0.96px] uppercase leading-none" style={{ color: "var(--color-text-primary)" }}>
              <p>Kochi_[ist]</p><p>|</p><p>{time}</p>
            </div>
          </div>
          <div className="flex gap-[8px] md:gap-[12px] items-center">
            <button
              onClick={toggleDark}
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
                <Sun size={16} strokeWidth={1.5} className={`absolute inset-0 transition-all duration-150 ${dark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`} />
                <Moon size={16} strokeWidth={1.5} className={`absolute inset-0 transition-all duration-150 ${dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`} />
              </div>
            </button>
            <div className="hidden sm:flex gap-[4px] md:gap-[8px] items-center font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[0.96px] uppercase leading-none" style={{ color: "var(--color-text-primary)" }}>
              <NavLink onClick={() => onScrollTo("cases")}>Work</NavLink>
              <NavLink href="https://drive.google.com/file/d/1urZHmHllhfD-G9JwVkBSEJpRsW-Fn4R1/view">Resume</NavLink>
              <NavLink onClick={() => onScrollTo("contact")}>Contact</NavLink>
            </div>
            <button
              onClick={onEmail}
              className="px-[8px] py-[4px] rounded-[4px] cursor-pointer"
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                fontSize: "var(--text-label-nav)",
                letterSpacing: "var(--tracking-label-nav)",
                textTransform: "uppercase",
                backgroundColor: "var(--color-email-bg)",
                color: "var(--color-email-text)",
                opacity: emailHovered ? 0.7 : 1,
                transition: "opacity 0.07s",
              }}
              {...emailBind}
            >
              Email
            </button>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden gap-[16px] items-center px-[16px] pb-[12px] font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[0.96px] uppercase leading-none" style={{ color: "var(--color-text-primary)" }}>
        <NavLink onClick={() => onScrollTo("cases")}>Work</NavLink>
        <NavLink href="https://drive.google.com/file/d/1urZHmHllhfD-G9JwVkBSEJpRsW-Fn4R1/view">Resume</NavLink>
        <NavLink onClick={() => onScrollTo("contact")}>Contact</NavLink>
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: "var(--color-border)" }} />
    </div>
  );
}

function SignalCard({ title, description }: { title: string; description: string }) {
  const { hovered, bind } = useHover();
  return (
    <div
      className="relative rounded-[8px] cursor-default"
      style={{
        backgroundColor: hovered ? "var(--color-inv-bg)" : "transparent",
        transition: "background-color 0.07s",
      }}
      {...bind}
    >
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="flex flex-col gap-[16px] p-[24px] md:p-[32px]">
          <p className="font-['IBM_Plex_Mono'] font-medium leading-[1.2] text-[18px] md:text-[20px]" style={{ color: hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)", transition: "color 0.07s" }}>{title}</p>
          <p className="font-['PP_Neue_Montreal'] font-normal leading-[1.4] text-[14px] md:text-[16px]" style={{ color: hovered ? "var(--color-inv-text-2)" : "var(--color-text-secondary)", transition: "color 0.07s" }}>{description}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[8px]" style={{ borderColor: hovered ? "transparent" : "var(--color-border)", transition: "border-color 0.07s" }} />
    </div>
  );
}

function CaseCard({ num, company, title, tags, metrics, href, thumbnail }: {
  num: string; company: string; title: string; tags: string;
  metrics: { value: string; label: string }[]; href: string; thumbnail?: string;
}) {
  const { hovered, pressed, reset, bind } = useHover();
  const navigate = useNavigate();
  const pc = hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)";
  const sc = hovered ? "var(--color-inv-text-2)" : "var(--color-text-secondary)";
  const tc = hovered ? "var(--color-inv-text-2)" : "var(--color-text-tertiary)";
  const ease = "cubic-bezier(0.4,0,0.2,1)";

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
      {/* Thumbnail — slides down below info, info stays in place */}
      {thumbnail && (
        <div style={{
          display: "grid",
          gridTemplateRows: hovered ? "1fr" : "0fr",
          transition: `grid-template-rows 0.52s ${ease}`,
        }}>
          <div style={{ overflow: "hidden" }}>
            <img
              src={thumbnail}
              alt=""
              draggable={false}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                transform: hovered ? "scale(1) translateY(0)" : "scale(1.06) translateY(-16px)",
                opacity: hovered ? 1 : 0,
                transition: `transform 0.52s ${ease}, opacity 0.38s ease`,
              }}
            />
          </div>
        </div>
      )}
      <div aria-hidden="true" className="absolute border-b border-solid inset-0 pointer-events-none" style={{ borderColor: hovered ? "transparent" : "var(--color-border-case)", transition: "border-color 0.07s" }} />
    </div>
  );
}

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
          <p className="font-['IBM_Plex_Mono'] font-normal leading-[20px] text-[12px] md:text-[14px]" style={{ color: hovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)", transition: "color 0.07s" }}>{linkText}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-b border-solid inset-0 pointer-events-none" style={{ borderColor: hovered ? "transparent" : "var(--color-border)", transition: "border-color 0.07s" }} />
    </div>
  );

  if (onClick) return <div onClick={() => { reset(); onClick(); }}>{inner}</div>;
  return <a href={href} target="_blank" rel="noopener noreferrer" onClick={reset}>{inner}</a>;
}

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div className={`fixed bottom-[32px] left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[16px] pointer-events-none"}`}>
      <div className="bg-[#191d1b] text-[#d1d5d3] font-['IBM_Plex_Mono'] text-[12px] tracking-[0.66px] uppercase px-[20px] py-[12px] rounded-[6px] border border-[#2a2e2c]">
        {message}
      </div>
    </div>
  );
}

const signalCards = [
  { title: "0 → 1", description: "Experienced in 0-to-1 environments. I take raw, ambiguous requirements and translate them into structured, launch-ready software." },
  { title: "Design systems", description: "Built and managed core component libraries. I translate complex interface patterns into strict, reusable rules that speed up engineering." },
  { title: "6", description: "Six years in product design, including five continuous years at one startup. I build systems meant to scale, and I stay to maintain and evolve them." },
  { title: "Distributed teams", description: "Collaborated daily with remote engineering teams. I rely on clear, asynchronous documentation to keep cross-timezone projects on schedule." },
];

const cases = [
  { num: "01", company: "Omnipractice", title: "Designing for user activation against a massive 86% drop-off", tags: "Healthcare SaaS · b2b · Lead Designer · 5 weeks", metrics: [{ value: "14 → 41%", label: "activation_rate" }, { value: "30 → 70%", label: "onb_completion" }], href: "/case/01-figma", thumbnail: "/images/thumbnails/variant-A2.png" },
  { num: "02", company: "Omnipractice", title: "Practice management SaaS for mental health clinics in the US", tags: "Healthcare SaaS · b2b & b2c· Lead Designer · 8 months", metrics: [{ value: "35% decrease", label: "claim_rejections" }, { value: "100+ components", label: "design_system" }], href: "https://wondrous-need-786173.framer.app/", thumbnail: "/images/thumbnails/case-02.png" },
  { num: "03", company: "Fairsplits", title: "Lifestyle finance app for trips and hangouts", tags: "consumer app · Mobile · 0 → 1 · founding designer. 2025", metrics: [{ value: "released", label: "app_store" }, { value: "released", label: "play_store" }], href: "https://www.behance.net/gallery/217296307/Fairsplits-UIUX-Case-study-Bill-splitting-app", thumbnail: "/images/thumbnails/case-03.png" },
];

const contacts = [
  { label: "EMAIL", linkText: "hello@bengeorge.in", isEmail: true },
  { label: "LINKEDIN", linkText: "linkedin.com/in/iambengeorge/", href: "https://linkedin.com/in/iambengeorge/" },
  { label: "BEHANCE", linkText: "behance.net/ben_george", href: "https://behance.net/ben_george" },
  { label: "MEDIUM", linkText: "medium.com/@iambengeorge", href: "https://medium.com/@iambengeorge" },
];

export default function App() {
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });
  const casesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const { hovered: resumeHovered, bind: resumeBind } = useHover();

  const scrollTo = useCallback((id: string) => {
    const ref = id === "cases" ? casesRef : contactRef;
    if (ref.current) smoothScrollTo(ref.current);
  }, []);

  const copyEmail = useCallback(() => {
    const email = "hello@bengeorge.in";
    const success = () => {
      setToast({ message: "Email copied to clipboard!", visible: true });
      setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(success).catch(() => {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try { document.execCommand("copy"); success(); } catch {
          setToast({ message: "Copy failed. Email: hello@bengeorge.in", visible: true });
          setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
        }
        document.body.removeChild(textarea);
      });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try { document.execCommand("copy"); success(); } catch {
        setToast({ message: "Copy failed. Email: hello@bengeorge.in", visible: true });
        setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
      }
      document.body.removeChild(textarea);
    }
  }, []);

  return (
    <div className={`flex flex-col items-center min-h-screen transition-colors duration-300${dark ? " dark" : ""}`} style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <UnicornBg opacity={dark ? 0.45 : 0.25} />
      </div>

      <Navbar dark={dark} toggleDark={() => setDark(!dark)} onScrollTo={scrollTo} onEmail={copyEmail} />

      {/* Hero */}
      <div className="relative z-[1] w-full">
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
          style={{
            height: 440,
            background: `linear-gradient(to bottom, var(--color-bg-transparent) 0%, var(--color-bg-overlay) 100%)`,
          }}
        />
        <div className="relative z-[2] w-full max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 pt-[80px] md:pt-[120px] lg:pt-[160px] pb-[80px] md:pb-[120px] lg:pb-[160px]">
          <div className="flex flex-col gap-[24px]">
            <p className="font-['IBM_Plex_Mono'] font-medium leading-none text-[12px] tracking-[0.96px] uppercase" style={{ color: "var(--color-text-muted)" }}>{`PRODUCT DESIGNER //`}</p>
            <div className="flex flex-col gap-[32px]">
              <p className="font-['PP_Neue_Montreal'] font-medium leading-[1.05] text-[40px] md:text-[64px] lg:text-[95px] tracking-[-1px] md:tracking-[-2px] lg:tracking-[-2.85px] transition-colors duration-300" style={{ color: "var(--color-text-primary)" }}>
                I design software and the systems that scale it.
              </p>
              <p className="font-['PP_Neue_Montreal'] font-normal leading-[1.5] text-[15px] md:text-[16px] lg:text-[18px] transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                For the last 6 years, I've worked in high-speed startup environments, taking products from initial concept to market. I focus on measurable outcomes, work directly with engineering to respect technical constraints, and build systems meant to scale.
              </p>
            </div>
          </div>
          <div className="mt-[48px]">
            <p className="font-['IBM_Plex_Mono'] font-medium leading-[1.3] text-[12px] md:text-[13px] lg:text-[14px] tracking-[0.56px] uppercase" style={{ color: "var(--color-text-secondary)" }}>
              {`RECENT: LEAD PRODUCT DESIGNER @ omnipractice [5 YEARS, B2b SAAS & B2C mobile]`}
            </p>
          </div>
        </div>
      </div>

      {/* Below-fold */}
      <div className="relative z-[1] w-full flex flex-col items-center transition-colors duration-200" style={{ backgroundColor: "var(--color-bg-overlay)" }}>
        {/* Signal Cards */}
        <div className="w-full max-w-[940px] px-[16px] md:px-[24px] lg:px-0 mt-[80px] md:mt-[120px] lg:mt-[160px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px]">
            {signalCards.map((card, i) => (
              <SignalCard key={i} title={card.title} description={card.description} />
            ))}
          </div>
        </div>

        {/* Cases */}
        <div ref={casesRef} className="w-full max-w-[940px] px-[16px] md:px-[24px] lg:px-0 mt-[80px] md:mt-[120px] lg:mt-[160px]">
          <p className="font-['IBM_Plex_Mono'] font-medium leading-none text-[12px] tracking-[0.96px] uppercase mb-[48px] md:mb-[64px] lg:mb-[80px]" style={{ color: "var(--color-text-muted)" }}>{`work // cases`}</p>
          <div className="flex flex-col">
            {cases.map((cs) => (
              <CaseCard key={cs.num} {...cs} />
            ))}
          </div>
        </div>

        {/* Contact */}
        <div ref={contactRef} className="w-full max-w-[940px] px-[16px] md:px-[24px] lg:px-0 mt-[80px] md:mt-[120px] lg:mt-[160px]">
          <p className="font-['IBM_Plex_Mono'] font-medium leading-none text-[12px] tracking-[0.96px] uppercase mb-[48px] md:mb-[64px] lg:mb-[80px]" style={{ color: "var(--color-text-muted)" }}>{`contact //`}</p>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-x-[96px]">
            <div className="flex flex-col">
              {contacts.map((ct) => (
                <ContactCard
                  key={ct.label}
                  label={ct.label}
                  linkText={ct.linkText}
                  href={ct.href}
                  onClick={ct.isEmail ? copyEmail : undefined}
                />
              ))}
            </div>
            <div className="relative h-full mt-[32px] lg:mt-0">
              <a
                href="https://drive.google.com/file/d/1urZHmHllhfD-G9JwVkBSEJpRsW-Fn4R1/view"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['IBM_Plex_Mono'] font-medium leading-[1.3] text-[14px] md:text-[16px] uppercase cursor-pointer flex items-end justify-center lg:justify-end w-full h-full px-[8px] py-[18px]"
                style={{
                  color: resumeHovered ? "var(--color-inv-text-1)" : "var(--color-text-primary)",
                  backgroundColor: resumeHovered ? "var(--color-inv-bg)" : "transparent",
                  textDecoration: "none",
                  transition: "background-color 0.07s, color 0.07s",
                }}
                {...resumeBind}
              >
                [ download RESUME ↓ ]
              </a>
              <div aria-hidden="true" className="absolute border-b border-solid inset-0 pointer-events-none" style={{ borderColor: resumeHovered ? "transparent" : "var(--color-border)", transition: "border-color 0.07s" }} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full mt-[80px] md:mt-[120px] lg:mt-[160px] transition-colors duration-300" style={{ backgroundColor: "var(--color-footer-bg)" }}>
          <div className="max-w-[940px] mx-auto px-[16px] md:px-[24px] lg:px-0 py-[20px] flex flex-col md:flex-row justify-between items-center gap-[8px]">
            <p className="font-['IBM_Plex_Mono'] font-normal leading-[16.5px] text-[11px] tracking-[0.66px] uppercase" style={{ color: "var(--color-footer-text)" }}>© 2026 BEN GEORGE. ALL RIGHTS RESERVED.</p>
            <p className="font-['IBM_Plex_Mono'] font-normal leading-[16.5px] text-[11px] tracking-[0.66px] uppercase" style={{ color: "var(--color-footer-text)" }}>say hello@bengeorge.in</p>
          </div>
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
