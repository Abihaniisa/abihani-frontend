import Icon from './Icon';

export type NavKey = 'feed' | 'discover' | 'create' | 'orders' | 'you';

type BottomNavProps = {
  current: NavKey;
  onNavigate: (key: NavKey) => void;
};

const ITEMS: Array<{
  key: NavKey;
  label: string;
  icon: 'house' | 'compass' | 'bookmark' | 'person';
}> = [
  { key: 'feed', label: 'Home', icon: 'house' },
  { key: 'discover', label: 'Discover', icon: 'compass' },
  { key: 'orders', label: 'Orders', icon: 'bookmark' },
  { key: 'you', label: 'You', icon: 'person' },
];

export default function BottomNav({ current, onNavigate }: BottomNavProps) {
  const item = (active: boolean): React.CSSProperties => ({
    flex: '1 1 0',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    padding: '6px 4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: active ? '#FFFFFF' : 'rgba(245, 240, 230, 0.55)',
    fontFamily: 'inherit',
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: 0.2,
    transition: 'color .2s var(--ease), transform .15s var(--ease)',
  });

  return (
    <nav
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '0 12px calc(var(--safe-bottom) + 12px)',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 40,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 436,
          display: 'flex',
          alignItems: 'center',
          padding: '8px 6px',
          background: '#C41E3A',
          borderRadius: 26,
          boxShadow:
            '0 10px 34px rgba(196, 30, 58, 0.4), 0 4px 14px rgba(0, 0, 0, 0.55), inset 0 -2px 0 rgba(0, 0, 0, 0.14)',
        }}
      >
        {ITEMS.slice(0, 2).map((i) => {
          const active = current === i.key;
          return (
            <button
              key={i.key}
              type="button"
              style={item(active)}
              onClick={() => onNavigate(i.key)}
            >
              <Icon name={i.icon} size={active ? 24 : 22} />
              <span>{i.label}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onNavigate('create')}
          aria-label="Create"
          style={{
            flex: '1 1 0',
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span
            style={{
              width: 48,
              height: 34,
              borderRadius: 40,
              background: '#E7C27A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow:
                '0 6px 18px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.22) inset, 0 0 22px rgba(231, 194, 122, 0.5)',
              transition: 'transform .2s var(--spring), filter .2s var(--ease)',
            }}
          >
            <span style={{ color: '#C41E3A', display: 'flex' }}>
              <Icon name="plus" size={20} strokeWidth={3} />
            </span>
          </span>
        </button>

        {ITEMS.slice(2).map((i) => {
          const active = current === i.key;
          return (
            <button
              key={i.key}
              type="button"
              style={item(active)}
              onClick={() => onNavigate(i.key)}
            >
              <Icon name={i.icon} size={active ? 24 : 22} />
              <span>{i.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}