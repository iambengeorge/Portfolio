import { useRef, useState, useCallback } from 'react';
import videoSrc from '../../imports/Main_screens.mp4';

interface Props {
  dark: boolean;
}

export function VideoMockup({ dark }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const chromeBg = dark ? '#1f2422' : '#e8ecea';
  const chromeBorder = dark ? '#2A2E2C' : '#d4dad7';
  const urlBarBg = dark ? '#121413' : '#f7f8f7';
  const urlText = dark ? '#949A98' : '#727a77';

  return (
    <div
      style={{
        width: '100%',
        marginTop: 24,
        marginBottom: 8,
      }}
      data-name="Video Mockup"
    >
      <div
        ref={containerRef}
        style={{
          width: '100%',
          borderRadius: 12,
          overflow: 'hidden',
          border: `1px solid ${chromeBorder}`,
          backgroundColor: chromeBg,
          boxShadow: dark
            ? '0 8px 24px rgba(0,0,0,0.4)'
            : '0 8px 24px rgba(18,20,19,0.08)',
          transition: 'background-color 0.35s ease, border-color 0.35s ease',
        }}
      >
        {/* Mac browser chrome */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 14px',
            borderBottom: `1px solid ${chromeBorder}`,
            backgroundColor: chromeBg,
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={dot('#FF5F57')} />
            <span style={dot('#FEBC2E')} />
            <span style={dot('#28C840')} />
          </div>
          {/* URL bar */}
          <div
            style={{
              flex: 1,
              backgroundColor: urlBarBg,
              borderRadius: 6,
              padding: '4px 10px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: urlText,
              textAlign: 'center',
              border: `1px solid ${chromeBorder}`,
              transition: 'background-color 0.35s ease',
            }}
          >
            omnipractice.app
          </div>
          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: urlText,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isFullscreen ? (
                <>
                  <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                  <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                  <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                  <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                </>
              ) : (
                <>
                  <path d="M3 8V5a2 2 0 0 1 2-2h3" />
                  <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                  <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </>
              )}
            </svg>
          </button>
        </div>
        {/* Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            backgroundColor: dark ? '#121413' : '#f7f8f7',
          }}
        />
      </div>
    </div>
  );
}

const dot = (color: string): React.CSSProperties => ({
  display: 'inline-block',
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: color,
});
