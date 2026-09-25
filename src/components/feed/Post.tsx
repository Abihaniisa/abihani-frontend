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
      }}
    >
      <Carousel images={post.images} alt={post.title} />

      {/* Top scrim — keeps the chrome legible */}
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

      {/* Bottom scrim */}
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
    </section>
  );
}