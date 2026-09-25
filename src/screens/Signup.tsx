import { useState } from 'react';
import { HEADINGS } from '../labels/headings';
import { BUTTONS } from '../labels/buttons';
import { MESSAGES } from '../labels/messages';
import { isValidEmail } from '../engine/validation.engine';

type SignupProps = {
  onContinue: (email: string) => Promise<void> | void;
};

export default function Signup({ onContinue }: SignupProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const valid = isValidEmail(email);

  async function handleContinue() {
    if (!valid) {
      setError(MESSAGES.INVALID_EMAIL);
      return;
    }
    setError('');
    setSending(true);
    try {
      await onContinue(email.trim().toLowerCase());
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--ink)',
        color: 'var(--bone)',
        display: 'flex',
        flexDirection: 'column',
        padding:
          'calc(var(--safe-top) + 60px) 28px calc(var(--safe-bottom) + 28px)',
        gap: 24,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.8px' }}>
          {HEADINGS.SIGNUP}
        </h1>
        <p
          style={{
            fontSize: 14.5,
            color: 'var(--bone-dim)',
            lineHeight: 1.6,
            letterSpacing: '-0.15px',
          }}
        >
          {HEADINGS.SIGNUP_LEDE}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 16px',
          background: 'var(--surface, #17151C)',
          border: '1px solid var(--line-2, rgba(245,240,230,0.16))',
          borderRadius: 14,
          color: 'var(--bone)',
        }}
      >
        <span style={{ fontSize: 20, lineHeight: 1 }}>🇳🇬</span>
        <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px' }}>
          Nigeria
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--bone-faint)',
          }}
        >
          +234
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            color: 'var(--bone-faint)',
          }}
        >
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          placeholder="you@example.com"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          name="email"
          data-lpignore="true"
          data-form-type="other"
          style={{
            width: '100%',
            padding: '18px 20px',
            fontSize: 16,
            background: 'var(--surface, #17151C)',
            border: '1px solid var(--line-2, rgba(245,240,230,0.16))',
            borderRadius: 14,
            color: 'var(--bone)',
            fontFamily: 'inherit',
            outline: 'none',
          }}
        />
        {error && (
          <div
            style={{
              fontSize: 12.5,
              color: 'var(--danger)',
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <p
          style={{
            fontSize: 12.5,
            color: 'var(--bone-faint)',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          By continuing, you agree to our Terms and Privacy Policy.
        </p>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!valid || sending}
          style={{
            width: '100%',
            padding: 18,
            borderRadius: 16,
            background: 'var(--crimson)',
            color: '#FFF',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: '-0.2px',
            cursor: valid && !sending ? 'pointer' : 'not-allowed',
            opacity: valid && !sending ? 1 : 0.5,
            boxShadow: '0 12px 32px rgba(196, 30, 58, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {sending ? MESSAGES.SENDING : BUTTONS.CONTINUE}
        </button>
      </div>
    </div>
  );
}