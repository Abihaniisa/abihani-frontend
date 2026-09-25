import { useEffect, useRef, useState } from 'react';
import Post from '../components/feed/Post';
import Sheet from '../components/common/Sheet';
import { useFeed, useSession } from '../store/feed.store';
import {
  fetchForYouPosts,
  fetchFollowingPosts,
  fetchCommentsForPost,
} from '../services/post.service';
import type { Post as PostType } from '../types/post.types';
import type { Comment } from '../types/comment.types';

type FeedProps = {
  tab: 'foryou' | 'following';
  onOpenSeller: (sellerId: string) => void;
};

export default function Feed({ tab, onOpenSeller }: FeedProps) {
  const posts = useFeed((s) => s.posts);
  const setPosts = useFeed((s) => s.setPosts);
  const liked = useSession((s) => s.liked);
  const saved = useSession((s) => s.saved);
  const toggleLiked = useSession((s) => s.toggleLiked);
  const toggleSaved = useSession((s) => s.toggleSaved);

  const [loading, setLoading] = useState(true);
  const [commentsFor, setCommentsFor] = useState<PostType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [shareFor, setShareFor] = useState<PostType | null>(null);

  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const load = tab === 'foryou' ? fetchForYouPosts : fetchFollowingPosts;
    load().then((list) => {
      if (cancelled) return;
      setPosts(list);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [tab, setPosts]);

  async function openComments(post: PostType) {
    setCommentsFor(post);
    setCommentsLoading(true);
    const list = await fetchCommentsForPost(post.id);
    setComments(list);
    setCommentsLoading(false);
  }

  if (loading) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--bone-faint)',
          fontSize: 14,
        }}
      >
        Loading…
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: 40,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--bone)' }}>
          Nothing here yet
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: 'var(--bone-dim)',
            maxWidth: 260,
            lineHeight: 1.5,
          }}
        >
          {tab === 'following'
            ? 'Follow a few sellers and their posts will show up.'
            : 'Check back soon.'}
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={feedRef}
        style={{
          height: '100%',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
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
            onComment={() => openComments(p)}
            onShare={() => setShareFor(p)}
            onMore={() => {}}
            onSellerTap={() => onOpenSeller(p.seller.id)}
            onFollow={() => {}}
            onBuy={() => {}}
            onSwipeToProfile={() => onOpenSeller(p.seller.id)}
          />
        ))}
      </div>

      {commentsFor && (
        <Sheet
          title="Comments"
          subtitle={
            commentsLoading
              ? 'Loading…'
              : `${comments.length} comment${
                  comments.length === 1 ? '' : 's'
                }`
          }
          onClose={() => setCommentsFor(null)}
        >
          {comments.length === 0 && !commentsLoading && (
            <div
              style={{
                padding: '20px 0',
                textAlign: 'center',
                color: 'var(--bone-dim)',
                fontSize: 13.5,
              }}
            >
              No comments yet.
            </div>
          )}

          {comments.map((c) => (
            <div
              key={c.id}
              style={{
                display: 'flex',
                gap: 11,
                padding: '14px 0',
                alignItems: 'flex-start',
                borderBottom: '1px solid rgba(245, 240, 230, 0.06)',
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundImage: `url('${c.user.avatarUrl ?? ''}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 4,
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: 'var(--bone)',
                    }}
                  >
                    {c.user.name}
                  </span>
                  {c.verifiedPurchase && (
                    <span
                      style={{
                        fontSize: 9.5,
                        fontWeight: 800,
                        letterSpacing: 0.3,
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        background: 'rgba(231, 194, 122, 0.16)',
                        border: '1px solid rgba(231, 194, 122, 0.45)',
                        padding: '2px 7px',
                        borderRadius: 40,
                      }}
                    >
                      Verified Purchase
                    </span>
                  )}
                  {c.seller && (
                    <span
                      style={{
                        fontSize: 9.5,
                        fontWeight: 800,
                        letterSpacing: 0.3,
                        textTransform: 'uppercase',
                        color: '#FF5C78',
                        background: 'rgba(196, 30, 58, 0.14)',
                        border: '1px solid rgba(196, 30, 58, 0.45)',
                        padding: '2px 7px',
                        borderRadius: 40,
                      }}
                    >
                      Seller
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--bone-faint)',
                    }}
                  >
                    {c.time}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    color: 'var(--bone)',
                    lineHeight: 1.5,
                  }}
                >
                  {c.text}
                </div>
              </div>
            </div>
          ))}
        </Sheet>
      )}

      {shareFor && (
        <Sheet
          title="Share"
          subtitle={shareFor.title}
          onClose={() => setShareFor(null)}
        >
          {['Copy link', 'Share to WhatsApp', 'Share to Instagram'].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setShareFor(null)}
              style={{
                width: '100%',
                padding: '14px 0',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(245, 240, 230, 0.06)',
                textAlign: 'left',
                color: 'var(--bone)',
                fontFamily: 'inherit',
                fontSize: 14.5,
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </Sheet>
      )}
    </>
  );
}