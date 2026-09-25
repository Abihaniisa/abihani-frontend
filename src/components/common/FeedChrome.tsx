import Icon from './Icon';
import Wordmark from './Wordmark';

type FeedTab = 'foryou' | 'following';

type FeedChromeProps = {
  tab: FeedTab;
  onTabChange: (tab: FeedTab) => void;
  onSearch: () => void;
  onWordmark: () => void;
};

export default function FeedChrome({
  tab,
  onTabChange,
  onSearch,
  onWordmark,
}: FeedChromeProps) {
  const tabStyle = (active: boolean): React.CSSProperties => ({
    background: 'none',
    border: 'none',
    color: active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.55)',
    fontFamily: 'inherit',
    fontSize: 14.5,
    fontWeight: active ? 800 : 600,
    letterSpacing: '-0.15px',
    padding: '8px 14px',
    cursor: 'pointer',
    position: 'relative',
    whiteSpace: 'nowrap',
    transition: 'color .25s var(--ease)',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(var(--safe-top) + 12px)',
        left: 0,
        right: 0,
        padding: '0 16px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        gap: 12,
        zIndex: 30,
      }}
    >
      <Wordmark onClick={onWordmark} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <button
          type="button"
          style={tabStyle(tab === 'foryou')}
          onClick={() => onTabChange('foryou')}
        >
          For You
          {tab === 'foryou' && (
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 20,
                height: 2.5,
                background: 'var(--crimson)',
                borderRadius: 2,
              }}
            />
          )}
        </button>
        <button
          type="button"
          style={tabStyle(tab === 'following')}
          onClick={() => onTabChange('following')}
        >
          Following
          {tab === 'following' && (
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 20,
                height: 2.5,
                background: 'var(--crimson)',
                borderRadius: 2,
              }}
            />
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={onSearch}
        aria-label="Search"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(245, 240, 230, 0.14)',
          background: 'rgba(12, 12, 18, 0.55)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <Icon name="search" size={19} strokeWidth={2.2} />
      </button>
    </div>
  );
}