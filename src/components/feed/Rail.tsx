import Icon from '../common/Icon';
import type { Post } from '../../types/post.types';

type RailProps = {
  post: Post;
  liked: boolean;
  saved: boolean;
  following: boolean;
  onLike: () => void;
  onSave: () => void;
  onComment: () => void;
  onShare: () => void;
  onMore: () => void;
  onAvatar: () => void;
  onFollow: () => void;
};

function RailBtn({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        color: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        cursor: 'pointer',
        padding: 0,
        fontFamily: 'inherit',
      }}
    >
      <span
        style={{
          width: 46,
          height: 46,
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
          transition: 'background .25s var(--ease), border-color .25s var(--ease)',
        }}
      >
        {children}
      </span>
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          color: active ? '#FF5C78' : '#FFF',
          textShadow: '0 1px 8px rgba(0,0,0,0.9)',
        }}
      >
        {label}
      </span>
    </button>
  );
}

function GoldBtn({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        color: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        cursor: 'pointer',
        padding: 0,
        fontFamily: 'inherit',
      }}
    >
      <span
        style={{
          width: 46,
          height: 46,
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
          transition: 'background .25s var(--ease), border-color .25s var(--ease)',
        }}
      >
        {children}
      </span>
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          color: active ? 'var(--gold)' : '#FFF',
          textShadow: '0 1px 8px rgba(0,0,0,0.9)',
        }}
      >
        {label}
      </span>
    </button>
  );
}

export default function Rail({
  post,
  liked,
  saved,
  following,
  onLike,
  onSave,
  onComment,
  onShare,
  onMore,
  onAvatar,
  onFollow,
}: RailProps) {
  return (
    <div
      style={{
        position: 'absolute',
        right: 10,
        bottom: 'calc(var(--safe-bottom) + 118px)',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
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
            width: 48,
            height: 48,
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
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: 'var(--crimson)',
              color: '#FFF',
              border: '2.5px solid var(--ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
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

      <RailBtn label="Like" active={liked} onClick={onLike}>
        <Icon name="heart" size={22} filled={liked} />
      </RailBtn>

      <RailBtn label="Comment" onClick={onComment}>
        <Icon name="comment" size={22} />
      </RailBtn>

      <RailBtn label="Share" onClick={onShare}>
        <Icon name="share" size={22} />
      </RailBtn>

      <GoldBtn label="Save" active={saved} onClick={onSave}>
        <Icon name="save" size={22} filled={saved} />
      </GoldBtn>

      <RailBtn label="More" onClick={onMore}>
        <Icon name="more" size={22} />
      </RailBtn>
    </div>
  );
}