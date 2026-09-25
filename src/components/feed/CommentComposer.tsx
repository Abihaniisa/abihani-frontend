import { useState } from 'react';
import Icon from '../common/Icon';

type CommentComposerProps = {
  userAvatarUrl: string | null;
  onSubmit: (text: string) => void;
};

export default function CommentComposer({
  userAvatarUrl,
  onSubmit,
}: CommentComposerProps) {
  const [text, setText] = useState('');

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText('');
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'flex-end',
        marginTop: 8,
      }}
    >
      <span
        style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          backgroundImage: userAvatarUrl ? `url('${userAvatarUrl}')` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexShrink: 0,
          background: userAvatarUrl
            ? undefined
            : 'linear-gradient(135deg, #2B2733, #17151C)',
          border: '1px solid rgba(245, 240, 230, 0.10)',
        }}
      />

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(245, 240, 230, 0.08)',
          borderRadius: 24,
          padding: '6px 6px 6px 16px',
        }}
      >
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
          placeholder="Add a comment…"
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
            width: 36,
            height: 36,
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
            transition: 'transform .15s var(--spring), opacity .2s var(--ease)',
          }}
        >
          <Icon name="share" size={16} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}