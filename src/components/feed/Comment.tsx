/* ABIHANI — Comment
 * Fixing: BUG-10 (reply affordance on every comment)
 * Wirings:
 *   - Reply tap → onReply(userName) → parent opens reply bar above composer
 *   - Avatar and name are not tappable yet. Profile navigation comes
 *     in Stage 9. Do not wire here.
 *   - Renders nested replies below the parent, indented. */

import type { Comment as CommentType } from '../../types/comment.types';

type CommentProps = {
  comment: CommentType;
  onReply: (userName: string) => void;
};

function Avatar({
  url,
  name,
  size = 36,
}: {
  url: string | null;
  name: string;
  size?: number;
}) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundImage: url ? `url('${url}')` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flexShrink: 0,
        background: url
          ? undefined
          : 'linear-gradient(135deg, #2B2733, #17151C)',
        border: '1px solid rgba(245, 240, 230, 0.10)',
        color: 'var(--bone)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.4,
        fontWeight: 800,
      }}
    >
      {!url && initial}
    </span>
  );
}

export default function Comment({ comment, onReply }: CommentProps) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: 11,
          padding: '14px 0',
          alignItems: 'flex-start',
          borderBottom: '1px solid rgba(245, 240, 230, 0.06)',
        }}
      >
        <Avatar
          url={comment.user.avatarUrl}
          name={comment.user.name}
          size={36}
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
                letterSpacing: '-0.1px',
              }}
            >
              {comment.user.name}
            </span>

            {comment.verifiedPurchase && (
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

            {comment.seller && (
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

            <span style={{ fontSize: 11, color: 'var(--bone-faint)' }}>
              {comment.time}
            </span>
          </div>

          <div
            style={{
              fontSize: 13.5,
              color: 'var(--bone)',
              lineHeight: 1.5,
              letterSpacing: '-0.05px',
            }}
          >
            {comment.text}
          </div>

          <button
            type="button"
            onClick={() => onReply(comment.user.name)}
            style={{
              marginTop: 8,
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'var(--bone-faint)',
              fontFamily: 'inherit',
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: 0.05,
              cursor: 'pointer',
            }}
          >
            Reply
          </button>
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div style={{ paddingLeft: 47 }}>
          {comment.replies.map((reply) => (
            <div
              key={reply.id}
              style={{
                display: 'flex',
                gap: 11,
                padding: '12px 0',
                alignItems: 'flex-start',
                borderBottom: '1px solid rgba(245, 240, 230, 0.06)',
              }}
            >
              <Avatar
                url={reply.user.avatarUrl}
                name={reply.user.name}
                size={30}
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
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: 'var(--bone)',
                    }}
                  >
                    {reply.user.name}
                  </span>
                  {reply.seller && (
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        letterSpacing: 0.3,
                        textTransform: 'uppercase',
                        color: '#FF5C78',
                        background: 'rgba(196, 30, 58, 0.14)',
                        border: '1px solid rgba(196, 30, 58, 0.45)',
                        padding: '1px 6px',
                        borderRadius: 40,
                      }}
                    >
                      Seller
                    </span>
                  )}
                  <span style={{ fontSize: 10.5, color: 'var(--bone-faint)' }}>
                    {reply.time}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--bone)',
                    lineHeight: 1.5,
                  }}
                >
                  {reply.text}
                </div>
                <button
                  type="button"
                  onClick={() => onReply(reply.user.name)}
                  style={{
                    marginTop: 6,
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--bone-faint)',
                    fontFamily: 'inherit',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 0.05,
                    cursor: 'pointer',
                  }}
                >
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}