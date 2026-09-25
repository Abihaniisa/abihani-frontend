type WordmarkProps = {
  onClick?: () => void;
};

export default function Wordmark({ onClick }: WordmarkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Abihani — About"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: onClick ? 'pointer' : 'default',
        color: 'var(--bone)',
      }}
    >
      <span
        style={{
          fontSize: 19,
          fontWeight: 800,
          letterSpacing: '-0.6px',
          lineHeight: 1,
          color: 'var(--bone)',
        }}
      >
        Abihani
      </span>
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--crimson)',
          boxShadow: '0 0 10px rgba(196, 30, 58, 0.85)',
          animation: 'abihaniBlink 2s var(--ease) infinite',
          flexShrink: 0,
        }}
      />
      <style>{`
        @keyframes abihaniBlink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.86); }
        }
      `}</style>
    </button>
  );
}