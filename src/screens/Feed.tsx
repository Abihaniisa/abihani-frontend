type FeedProps = {
  tab: 'foryou' | 'following';
};

export default function Feed({ tab }: FeedProps) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--bone)',
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: '-0.3px',
      }}
    >
      Feed {tab === 'following' ? '· Following' : '· For You'}
    </div>
  );
}