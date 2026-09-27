/* ABIHANI — Comment Composer
 * Fixing: BUG-09 (radii fit the sheet), BUG-10 (reply bar)
 * Wirings:
 *   - Send tap → onSubmit(text, replyTo) → parent adds optimistic
 *     comment, increments rail count, pushes notification to seller.
 *   - Reply bar Cancel → onCancelReply() → parent clears replyTo.
 *   - Enter key sends the comment.
 *   - Never requests autofill. Never shows a paperclip. */

import { useEffect, useState } from 'react';
import Icon from '../common/Icon';

type CommentComposerProps = {
  userAvatarUrl: string | null;
  replyTo: string | null;
  onSubmit: (text: string) => void;
  onCancelReply: () => void;
};

export default function CommentComposer({
  userAvatarUrl,
  replyTo,
  onSubmit,
  onCancelReply,
}: CommentComposerProps) {
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (replyTo) setFocus(true);
  }, [replyTo]);

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText('');
  }

  return (
    <div
      style={{
        marginTop: 12,
        borderRadius: 24,
        overflow: 'hidden',
      }}
    >
      {replyTo && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            background: 'rgba(196, 30, 58, 0.10)',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            border: '1px solid rgba(196, 30, 58, 0.35)',
            borderBottom: 'none',
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: 'var(--bone-dim)',
              fontWeight: 600,
              letterSpacing: '-0.05px',
            }}
          >
            Replying to{' '}
            <span style={{ color: '#FF5C78', fontWeight: 700 }}>
              @{replyTo}
            </span>
          </div>
          <button
            type="button"
            onClick={onCancelReply}
            aria-label="Cancel reply"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'var(--bone-faint)',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'flex-end',
          padding: '10px 12px',
          background: 'var(--surface-2, #221F2A)',
          border: '1px solid rgba(245, 240, 230, 0.10)',
          borderTopLeftRadius: replyTo ? 0 : 24,
          borderTopRightRadius: replyTo ? 0 : 24,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundImage: userAvatarUrl
              ? `url('${userAvatarUrl}')`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexShrink: 0,
            background: userAvatarUrl
              ? undefined
              : 'linear-gradient(135deg, #2B2733, #17151C)',
            border: '1px solid rgba(245, 240, 230, 0.10)',
          }}
        />

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder={replyTo ? `Reply to ${replyTo}…` : 'Add a comment…'}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="sentences"
          spellCheck={false}
          data-lpignore="true"
          data-form-type="other"
          inputMode="text"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: 'var(--bone)',
            fontFamily: 'inherit',
            fontSize: 14,
            fontWeight: 500,
            padding: '8px 0',
            outline: 'none',
            minWidth: 0,
          }}
        />

        <button
          type="button"
          onClick={send}
          aria-label="Send"
          disabled={!text.trim()}
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'var(--crimson)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF',
            cursor: text.trim() ? 'pointer' : 'not-allowed',
            opacity: text.trim() ? 1 : 0.5,
            flexShrink: 0,
            padding: 0,
            transition:
              'transform .15s var(--spring), opacity .2s var(--ease)',
          }}
        >
          <Icon name="share" size={16} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}