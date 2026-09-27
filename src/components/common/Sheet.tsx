/* ABIHANI — Sheet
 * Fixing: BUG-03 (no blue outline inside sheet),
 *         BUG-09 (rounded corners clip children cleanly)
 * Wirings:
 *   - onClose called on scrim tap
 *   - onClose called on Escape key
 *   - Children render inside a scroll container with no
 *     overflow bleed
 *   - Every sheet in the app uses this component:
 *     comments, share, more, buy, terms, logout */

import { useEffect } from 'react';

type SheetProps = {
  title?: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Sheet({
  title,
  subtitle,
  onClose,
  children,
}: SheetProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 90,
          WebkitTapHighlightColor: 'transparent',
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          maxWidth: 460,
          margin: '0 auto',
          background: 'var(--surface, #17151C)',
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          padding: 0,
          boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.75)',
          borderTop: '1px solid rgba(245, 240, 230, 0.10)',
          zIndex: 100,
          maxHeight: '88dvh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <div
          style={{
            padding: '14px 20px 0',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              borderRadius: 4,
              background: 'rgba(245, 240, 230, 0.18)',
              margin: '0 auto 20px',
            }}
          />

          {title && (
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: 'var(--bone)',
                letterSpacing: '-0.5px',
                marginBottom: subtitle ? 6 : 16,
              }}
            >
              {title}
            </div>
          )}

          {subtitle && (
            <div
              style={{
                fontSize: 13.5,
                color: 'var(--bone-faint)',
                marginBottom: 14,
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '0 20px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            borderBottomLeftRadius: 28,
            borderBottomRightRadius: 28,
          }}
        >
          <div style={{ paddingBottom: 20 }}>{children}</div>
        </div>
      </div>

      <style>{`
        [role='dialog'] *:focus,
        [role='dialog'] *:focus-visible {
          outline: none !important;
          -webkit-tap-highlight-color: transparent;
        }
        [role='dialog'] button:focus-visible,
        [role='dialog'] input:focus-visible,
        [role='dialog'] textarea:focus-visible {
          box-shadow:
            0 0 0 2px var(--surface, #17151C),
            0 0 0 4px rgba(231, 194, 122, 0.55);
          border-radius: inherit;
        }
        [role='dialog']::-webkit-scrollbar { display: none; }
        [role='dialog'] > div::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}