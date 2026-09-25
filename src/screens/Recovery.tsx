import { useState } from 'react';
import { HEADINGS } from '../labels/headings';
import { BUTTONS } from '../labels/buttons';
import { MESSAGES } from '../labels/messages';

type RecoveryProps = {
  code: string;
  onDone: () => void;
};

export default function Recovery({ code, onDone }: RecoveryProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be blocked on some browsers — fall back silently.
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
        padding: 'calc(var(--safe-top) + 60px) 28px calc(var(--safe-bottom) + 28px)',
        gap: 24,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.8px' }}>
          {HEADINGS.RECOVERY}
        </h1>
        <p
          style={{
            fontSize: 14.5,
            color: 'var(--bone-dim)',
            lineHeight: 1.6,
            letterSpacing: '-0.15px',
          }}
        >
          {HEADINGS.RECOVERY_HINT}
        </p>
      </div>

      <div
        style={{
          background: 'var(--surface, #17151C)',
          border: '1px solid var(--line-2, rgba(245,240,230,0.16))',
          borderRadius: 16,
          padding: 22,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: 'var(--gold)',
            letterSpacing: 6,
            fontVariantNumeric: 'tabular-nums',
            textAlign: 'center',
          }}
        >
          {code}
        </div>
        <button
          type="button"
          onClick={copyCode}
          style={{
            padding: '10px 20px',
            borderRadius: 40,
            background: 'rgba(245, 240, 230, 0.06)',
            border: '1px solid var(--line-2, rgba(245,240,230,0.16))',
            color: 'var(--bone)',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {copied ? 'Copied' : BUTTONS.COPY}
        </button>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          type="button"
          onClick={onDone}
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
            cursor: 'pointer',
            boxShadow: '0 12px 32px rgba(196, 30, 58, 0.35)',
          }}
        >
          {BUTTONS.I_WROTE_IT_DOWN}
        </button>
      </div>

      <p
        style={{
          fontSize: 12,
          color: 'var(--bone-faint)',
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        {MESSAGES.SOMETHING_WENT_WRONG === '' ? '' : ''}
      </p>
    </div>
  );
}