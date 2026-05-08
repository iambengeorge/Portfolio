import { useState, useEffect, useCallback } from 'react';
import svgPaths from '../imports/svg-xe09dfm2vu';

function formatTime(date: Date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

const EMAIL = 'hello@bengeorge.design';

/* ── Colours ────────────────────────────────────────────────── */
const LIGHT = {
  bg: '#edefee',
  border: 'rgba(18,20,19,0.08)',
  fg: '#121413',
  fgInv: '#f7f8f7',
  emailBg: '#121413',
  emailHoverBg: '#f7f8f7',
  emailHoverFg: '#121413',
  emailHoverBorder: '#121413',
  resumeHoverBg: '#121413',
  resumeHoverFg: '#f7f8f7',
  backHoverBg: '#121413',
  backHoverFg: '#f7f8f7',
  moonStroke: '#121413',
};
const DARK = {
  bg: '#191D1B',
  border: '#2A2E2C',
  fg: '#D1D5D3',
  fgInv: '#121413',
  emailBg: '#D1D5D3',
  emailHoverBg: '#191D1B',
  emailHoverFg: '#D1D5D3',
  emailHoverBorder: '#D1D5D3',
  resumeHoverBg: '#D1D5D3',
  resumeHoverFg: '#121413',
  backHoverBg: '#D1D5D3',
  backHoverFg: '#121413',
  moonStroke: '#D1D5D3',
};

export function Navbar({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [copied, setCopied] = useState(false);
  const [themeAnim, setThemeAnim] = useState(false);

  /* Back-button hover */
  const [backHover, setBackHover] = useState(false);
  /* Resume hover */
  const [resumeHover, setResumeHover] = useState(false);
  /* Email hover */
  const [emailHover, setEmailHover] = useState(false);
  /* Moon hover */
  const [moonHover, setMoonHover] = useState(false);

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) window.history.back();
  };

  const handleEmail = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const el = document.createElement('textarea');
      el.value = EMAIL;
      el.style.position = 'fixed';
      el.style.top = '-9999px';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.focus();
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // If all else fails, open mailto
      window.location.href = `mailto:${EMAIL}`;
    }
  }, []);

  const toggleDark = () => {
    setThemeAnim(true);
    setTimeout(() => setThemeAnim(false), 400);
    onToggleDark();
  };

  const c = dark ? DARK : LIGHT;

  /* Sun icon (for dark mode — clicking switches to light) */
  const SunIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.moonStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );

  /* Moon icon (for light mode — clicking switches to dark) */
  const MoonIcon = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d={svgPaths.p2efcd300} stroke={c.moonStroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <>
      {/* Global transition for bg/color when theme changes */}
      <style>{`
        .navbar-root * {
          transition:
            background-color 0.35s ease,
            color 0.35s ease,
            border-color 0.35s ease,
            stroke 0.35s ease,
            opacity 0.35s ease;
        }
        .navbar-theme-icon {
          transition: transform 0.4s cubic-bezier(.34,1.56,.64,1), opacity 0.25s ease;
        }
        .navbar-theme-icon.spin {
          transform: rotate(30deg) scale(1.15);
        }
        @media (max-width: 480px) {
          .navbar-meta  { display: none !important; }
          .navbar-resume { display: none !important; }
        }
        /* Match section container responsive padding */
        @media (max-width: 1024px) {
          .navbar-inner { padding-left: 24px !important; padding-right: 24px !important; }
        }
        @media (max-width: 640px) {
          .navbar-inner { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>

      <div
        className="navbar-root"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 9000,
          width: '100%',
          backgroundColor: c.bg,
          borderBottom: `1px solid ${c.border}`,
          transition: 'background-color 0.35s ease, border-color 0.35s ease',
        }}
      >
        <div
          className="navbar-inner"
          style={{
            maxWidth: 940,
            width: '100%',
            margin: '0 auto',
            height: 58,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 0,
            paddingRight: 0,
            boxSizing: 'border-box',
          }}
        >
          {/* ── Left ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>

            {/* Back button */}
            <button
              onClick={handleBack}
              onMouseEnter={() => setBackHover(true)}
              onMouseLeave={() => setBackHover(false)}
              aria-label="Go back"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: backHover ? c.fg : 'transparent',
                border: 'none',
                borderRadius: 4,
                padding: '4px 6px',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
            >
              <div style={{ width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="12.25" height="10" viewBox="0 0 12.25 10" fill="none">
                  <path d={svgPaths.p40a2d80} fill={backHover ? c.fgInv : c.fg} />
                </svg>
              </div>
              <a
                href="https://www.bengeorge.in"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontWeight: 600,
                  fontSize: 14,
                  lineHeight: '14px',
                  color: backHover ? c.fgInv : c.fg,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  letterSpacing: 0,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                Ben George
              </a>
            </button>

            {/* Location | Time */}
            <div className="navbar-meta" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={monoStyle(c.fg)}>Kochi_[ist]</span>
              <span style={{ ...monoStyle(c.fg), opacity: 0.4, margin: '0 1px' }}>|</span>
              <span style={{ ...monoStyle(c.fg), fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                {time}
              </span>
            </div>
          </div>

          {/* ── Right ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>

            {/* Dark / Light toggle */}
            <button
              onClick={toggleDark}
              onMouseEnter={() => setMoonHover(true)}
              onMouseLeave={() => setMoonHover(false)}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={dark ? 'Light mode' : 'Dark mode'}
              style={{
                width: 30,
                height: 26,
                background: moonHover ? c.fg : 'transparent',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                transition: 'background 0.2s ease',
              }}
            >
              <span className={`navbar-theme-icon${themeAnim ? ' spin' : ''}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                  filter: moonHover ? 'invert(1)' : 'none',
                  transition: 'filter 0.2s ease',
                }}
              >
                {dark ? <MoonIcon /> : <SunIcon />}
              </span>
            </button>

            {/* Resume */}
            <div className="navbar-resume">
              <a
                href="https://drive.google.com/file/d/1urZHmHllhfD-G9JwVkBSEJpRsW-Fn4R1/view"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setResumeHover(true)}
                onMouseLeave={() => setResumeHover(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 26,
                  borderRadius: 4,
                  padding: '0 8px',
                  textDecoration: 'none',
                  background: resumeHover ? c.fg : 'transparent',
                  transition: 'background 0.2s ease',
                }}
              >
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 500,
                    fontSize: 12,
                    lineHeight: '12px',
                    color: resumeHover ? c.fgInv : c.fg,
                    textTransform: 'uppercase',
                    letterSpacing: '0.96px',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s ease',
                  }}
                >
                  Resume
                </span>
              </a>
            </div>

            {/* Email — copy on click */}
            <button
              onClick={handleEmail}
              onMouseEnter={() => setEmailHover(true)}
              onMouseLeave={() => setEmailHover(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 26,
                minWidth: 57,
                backgroundColor: emailHover ? c.emailHoverBg : c.emailBg,
                border: `1px solid ${c.fg}`,
                borderRadius: 4,
                padding: '0 10px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              aria-label="Copy email address"
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontWeight: 500,
                  fontSize: 12,
                  lineHeight: '18px',
                  color: emailHover ? c.emailHoverFg : c.fgInv,
                  textTransform: 'uppercase',
                  letterSpacing: '0.96px',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
              >
                {copied ? 'Copied!' : 'Email'}
              </span>
            </button>
          </div>
        </div>

        {/* Copied toast */}
        <div
          style={{
            position: 'absolute',
            bottom: -38,
            left: '50%',
            transform: `translateX(-50%) translateY(${copied ? 0 : 6}px)`,
            opacity: copied ? 1 : 0,
            pointerEvents: 'none',
            backgroundColor: c.fg,
            color: c.fgInv,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            padding: '5px 10px',
            borderRadius: 4,
            whiteSpace: 'nowrap',
            transition: 'opacity 0.25s ease, transform 0.25s ease, background-color 0.35s ease, color 0.35s ease',
            zIndex: 9100,
          }}
        >
          Email copied
        </div>
      </div>
    </>
  );
}

function monoStyle(color: string): React.CSSProperties {
  return {
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeight: 500,
    fontSize: 11,
    lineHeight: '11px',
    color,
    textTransform: 'uppercase',
    letterSpacing: '0.7px',
    transition: 'color 0.35s ease',
  };
}