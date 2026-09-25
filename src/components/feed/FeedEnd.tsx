import Icon from '../common/Icon';

export default function FeedEnd() {
  return (
    <div
      style={{
        scrollSnapAlign: 'start',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        background: 'var(--ink)',
        color: 'var(--bone)',
        padding: '0 40px',
        textAlign: 'center',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(231, 194, 122, 0.08)',
          border: '1px solid rgba(231, 194, 122, 0.25)',
          color: 'var(--gold)',
        }}
      >
        <Icon name="check" size={26} strokeWidth={2.4} />
      </span>

      <div
        style={{
          width: 40,
          height: 1,
          background: 'rgba(231, 194, 122, 0.35)',
          borderRadius: 1,
        }}
      />

      <div
        style={{
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: '-0.3px',
          color: 'var(--bone)',
        }}
      >
        You are all caught up.
      </div>

      <div
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--bone-faint)',
          lineHeight: 1.5,
          maxWidth: 240,
        }}
      >
        New posts will appear here as sellers publish.
      </div>
    </div>
  );
}