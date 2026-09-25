import { useEffect, useState } from 'react';

type SplashProps = {
  onDone: () => void;
};

export default function Splash({ onDone }: SplashProps) {
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const nameTimer = window.setTimeout(() => setShowName(true), 1000);
    const doneTimer = window.setTimeout(() => onDone(), 2200);
    return () => {
      window.clearTimeout(nameTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        zIndex: 1000,
        animation: 'abihaniFadeIn 300ms var(--ease) both',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="120"
        height="120"
        aria-hidden="true"
        style={{ color: '#C41E3A' }}
      >
        <path
          d="M5 20 L12 4 L19 20"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M8 14 L16 14"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {showName && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            animation: 'abihaniFadeUp 400ms var(--ease) both',
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: '#6B6B6B',
              letterSpacing: '-0.1px',
            }}
          >
            from
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#C41E3A',
              letterSpacing: '-0.4px',
            }}
          >
            Abihani Isa
          </span>
        </div>
      )}

      <style>{`
        @keyframes abihaniFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes abihaniFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}