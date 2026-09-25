import { useState } from 'react';
import { HEADINGS } from '../labels/headings';
import { BUTTONS } from '../labels/buttons';
import { MESSAGES } from '../labels/messages';
import { isValidOtp } from '../engine/validation.engine';

type OtpProps = {
  email: string;
  onBack: () => void;
  onVerify: (code: string) => Promise<boolean> | boolean;
};

export default function Otp({ email, onBack, onVerify }: OtpProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);

  const valid = isValidOtp(code);

  async function handleVerify() {
    if (!valid) {
      setError(MESSAGES.INVALID_CODE);
      return;
    }
    setError('');
    setVerifying(true);
    try {
      const ok = await onVerify(code);
      if (!ok) setError(MESSAGES.INVALID_CODE);
    } finally {
      setVerifying(false);
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
          {HEADINGS.OTP}
        </h1>
        <p
          style={{
            fontSize: 14.5,
            color: 'var(--bone-dim)',
            lineHeight: 1.6,
            letterSpacing: '-0.15px',
          }}
        >
          We sent a 6-digit code to{' '}
          <strong style={{ color: 'var(--gold)' }}>{email}</strong>
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, '');
            setCode(v);
            if (error) setError('');
          }}
          placeholder="000000"
          autoComplete="one-time-code"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          name="otp"
          data-lpignore="true"
          data-form-type="other"
          style={{
            width: '100%',
            padding: '22px 20px',
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '12px',
            textAlign: 'center',
            textIndent: '12px',
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
          gap: 10,
        }}
      >
        <button
          type="button"
          onClick={handleVerify}
          disabled={!valid || verifying}
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
            cursor: valid && !verifying ? 'pointer' : 'not-allowed',
            opacity: valid && !verifying ? 1 : 0.5,
            boxShadow: '0 12px 32px rgba(196, 30, 58, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {verifying ? MESSAGES.VERIFYING : 'Verify'}
        </button>
        <button
          type="button"
          onClick={onBack}
          style={{
            width: '100%',
            padding: 14,
            background: 'transparent',
            color: 'var(--bone-dim)',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          {BUTTONS.CHANGE_NUMBER}
        </button>
      </div>
    </div>
  );
}