import { useEffect, useRef, useState } from 'react';
import Post from '../components/feed/Post';
import { useSession } from '../store/feed.store';
import { fetchSellerPosts } from '../services/post.service';
import type { Post as PostType } from '../types/post.types';

type PostViewerProps = {
  sellerId: string;
  onClose: () => void;
};

export default function PostViewer({ sellerId, onClose }: PostViewerProps) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const liked = useSession((s) => s.liked);
  const saved = useSession((s) => s.saved);
  const toggleLiked = useSession((s) => s.toggleLiked);
  const toggleSaved = useSession((s) => s.toggleSaved);

  const touchStartY = useRef<number | null>(null);
  const translateY = useRef(0);
  const [dragY, setDragY] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchSellerPosts(sellerId).then((list) => {
      if (cancelled) return;
      setPosts(list);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [sellerId]);

  function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    const target = e.currentTarget as HTMLElement;
    /* Only start the close-drag when the container is scrolled
     * to the very top. Otherwise the gesture belongs to scroll. */
    if (target.scrollTop > 0) {
      touchStartY.current = null;
      return;
    }
    touchStartY.current = e.touches[0].clientY;
    translateY.current = 0;
  }

  function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (touchStartY.current === null) return;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (dy > 0) {
      translateY.current = dy;
      setDragY(dy);
    }
  }

  function onTouchEnd() {
    if (touchStartY.current === null) return;
    const dy = translateY.current;
    touchStartY.current = null;
    translateY.current = 0;

    /* A light flick: 80px of drag closes the viewer. */
    if (dy > 80) {
      setDragY(window.innerHeight);
      window.setTimeout(() => {
        setDragY(0);
        onClose();
      }, 200);
    } else {
      setDragY(0);
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        animation: 'abihaniFadeIn 250ms var(--ease) both',
        transform: dragY !== 0 ? `translateY(${dragY}px)` : undefined,
        transition: dragY === 0 ? 'transform .25s var(--ease)' : 'none',
        isolation: 'isolate',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1010,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: 'calc(var(--safe-top) + 14px) 16px 14px',
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            width: 36,
            height: 36,
            background: 'rgba(12,12,18,0.55)',
            border: '1px solid rgba(245,240,230,0.14)',
            color: '#FFF',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div
          style={{
            flex: 1,
            fontSize: 15,
            fontWeight: 700,
            color: '#FFF',
            letterSpacing: '-0.3px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {posts[0]?.seller.name ?? 'Seller'}
        </div>
      </div>

      {loading && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--bone-faint)',
            fontSize: 14,
          }}
        >
          Loading…
        </div>
      )}

      {!loading && posts.length > 0 && (
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            flex: 1,
            overflowY: 'auto',
            overscrollBehaviorY: 'contain',
            scrollSnapType: 'y proximity',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {posts.map((p) => (
            <Post
              key={p.id}
              post={p}
              liked={!!liked[p.id]}
              saved={!!saved[p.id]}
              following={false}
              onLike={() => toggleLiked(p.id)}
              onSave={() => toggleSaved(p.id)}
              onComment={() => {}}
              onShare={() => {}}
              onMore={() => {}}
              onSellerTap={() => {}}
              onFollow={() => {}}
              onBuy={() => {}}
              onSwipeToProfile={() => {}}
            />
          ))}
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--bone-dim)',
            fontSize: 14,
          }}
        >
          No posts yet.
        </div>
      )}
    </div>
  );
}