import { useEffect, useState } from 'react';
import Post from '../components/feed/Post';
import Sheet from '../components/common/Sheet';
import CommentComposer from '../components/feed/CommentComposer';
import FeedEnd from '../components/feed/FeedEnd';
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

  const [commentsFor, setCommentsFor] = useState<PostType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [shareFor, setShareFor] = useState<PostType | null>(null);
  const [moreFor, setMoreFor] = useState<PostType | null>(null);
  const [following, setFollowing] = useState<Record<string, boolean>>({});
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMsg) return;
    const t = window.setTimeout(() => setToastMsg(null), 2000);
    return () => window.clearTimeout(t);
  }, [toastMsg]);

  useEffect(() => {
    if (posts.length > 0) return;
    let cancelled = false;
    const load = tab === 'foryou' ? fetchForYouPosts : fetchFollowingPosts;
    load().then((list) => {
      if (cancelled) return;
      setPosts(list);
    });
    return () => {
      cancelled = true;
    };
  }, [tab, posts.length, setPosts]);

  async function openComments(post: PostType) {
    setCommentsFor(post);
    setCommentsLoading(true);
    const list = await fetchCommentsForPost(post.id);
    setComments(list);
    setCommentsLoading(false);
  }

  function sendComment(text: string) {
    if (!commentsFor) return;
    const optimistic: Comment = {
      id: `c_local_${Date.now()}`,
      postId: commentsFor.id,
      user: {
        id: 'me',
        name: 'You',
        avatarUrl: null,
        verified: false,
      },
      time: 'now',
      text,
      likes: 0,
      verifiedPurchase: false,
      seller: false,
      replies: [],
    };
    setComments((c) => [...c, optimistic]);
  }

  function handleShareOption(label: string) {
    setShareFor(null);
    if (label === 'Copy link') setToastMsg('Link copied');
    else if (label === 'Share to WhatsApp') setToastMsg('Opening WhatsApp…');
    else if (label === 'Share to Instagram') setToastMsg('Opening Instagram…');
    else setToastMsg(label);
  }

  function handleBuy(_post: PostType) {
    setToastMsg('Buy flow coming soon');
  }

  function handleMore(post: PostType) {
    setMoreFor(post);
  }

  function toggleFollow(sellerId: string) {
    setFollowing((f) => ({ ...f, [sellerId]: !f[sellerId] }));
  }

  function handleSellerTap(sellerId: string) {
    onOpenSeller(sellerId);
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
        style={{
          height: '100%',
          overflowY: 'scroll',
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
            following={!!following[p.seller.id]}
            onLike={() => toggleLiked(p.id)}
            onSave={() => toggleSaved(p.id)}
            onComment={() => openComments(p)}
            onShare={() => setShareFor(p)}
            onMore={() => handleMore(p)}
            onSellerTap={() => handleSellerTap(p.seller.id)}
            onFollow={() => toggleFollow(p.seller.id)}
            onBuy={() => handleBuy(p)}
            onSwipeToProfile={() => handleSellerTap(p.seller.id)}
          />
        ))}

        <FeedEnd />
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
                padding: '20px 0 24px',
                textAlign: 'center',
                color: 'var(--bone-dim)',
                fontSize: 13.5,
              }}
            >
              No comments yet. Be the first to ask something.
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
                  backgroundImage: c.user.avatarUrl
                    ? `url('${c.user.avatarUrl}')`
                    : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  flexShrink: 0,
                  background: c.user.avatarUrl
                    ? undefined
                    : 'linear-gradient(135deg, #2B2733, #17151C)',
                  border: '1px solid rgba(245, 240, 230, 0.10)',
                  color: 'var(--bone)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                {!c.user.avatarUrl && c.user.name.charAt(0).toUpperCase()}
              </span>
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
                    style={{ fontSize: 11, color: 'var(--bone-faint)' }}
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

          <CommentComposer userAvatarUrl={null} onSubmit={sendComment} />
        </Sheet>
      )}

      {shareFor && (
        <Sheet
          title="Share"
          subtitle={shareFor.title}
          onClose={() => setShareFor(null)}
        >
          {['Copy link', 'Share to WhatsApp', 'Share to Instagram'].map(
            (label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleShareOption(label)}
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
            ),
          )}
        </Sheet>
      )}

      {moreFor && (
        <Sheet
          title="Post options"
          subtitle={moreFor.title}
          onClose={() => setMoreFor(null)}
        >
          {['Report post', 'Report seller', 'Block seller', 'Cancel'].map(
            (label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setMoreFor(null);
                  if (label === 'Cancel') return;
                  setToastMsg(label);
                }}
                style={{
                  width: '100%',
                  padding: '14px 0',
                  background: 'none',
                  border: 'none',
                  borderBottom:
                    i < 3
                      ? '1px solid rgba(245, 240, 230, 0.06)'
                      : 'none',
                  textAlign: 'left',
                  color: label.startsWith('Block')
                    ? '#FF5C78'
                    : 'var(--bone)',
                  fontFamily: 'inherit',
                  fontSize: 14.5,
                  cursor: 'pointer',
                }}
              >
                {label}
              </button>
            ),
          )}
        </Sheet>
      )}

      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: 'calc(var(--safe-bottom) + 110px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--crimson)',
            color: '#FFF',
            padding: '13px 24px',
            borderRadius: 40,
            fontSize: 13.5,
            fontWeight: 700,
            letterSpacing: '-0.15px',
            boxShadow: '0 16px 44px rgba(196, 30, 58, 0.5)',
            zIndex: 400,
            whiteSpace: 'nowrap',
            maxWidth: '88vw',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {toastMsg}
        </div>
      )}
    </>
  );
}