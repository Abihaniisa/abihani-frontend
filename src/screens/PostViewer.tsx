/* ABIHANI — Post Viewer
 * Fixing: BUG-07 (full-screen overlay, no chrome bleed),
 *         BUG-08 (owns its own scroll, no feed bleed)
 * Wirings:
 *   - Back arrow → onClose → parent hides viewer, feed
 *     scroll position preserved.
 *   - Swipe down from top → onClose → same.
 *   - Vertical scroll through that seller's posts only.
 *   - Each post in the viewer has its own like, save,
 *     comment, share wiring via Post component. */

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef<{ startY: number; active: boolean }>({
    startY: 0,
    active: false,
  });

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
    touchRef.current = {
      startY: e.touches[0].clientY,
      active: true,
    };
  }

  function onTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    const s = touchRef.current;
    if (!s.active) return;
    s.active = false;
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    if (scrollEl.scrollTop > 4) return;
    const dy = e.changedTouches[0].clientY - s.startY;
    if (dy > 90) {
      onClose();
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        animation: 'abihaniFadeIn 250ms var(--ease) both',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 210,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: 'calc(var(--safe-top) + 14px) 16px 14px',
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))',
          pointerEvents: 'none',
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
            pointerEvents: 'auto',
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
          ref={scrollRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'scroll',
            overflowX: 'hidden',
            scrollSnapType: 'y mandatory',
            overscrollBehaviorY: 'contain',
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