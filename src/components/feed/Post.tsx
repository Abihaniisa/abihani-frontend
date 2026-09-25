import { useRef, useState } from 'react';
import Carousel from './Carousel';
import Rail from './Rail';
import InfoCard from './InfoCard';
import type { Post as PostType } from '../../types/post.types';

type PostProps = {
  post: PostType;
  liked: boolean;
  saved: boolean;
  following: boolean;
  onLike: () => void;
  onSave: () => void;
  onComment: () => void;
  onShare: () => void;
  onMore: () => void;
  onSellerTap: () => void;
  onFollow: () => void;
  onBuy: () => void;
  onSwipeToProfile: () => void;
};

export default function Post({
  post,
  liked,
  saved,
  following,
  onLike,
  onSave,
  onComment,
  onShare,
  onMore,
  onSellerTap,
  onFollow,
  onBuy,
  onSwipeToProfile,
}: PostProps) {
  const mediaRef = useRef<HTMLDivElement>(null);

  const [heartBursts, setHeartBursts] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  const [shiftOut, setShiftOut] = useState(false);
  const touchState = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    onLastImage: boolean;
  }>({ active: false, startX: 0, startY: 0, onLastImage: false });

  const lastTapRef = useRef(0);

  function isCarouselAtEnd(): boolean {
    const el = mediaRef.current;
    if (!el) return true;
    const track = el.querySelector('[data-carousel]') as HTMLElement | null;
    if (!track) return true;
    const maxScroll = track.scrollWidth - track.clientWidth;
    return track.scrollLeft >= maxScroll - 4;
  }

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (!liked) onLike();
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const id = now;
      setHeartBursts((b) => [
        ...b,
        { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
      ]);
      window.setTimeout(() => {
        setHeartBursts((b) => b.filter((x) => x.id !== id));
      }, 900);
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;
  }

  function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    const t = e.touches[0];
    touchState.current = {
      active: true,
      startX: t.clientX,
      startY: t.clientY,
      onLastImage: isCarouselAtEnd(),
    };
  }

  function onTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    const state = touchState.current;
    if (!state.active) return;
    state.active = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - state.startX;
    const dy = Math.abs(t.clientY - state.startY);
    if (dy > 60) return;
    if (dx < -90 && state.onLastImage) {
      setShiftOut(true);
      window.setTimeout(() => {
        onSwipeToProfile();
        setShiftOut(false);
      }, 180);
    }
  }

  return (
    <section
      data-post={post.id}
      style={{
        position: 'relative',
        height: '100dvh',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        overflow: 'hidden',
        background: '#000',
        flexShrink: 0,
        transform: shiftOut ? 'translateX(-40px)' : 'translateX(0)',
        transition: 'transform .18s var(--ease)',
      }}
    >
      <div
        ref={mediaRef}
        onClick={handleClick}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}
      >
        <Carousel images={post.images} alt={post.title} />

        {heartBursts.map((b) => (
          <span
            key={b.id}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: b.x,
              top: b.y,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              animation: 'abihaniHeartBurst .85s var(--spring) forwards',
              zIndex: 40,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width={100}
              height={100}
              fill="var(--crimson)"
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(196,30,58,0.6))',
              }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </span>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 210,
          background:
            'linear-gradient(to bottom, rgba(5,5,10,0.9) 0%, rgba(5,5,10,0.5) 45%, rgba(5,5,10,0) 100%)',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '60%',
          background:
            'linear-gradient(to top, rgba(5,5,10,0.96) 0%, rgba(5,5,10,0.7) 30%, rgba(5,5,10,0) 100%)',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />

      <Rail
        post={post}
        liked={liked}
        saved={saved}
        following={following}
        onLike={onLike}
        onSave={onSave}
        onComment={onComment}
        onShare={onShare}
        onMore={onMore}
        onAvatar={onSellerTap}
        onFollow={onFollow}
      />

      <InfoCard post={post} onSellerTap={onSellerTap} onBuy={onBuy} />

      <style>{`
        @keyframes abihaniHeartBurst {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          25% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
          55% { transform: translate(-50%, -50%) scale(0.94); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
        }
      `}</style>
    </section>
  );
}