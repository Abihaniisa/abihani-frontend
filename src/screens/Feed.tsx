/* ABIHANI — Feed
 * Fixing: BUG-01 (scroll position preserved),
 *         BUG-07 (chrome hides when viewer opens),
 *         BUG-10 (reply state to composer)
 * Wirings:
 *   - onOpenSeller → parent opens PostViewer overlay.
 *   - Like, save, comment, share, more, follow, buy all wired
 *     through Post to the correct handlers.
 *   - Comment sheet mounts the Comment + CommentComposer stack.
 *   - Share sheet closes on tap.
 *   - More sheet closes on tap.
 *   - Buy sheet mounted as a sibling overlay.
 *   - Feed scroll position saved on unmount, restored on mount. */

import { useEffect, useRef, useState } from 'react';
import Post from '../components/feed/Post';
import Sheet from '../components/common/Sheet';
import Comment from '../components/feed/Comment';
import CommentComposer from '../components/feed/CommentComposer';
import FeedEnd from '../components/feed/FeedEnd';
import BuySheet from '../components/feed/BuySheet';
import { useFeed, useSession } from '../store/feed.store';
import {
  fetchForYouPosts,
  fetchFollowingPosts,
  fetchCommentsForPost,
} from '../services/post.service';
import type { Post as PostType } from '../types/post.types';
import type { Comment as CommentType } from '../types/comment.types';

type FeedProps = {
  tab: 'foryou' | 'following';
  onOpenSeller: (sellerId: string) => void;
};

const SCROLL_KEY = 'abihani.feed.scrollY';

export default function Feed({ tab, onOpenSeller }: FeedProps) {
  const posts = useFeed((s) => s.posts);
  const setPosts = useFeed((s) => s.setPosts);
  const liked = useSession((s) => s.liked);
  const saved = useSession((s) => s.saved);
  const toggleLiked = useSession((s) => s.toggleLiked);
  const toggleSaved = useSession((s) => s.toggleSaved);

  const [commentsFor, setCommentsFor] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [shareFor, setShareFor] = useState<PostType | null>(null);
  const [moreFor, setMoreFor] = useState<PostType | null>(null);
  const [buyFor, setBuyFor] = useState<PostType | null>(null);
  const [following, setFollowing] = useState<Record<string, boolean>>({});
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const saved = Number(sessionStorage.getItem(SCROLL_KEY) || '0');
    if (saved > 0) el.scrollTop = saved;
    const onScroll = () => {
      sessionStorage.setItem(SCROLL_KEY, String(el.scrollTop));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [posts.length]);

  async function openComments(post: PostType) {
    setCommentsFor(post);
    setReplyTo(null);
    setCommentsLoading(true);
    const list = await fetchCommentsForPost(post.id);
    setComments(list);
    setCommentsLoading(false);
  }

  function sendComment(text: string) {
    if (!commentsFor) return;
    const optimistic: CommentType = {
      id: `c_local_${Date.now()}`,
      postId: commentsFor.id,
      user: {
        id: 'me',
        name: replyTo ? `@${replyTo}` : 'You',
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
    setReplyTo(null);
  }

  function handleShareOption(label: string) {
    setShareFor(null);
    if (label === 'Copy link') setToastMsg('Link copied');
    else if (label === 'Share to WhatsApp') setToastMsg('Opening WhatsApp…');
    else if (label === 'Share to Instagram') setToastMsg('Opening Instagram…');
    else setToastMsg(label);
  }

  function handleBuy(post: PostType) {
    setBuyFor(post);
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
        ref={scrollRef}
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
          onClose={() => {
            setCommentsFor(null);
            setReplyTo(null);
          }}
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
            <Comment
              key={c.id}
              comment={c}
              onReply={(name) => setReplyTo(name)}
            />
          ))}

          <CommentComposer
            userAvatarUrl={null}
            replyTo={replyTo}
            onSubmit={sendComment}
            onCancelReply={() => setReplyTo(null)}
          />
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

      {buyFor && (
        <BuySheet
          post={buyFor}
          onClose={() => setBuyFor(null)}
          onPay={(note) => {
            setBuyFor(null);
            setToastMsg(
              note
                ? `Order created with note: ${note}`
                : 'Order created',
            );
          }}
          onAsk={() => {
            setBuyFor(null);
            setToastMsg('Private thread coming in Stage 8');
          }}
        />
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