import { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Desk from './imports/Desk';
import { Navbar } from './components/Navbar';
import { VideoMockup } from './components/VideoMockup';
import './styles/fonts.css';

export default function App() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [dark, setDark] = useState(false);
  const [videoHost, setVideoHost] = useState<HTMLDivElement | null>(null);
  const deskWrapperRef = useRef<HTMLDivElement>(null);

  // Inject a host div for the video mockup directly after the "Omnipractice"
  // title-body row inside S/Context > Sub, so the video sits below the
  // "01 / context" heading and the Omnipractice subtitle.
  useEffect(() => {
    const wrapper = deskWrapperRef.current;
    if (!wrapper) return;
    const sub = wrapper.querySelector(
      '[data-name="S/Context"] [data-name="Sub"]'
    );
    if (!sub) return;
    const firstRow = sub.children[0] as HTMLElement | undefined;
    if (!firstRow) return;
    if (sub.querySelector('[data-name="video-host"]')) return;
    const host = document.createElement('div');
    host.setAttribute('data-name', 'video-host');
    host.style.gridColumn = '1 / span 8';
    host.style.width = '940px';
    host.style.maxWidth = '100%';
    firstRow.insertAdjacentElement('afterend', host);
    setVideoHost(host);
    return () => {
      host.remove();
      setVideoHost(null);
    };
  }, []);

  // Dark mode is scoped to the .case01-figma-root wrapper so it doesn't
  // affect the rest of the site after navigating away.
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    rootRef.current?.classList.toggle('dark', dark);
  }, [dark]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const imgBlk = target.closest('[data-name="Img BLK"]') || target.closest('[data-name="img F"]');
    if (imgBlk) {
      const img = target.tagName === 'IMG' ? target : imgBlk.querySelector('img');
      if (img) {
        setLightboxSrc((img as HTMLImageElement).src);
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxSrc(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={rootRef}
      className="case01-figma-root size-full overflow-y-auto overflow-x-hidden"
      style={{
        backgroundColor: dark ? '#121413' : '#f7f8f7',
        transition: 'background-color 0.35s ease',
        minHeight: '100vh',
      }}
    >
      <style>{responsiveStyles}</style>
      <style>{dark ? darkPageStyles : ''}</style>
      <Navbar dark={dark} onToggleDark={() => setDark(d => !d)} />
      <div onClick={handleClick} className="desk-wrapper" ref={deskWrapperRef}>
        <Desk />
      </div>
      {videoHost && createPortal(<VideoMockup dark={dark} />, videoHost)}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            onClick={() => setLightboxSrc(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white bg-white/20 hover:bg-white/30 rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={lightboxSrc}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

const responsiveStyles = `
/* ===== ZOOM CURSOR FOR FIGURES ===== */
[data-name="Img BLK"] [data-name="img F"],
[data-name="Img BLK"] [data-name="Slot"] {
  cursor: zoom-in;
}

/* ===== CARD/ESUM: Remove background fill from the 4 summary boxes ===== */
[data-name="Card/Esum"] {
  background-color: transparent !important;
}

/* ===== AUTHOR C: "14% → 41%" — always brand primary ===== */
[data-name="Author C"] p span:last-child,
[data-name="Author C"] p span:last-child span {
  color: #007d54 !important;
}

/* ===== SUMMARY: bullet list items → primary text #121413 ===== */
.desk-wrapper [data-name="S/summary"] ol li span {
  color: #121413 !important;
}

/* ===== BASE: Prevent horizontal overflow ===== */
[data-name="desk"] {
  width: 100%;
  overflow-x: hidden;
}

/* ===== VIDEO MOCKUP: pull up to sit just under Omnipractice subtitle ===== */
/* Sub grid has gap-y-64px between rows; offset most of it so the video
   reads as a continuation of the Omnipractice row (~28px visual gap). */
[data-name="video-host"] {
  margin-top: -36px;
  margin-bottom: 28px;
}

/* ===== TABLET: max-width 1024px ===== */
@media (max-width: 1024px) {
  [data-name="video-host"] {
    width: 100% !important;
  }


  /* --- Remove all hardcoded fixed widths from layout containers --- */
  [data-name="M C"],
  [data-name="Container"],
  [data-name="E Summary"] {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    padding-left: 24px !important;
    padding-right: 24px !important;
  }

  [data-name="Label"] {
    width: 100% !important;
  }

  [data-name="Author C"] {
    width: 100% !important;
  }

  /* Section headings */
  [data-name="Section Heading"] {
    width: 100% !important;
  }

  /* Body containers (side content) */
  [data-name="Body"] {
    width: 100% !important;
    max-width: 100% !important;
  }

  /* --- Section vertical padding reduction --- */
  [data-name="S/Hero"] { padding-top: 72px !important; padding-bottom: 96px !important; }
  [data-name="S/Context"],
  [data-name="S/Goal"],
  [data-name="S/leak"],
  [data-name="S/WC"],
  [data-name="S/iter 1"],
  [data-name="S/OC 1"],
  [data-name="S/OC 2"],
  [data-name="S/Tradeoffs"],
  [data-name="S/summary"] {
    padding-top: 96px !important;
    padding-bottom: 96px !important;
  }

  /* --- Side-title + body: 2-col grid → vertical stack --- */
  [data-name="title body"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    width: 100% !important;
  }
  [data-name="title body"] > [data-name="side title"] {
    width: 100% !important;
  }
  [data-name="title body"] > [data-name="Body"] {
    width: 100% !important;
    justify-self: stretch !important;
  }

  /* --- Sub grids: force single column flow --- */
  [data-name="Sub"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 48px !important;
    width: 100% !important;
  }
  [data-name="Sub"] > * {
    width: 100% !important;
  }

  /* --- Image frame pairs: 2-col flex → stack --- */
  [data-name="Im frame"],
  [data-name="I frame"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 32px !important;
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  [data-name="Im frame"] > [data-name="Fig blk"],
  [data-name="I frame"] > [data-name="Fig blk"],
  [data-name="I frame"] > div[data-name="Fig blk"] {
    width: 100% !important;
  }

  /* --- Fig blk (full-width image + caption) --- */
  [data-name="Fig blk"] {
    width: 100% !important;
  }

  /* --- E Summary: 2x2 grid → single column --- */
  [data-name="E Summary"] > div {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
  }
  [data-name="E Summary"] [data-name="Card/Esum"] {
    grid-column: 1 !important;
    grid-row: auto !important;
    height: auto !important;
  }

  /* --- Fold inner padding --- */
  [data-name="Fold"] > div > div {
    padding: 32px !important;
  }

  /* --- MC padding variants --- */
  .desk-wrapper [data-name="M C"] > div[aria-hidden] + div,
  .desk-wrapper [data-name="M C"][style*="padding"] {
    padding: 32px 24px !important;
  }

  /* --- Fixed heights → auto --- */
  [data-name="Body"] {
    height: auto !important;
  }

  /* --- Flow / Steps --- */
  [data-name="flow"] {
    width: 100% !important;
    overflow-x: auto !important;
  }
  [data-name="Steps"] {
    flex-wrap: wrap !important;
    height: auto !important;
    gap: 4px 8px !important;
    justify-content: flex-start !important;
  }

  /* --- Table: horizontal scroll --- */
  [data-name="table"] {
    overflow-x: auto !important;
    min-width: 700px !important;
  }

  /* Table scroll wrapper */
  [data-name="S/summary"] [data-name="M C"] {
    overflow-x: auto !important;
  }

  /* --- Metrics row --- */
  [data-name="Metrics"] {
    flex-wrap: wrap !important;
  }

  /* --- Debate columns → stack --- */
  [data-name="Sub"] > div[class*="col-"] {
    grid-column: 1 !important;
    width: 100% !important;
  }
}


/* ===== MOBILE: max-width 640px ===== */
@media (max-width: 640px) {

  /* --- Further padding reduction --- */
  [data-name="S/Hero"] { padding-top: 40px !important; padding-bottom: 64px !important; }
  [data-name="S/Context"],
  [data-name="S/Goal"],
  [data-name="S/leak"],
  [data-name="S/WC"],
  [data-name="S/iter 1"],
  [data-name="S/OC 1"],
  [data-name="S/OC 2"],
  [data-name="S/Tradeoffs"],
  [data-name="S/summary"] {
    padding-top: 56px !important;
    padding-bottom: 56px !important;
  }

  [data-name="M C"],
  [data-name="Container"],
  [data-name="E Summary"] {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  [data-name="Fold"] > div > div {
    padding: 16px !important;
  }

  /* --- Typography scaling --- */

  /* Hero title: 48px → fluid */
  .desk-wrapper p[class*="text-[48px]"],
  .desk-wrapper span[class*="text-[48px]"] {
    font-size: clamp(26px, 7vw, 48px) !important;
  }

  /* Section headings: 40px → fluid */
  .desk-wrapper p[class*="text-[40px]"],
  .desk-wrapper span[class*="text-[40px]"] {
    font-size: clamp(24px, 6vw, 40px) !important;
  }

  /* Pull quotes: 32px → fluid */
  .desk-wrapper p[class*="text-[32px]"],
  .desk-wrapper span[class*="text-[32px]"] {
    font-size: clamp(20px, 5vw, 32px) !important;
  }

  /* Metrics: 64px → fluid */
  .desk-wrapper p[class*="text-[64px]"] {
    font-size: clamp(40px, 10vw, 64px) !important;
  }

  /* Large arrows: 96px → smaller */
  .desk-wrapper p[class*="text-[96px]"] {
    font-size: 48px !important;
  }

  /* --- Spacing reductions --- */
  [data-name="Sub"] {
    gap: 32px !important;
  }

  [data-name="Im frame"],
  [data-name="I frame"] {
    gap: 24px !important;
  }

  [data-name="E Summary"] > div {
    gap: 24px !important;
  }

  /* --- Prevent overflow from nowrap --- */
  .desk-wrapper p[class*="whitespace-nowrap"],
  .desk-wrapper div[class*="whitespace-nowrap"] {
    white-space: normal !important;
    word-break: break-word !important;
  }
  /* Keep fig labels/labels nowrap */
  [data-name="Img label"],
  [data-name="Img label"] *,
  [data-name="Fig no"],
  [data-name="Fig no"] * {
    white-space: nowrap !important;
  }

  /* --- Role/Stack metadata --- */
  [data-name="Stack"] p[class*="w-[120px]"] {
    width: 80px !important;
    flex-shrink: 0 !important;
  }
  [data-name="Author C"] p[class*="w-[120px]"] {
    width: 80px !important;
  }

  /* --- Metrics: stack vertically --- */
  [data-name="Metrics"] {
    flex-direction: column !important;
  }

  /* --- Image block internal padding --- */
  [data-name="Img BLK"] > div:not([aria-hidden]) {
    padding: 12px !important;
  }
  [data-name="Img BLK"] [data-name="Labels"] {
    gap: 4px !important;
  }

  /* --- Table overflow container --- */
  [data-name="table"] {
    min-width: 600px !important;
  }

  /* --- Steps sizing --- */
  [data-name="Steps"] p {
    font-size: 11px !important;
  }

  /* --- Gap general cleanup --- */
  .desk-wrapper div[class*="gap-[80px]"] {
    gap: 40px !important;
  }
  .desk-wrapper div[class*="gap-[64px]"] {
    gap: 32px !important;
  }

  /* --- Checkmark decision row --- */
  [data-name="Checkmark"] {
    flex-shrink: 0 !important;
  }
}
`;

const darkPageStyles = `
/* ===== DARK MODE — using Design System "Dark T" palette ===== */

/* --- General text: Design Text Primary #D1D5D3 --- */
.desk-wrapper p,
.desk-wrapper span,
.desk-wrapper a {
  color: #D1D5D3 !important;
  transition: color 0.35s ease !important;
}

/* --- Force dark text on green bg cells --- */
.desk-wrapper .bg-\\[\\#007d54\\] p {
  color: #121413 !important;
}

/* --- Muted / secondary text #949A98 --- */
.desk-wrapper .text-\\[\\#4a504e\\],
.desk-wrapper .text-\\[\\#727a77\\] {
  color: #949A98 !important;
}

/* --- Tertiary text #6C7270 --- */
.desk-wrapper .text-\\[\\#4a504e\\] {
  color: #6C7270 !important;
}

/* --- Headings / hero / metrics: Design Text Primary #D1D5D3 --- */
.desk-wrapper p[class*="text-[40px]"],
.desk-wrapper span[class*="text-[40px]"],
.desk-wrapper p[class*="text-[48px]"],
.desk-wrapper span[class*="text-[48px]"],
.desk-wrapper p[class*="text-[64px]"],
.desk-wrapper p[class*="text-[96px]"],
.desk-wrapper p[class*="text-[32px]"],
.desk-wrapper span[class*="text-[32px]"] {
  color: #D1D5D3 !important;
}

/* --- Light primary background sections (#f7f8f7 → #121413) --- */
.desk-wrapper .bg-\\[\\#f7f8f7\\] {
  background-color: #121413 !important;
  transition: background-color 0.35s ease !important;
}

/* --- Light secondary background sections (#edefee → #191D1B) --- */
.desk-wrapper .bg-\\[\\#edefee\\] {
  background-color: #191D1B !important;
  transition: background-color 0.35s ease !important;
}

/* --- Light secondary background (#f5f7f6 → #191D1B) --- */
.desk-wrapper .bg-\\[\\#f5f7f6\\] {
  background-color: #191D1B !important;
  transition: background-color 0.35s ease !important;
}

/* --- Green-tinted summary section (#ebf7f2 → Brand Surface #16241F) --- */
.desk-wrapper .bg-\\[\\#ebf7f2\\] {
  background-color: #16241F !important;
  transition: background-color 0.35s ease !important;
}

/* --- Solid brand green bg (#007d54 → Brand Primary #26F0A1) --- */
.desk-wrapper .bg-\\[\\#007d54\\] {
  background-color: #26F0A1 !important;
}

/* --- Brand green text (#007d54, #2cb382 → Brand Primary #26F0A1) --- */
.desk-wrapper .text-\\[\\#007d54\\],
.desk-wrapper .text-\\[\\#2cb382\\] {
  color: #26F0A1 !important;
}

/* --- Alert / red text (#913027, #913927, #c94a3e → Alert Primary #F68074) --- */
.desk-wrapper .text-\\[\\#913027\\],
.desk-wrapper .text-\\[\\#913927\\],
.desk-wrapper .text-\\[\\#c94a3e\\] {
  color: #F68074 !important;
}

/* --- Red/alert background (#fdf0ef → Alert Surface #241A19) --- */
.desk-wrapper .bg-\\[\\#fdf0ef\\],
.desk-wrapper .bg-\\[\\#fce8e6\\] {
  background-color: #241A19 !important;
  transition: background-color 0.35s ease !important;
}

/* --- Borders → Design Border Primary #2A2E2C --- */
.desk-wrapper .border-\\[\\#e1e8e5\\],
.desk-wrapper .border-\\[\\#ebebeb\\],
.desk-wrapper .border-\\[\\#bfc7c3\\] {
  border-color: #2A2E2C !important;
  transition: border-color 0.35s ease !important;
}

/* --- Section backgrounds: map alternating design bg colors --- */
.desk-wrapper [data-name="S/Hero"],
.desk-wrapper [data-name="S/Goal"],
.desk-wrapper [data-name="S/OC 1"],
.desk-wrapper [data-name="S/OC 2"] {
  background-color: #121413 !important;
  transition: background-color 0.35s ease !important;
}

.desk-wrapper [data-name="S/Context"],
.desk-wrapper [data-name="S/iter 1"],
.desk-wrapper [data-name="S/Tradeoffs"] {
  background-color: #191D1B !important;
  transition: background-color 0.35s ease !important;
}

/* S/leak and S/WC can appear multiple times — keep alternating */
.desk-wrapper [data-name="S/leak"] {
  background-color: #191D1B !important;
  transition: background-color 0.35s ease !important;
}
.desk-wrapper [data-name="S/WC"] {
  background-color: #121413 !important;
  transition: background-color 0.35s ease !important;
}

/* --- Summary: Brand Surface green tint #16241F --- */
.desk-wrapper [data-name="S/summary"] {
  background-color: #16241F !important;
  transition: background-color 0.35s ease !important;
}

/* --- Fold containers → secondary bg #191D1B --- */
.desk-wrapper [data-name="Fold"] > div > div {
  background-color: #191D1B !important;
  transition: background-color 0.35s ease !important;
}

/* --- Table rows / cells → Design Border Primary --- */
.desk-wrapper [data-name="table"] {
  border-color: #2A2E2C !important;
}
.desk-wrapper [data-name="table"] div {
  border-color: #2A2E2C !important;
  transition: border-color 0.35s ease !important;
}

/* --- Steps pill backgrounds → secondary bg --- */
.desk-wrapper [data-name="Steps"] > div {
  background-color: #191D1B !important;
  border-color: #2A2E2C !important;
  transition: background-color 0.35s ease, border-color 0.35s ease !important;
}

/* --- SVG strokes/fills for dark --- */
.desk-wrapper svg path[stroke="#121413"],
.desk-wrapper svg line[stroke="#121413"],
.desk-wrapper svg circle[stroke="#121413"] {
  stroke: #D1D5D3 !important;
}
.desk-wrapper svg path[fill="#121413"],
.desk-wrapper svg rect[fill="#121413"] {
  fill: #D1D5D3 !important;
}

/* --- White text on dark → keep readable --- */
.desk-wrapper .text-\\[\\#f7f8f7\\] {
  color: #121413 !important;
}

/* --- "14% → 41%" → Brand Primary in dark mode #26F0A1 --- */
.desk-wrapper [data-name="Author C"] p span:last-child,
.desk-wrapper [data-name="Author C"] p span:last-child span {
  color: #26F0A1 !important;
}

.dark .desk-wrapper [data-name="S/summary"] ol li span {
  color: #D1D5D3 !important;
}

.dark .desk-wrapper [data-name="S/summary"] ul.list-disc {
  color: #D1D5D3 !important;
}
`;