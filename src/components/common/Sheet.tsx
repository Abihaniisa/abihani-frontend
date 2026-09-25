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
          padding: '14px 20px calc(var(--safe-bottom) + 26px)',
          boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.75)',
          borderTop: '1px solid rgba(245, 240, 230, 0.10)',
          zIndex: 100,
          maxHeight: '88dvh',
          overflowY: 'auto',
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
              marginBottom: subtitle ? 6 : 18,
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
              marginBottom: 20,
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </div>
        )}

        {children}
      </div>
    </>
  );
}