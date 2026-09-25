import Icon from '../common/Icon';
import type { Post } from '../../types/post.types';

type RailProps = {
  post: Post;
  liked: boolean;
  saved: boolean;
  following: boolean;
  cardOpen: boolean;
  onLike: () => void;
  onSave: () => void;
  onComment: () => void;
  onShare: () => void;
  onMore: () => void;
  onAvatar: () => void;
  onFollow: () => void;
};

type Tone = 'bone' | 'crimson' | 'gold';

function railIconStyle(tone: Tone, active: boolean): React.CSSProperties {
  if (tone === 'crimson') {
    return {
      width: 44,
      height: 44,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: active
        ? 'rgba(196, 30, 58, 0.22)'
        : 'rgba(18, 16, 22, 0.72)',
      border: active
        ? '1px solid rgba(196, 30, 58, 0.55)'
        : '1px solid rgba(245, 240, 230, 0.10)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      color: active ? '#FF5C78' : '#FFF',
      transition:
        'background .25s var(--ease), border-color .25s var(--ease), color .25s var(--ease)',
    };
  }
  if (tone === 'gold') {
    return {
      width: 44,
      height: 44,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: active
        ? 'rgba(231, 194, 122, 0.22)'
        : 'rgba(18, 16, 22, 0.72)',
      border: active
        ? '1px solid rgba(231, 194, 122, 0.6)'
        : '1px solid rgba(245, 240, 230, 0.10)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      color: active ? 'var(--gold)' : '#FFF',
      transition:
        'background .25s var(--ease), border-color .25s var(--ease), color .25s var(--ease)',
    };
  }
  return {
    width: 44,
    height: 44,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(18, 16, 22, 0.72)',
    border: '1px solid rgba(245, 240, 230, 0.10)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    color: '#FFF',
    transition:
      'background .25s var(--ease), border-color .25s var(--ease), color .25s var(--ease)',
  };
}

function railLabelStyle(tone: Tone, active: boolean): React.CSSProperties {
  const color =
    tone === 'gold' && active
      ? 'var(--gold)'
      : tone === 'crimson' && active
      ? '#FF5C78'
      : '#FFF';
  return {
    fontSize: 11,
    fontWeight: 700,
    color,
    textShadow: '0 1px 8px rgba(0,0,0,0.9)',
  };
}

export default function Rail({
  post,
  liked,
  saved,
  following,
  cardOpen,
  onLike,
  onSave,
  onComment,
  onShare,
  onMore,
  onAvatar,
  onFollow,
}: RailProps) {
  const railBottom = cardOpen ? 280 : 210;

  return (
    <div
      style={{
        position: 'absolute',
        right: 10,
        bottom: `calc(var(--safe-bottom) + ${railBottom}px)`,
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 9,
        transition: 'bottom .35s cubic-bezier(.32, .72, 0, 1)',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <button
          type="button"
          onClick={onAvatar}
          aria-label={post.seller.name}
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            backgroundImage: `url('${post.seller.avatarUrl ?? ''}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid #FFF',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.55)',
            padding: 0,
          }}
        />
        {!following && (
          <button
            type="button"
            onClick={onFollow}
            aria-label="Follow"
            style={{
              position: 'absolute',
              bottom: -6,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'var(--crimson)',
              color: '#FFF',
              border: '2.5px solid var(--ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 800,
              lineHeight: 1,
              cursor: 'pointer',
              padding: 0,
              boxShadow: '0 3px 10px rgba(196, 30, 58, 0.5)',
            }}
          >
            +
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onFollow}
        style={{
          padding: '5px 12px',
          background: following ? 'rgba(20, 18, 24, 0.72)' : 'var(--crimson)',
          color: following ? 'var(--bone-dim)' : '#FFF',
          border: following
            ? '1px solid rgba(245, 240, 230, 0.16)'
            : 'none',
          borderRadius: 40,
          fontSize: 10.5,
          fontWeight: 700,
          fontFamily: 'inherit',
          letterSpacing: 0.1,
          cursor: 'pointer',
          boxShadow: following
            ? 'none'
            : '0 4px 14px rgba(196, 30, 58, 0.4)',
          backdropFilter: following ? 'blur(16px)' : undefined,
          WebkitBackdropFilter: following ? 'blur(16px)' : undefined,
          transition:
            'background .25s var(--ease), color .25s var(--ease), border-color .25s var(--ease)',
        }}
      >
        {following ? 'Following' : 'Follow'}
      </button>

      <button
        type="button"
        onClick={onLike}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          fontFamily: 'inherit',
        }}
      >
        <span style={railIconStyle('crimson', liked)}>
          <Icon name="heart" size={21} filled={liked} />
        </span>
        <span style={railLabelStyle('crimson', liked)}>Like</span>
      </button>

      <button
        type="button"
        onClick={onComment}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          fontFamily: 'inherit',
        }}
      >
        <span style={railIconStyle('bone', false)}>
          <Icon name="comment" size={21} />
        </span>
        <span style={railLabelStyle('bone', false)}>Comment</span>
      </button>

      <button
        type="button"
        onClick={onShare}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          fontFamily: 'inherit',
        }}
      >
        <span style={railIconStyle('bone', false)}>
          <Icon name="share" size={21} />
        </span>
        <span style={railLabelStyle('bone', false)}>Share</span>
      </button>

      <button
        type="button"
        onClick={onSave}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          fontFamily: 'inherit',
        }}
      >
        <span style={railIconStyle('gold', saved)}>
          <Icon name="save" size={21} filled={saved} />
        </span>
        <span style={railLabelStyle('gold', saved)}>Save</span>
      </button>

      <button
        type="button"
        onClick={onMore}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          fontFamily: 'inherit',
        }}
      >
        <span style={railIconStyle('bone', false)}>
          <Icon name="more" size={21} />
        </span>
        <span style={railLabelStyle('bone', false)}>More</span>
      </button>
    </div>
  );
}