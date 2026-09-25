import { useState } from 'react';
import { HEADINGS } from '../labels/headings';
import { BUTTONS } from '../labels/buttons';
import { useAuth } from '../store/auth.store';

export default function Settings() {
  const user = useAuth((s) => s.user);
  const deviceAccounts = useAuth((s) => s.deviceAccounts);
  const logout = useAuth((s) => s.logout);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const accountEmail = user?.email ?? '—';

  return (
    <div
      style={{
        minHeight: '100%',
        background: 'var(--ink)',
        color: 'var(--bone)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: 'calc(var(--safe-top) + 20px) 20px 16px',
          borderBottom: '1px solid var(--line, rgba(245,240,230,0.10))',
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.6px' }}>
          {HEADINGS.SETTINGS}
        </h1>
      </div>

      <div style={{ padding: '18px 20px 40px' }}>
        <SectionLabel>Account</SectionLabel>

        <Row label="Profile" subtitle={accountEmail} />
        <Row label="Location" subtitle="Nigeria" />
        <Row label="Payout method" subtitle="Not set" />
        <Row label="Recovery code" subtitle="View or regenerate" />
        <Row label={BUTTONS.ADD_ACCOUNT} subtitle="Add another account" />

        {deviceAccounts.length > 1 && (
          <Row
            label={BUTTONS.SWITCH_ACCOUNT}
            subtitle={`${deviceAccounts.length} accounts on this device`}
          />
        )}

        <SectionLabel>Selling</SectionLabel>
        <Row label="Delivery fees" subtitle="Set what you charge per region" />

        <SectionLabel>Notifications</SectionLabel>
        <Row label="Orders" subtitle="Shipping, delivery, release" />
        <Row label="Messages" subtitle="Replies in your threads" />
        <Row label="Offers" subtitle="Private prices" />
        <Row label="Follows" subtitle="When someone follows you" />
        <Row label="Comments" subtitle="Replies to your posts" />

        <SectionLabel>Support</SectionLabel>
        <Row label="Help & Support" subtitle="FAQs and contact" />
        <Row label="Blocked accounts" subtitle="0 blocked" />

        <SectionLabel>Danger zone</SectionLabel>

        <button
          type="button"
          onClick={() => setShowLogoutConfirm(true)}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: '16px 0',
            background: 'none',
            border: 'none',
            color: 'var(--crimson)',
            fontFamily: 'inherit',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '-0.2px',
            cursor: 'pointer',
          }}
        >
          {BUTTONS.LOG_OUT}
        </button>
      </div>

      {showLogoutConfirm && (
        <Sheet onClose={() => setShowLogoutConfirm(false)}>
          <div
            style={{
              fontSize: 19,
              fontWeight: 700,
              color: 'var(--bone)',
              letterSpacing: '-0.4px',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            Log out?
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'var(--bone-dim)',
              lineHeight: 1.55,
              textAlign: 'center',
              marginBottom: 22,
            }}
          >
            This clears added accounts on this device. You will need your
            email to sign back in.
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              onClick={() => setShowLogoutConfirm(false)}
              style={secondaryBtn()}
            >
              {BUTTONS.CANCEL}
            </button>
            <button
              type="button"
              onClick={() => {
                logout();
                setShowLogoutConfirm(false);
                window.location.reload();
              }}
              style={primaryBtn()}
            >
              {BUTTONS.LOG_OUT}
            </button>
          </div>
        </Sheet>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        color: 'var(--bone-faint)',
        padding: '24px 0 8px',
      }}
    >
      {children}
    </div>
  );
}

function Row({ label, subtitle }: { label: string; subtitle?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        padding: '14px 0',
        borderBottom: '1px solid var(--line, rgba(245,240,230,0.10))',
      }}
    >
      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--bone)' }}>
        {label}
      </div>
      {subtitle && (
        <div style={{ fontSize: 12.5, color: 'var(--bone-faint)' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

function Sheet({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 90,
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--surface, #17151C)',
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          padding: '20px 20px calc(var(--safe-bottom) + 26px)',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.75)',
          borderTop: '1px solid var(--line, rgba(245,240,230,0.10))',
          zIndex: 100,
        }}
      >
        <div
          style={{
            width: 40,
            height: 4,
            borderRadius: 4,
            background: 'rgba(245,240,230,0.18)',
            margin: '0 auto 18px',
          }}
        />
        {children}
      </div>
    </>
  );
}

function primaryBtn(): React.CSSProperties {
  return {
    flex: 1,
    padding: 16,
    borderRadius: 40,
    border: 'none',
    background: 'var(--crimson)',
    color: '#FFF',
    fontFamily: 'inherit',
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: '-0.15px',
    cursor: 'pointer',
    boxShadow: '0 8px 26px rgba(196, 30, 58, 0.42)',
  };
}

function secondaryBtn(): React.CSSProperties {
  return {
    flex: 1,
    padding: 16,
    borderRadius: 40,
    border: 'none',
    background: 'rgba(245, 240, 230, 0.08)',
    color: 'var(--bone)',
    fontFamily: 'inherit',
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: '-0.15px',
    cursor: 'pointer',
  };
}