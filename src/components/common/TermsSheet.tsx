import Sheet from './Sheet';

type Kind = 'terms' | 'privacy';

type TermsSheetProps = {
  kind: Kind;
  onClose: () => void;
};

const TERMS = `Welcome to Abihani. By using the app you agree to the following.

1. What Abihani is. A social marketplace where buying happens inside a feed. Nigeria only at launch.

2. Who can use it. You must be 18 or older and have one account. Additional accounts linked to the same person are allowed.

3. What you can post. Products and social content you have the right to share. No scams, fake products, or harmful content.

4. How escrow works. When you pay, money holds in escrow. The seller ships. When you confirm delivery, money releases. If the seller does not ship within 3 days, the order auto-cancels and you are refunded.

5. How disputes work. You can open a dispute while an order is shipped. Money freezes. Abihani reviews within 3 days and decides.

6. Fees. Abihani takes a small percentage on each completed order.

7. Your rights. You can delete your account at any time. You can request an export of your data.

8. Our rights. We can suspend, ban, or refuse service with reason.

9. Limitation of liability. Abihani is not liable for damages beyond the value of the transaction in question. This document is reviewed by a Nigerian lawyer before public launch.

10. Contact. abihaniexpress@gmail.com

Last updated: at launch.`;

const PRIVACY = `Your privacy matters.

1. What we store. Your email, your display name, your handle, your avatar, your bio, your location, your posts, your comments, your orders, and your messages. Nothing else.

2. Why we store it. To run the app. To hold escrow. To let you sell and buy. To let you reach support.

3. Who sees it. You see your own data. Other users see only what you choose to make public — your posts, your name, your handle, your avatar, your bio, your city. Sellers see buyers only inside an order thread, and buyers see sellers the same way.

4. What we never do. We never sell your data. We never give it to advertisers. We never share your email, phone, or address with any other user.

5. Your rights. You can delete your account and all your data at any time. You can request a copy of your data.

6. Contact. abihaniexpress@gmail.com

Last updated: at launch.`;

export default function TermsSheet({ kind, onClose }: TermsSheetProps) {
  const title = kind === 'terms' ? 'Terms' : 'Privacy Policy';
  const body = kind === 'terms' ? TERMS : PRIVACY;

  return (
    <Sheet title={title} onClose={onClose}>
      <div
        style={{
          fontSize: 13.5,
          color: 'var(--bone-dim)',
          lineHeight: 1.65,
          letterSpacing: '-0.05px',
          whiteSpace: 'pre-line',
          paddingBottom: 20,
        }}
      >
        {body}
      </div>

      <button
        type="button"
        onClick={onClose}
        style={{
          width: '100%',
          padding: 16,
          borderRadius: 40,
          background: 'var(--crimson)',
          color: '#FFF',
          border: 'none',
          fontFamily: 'inherit',
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: '-0.15px',
          cursor: 'pointer',
          boxShadow: '0 8px 26px rgba(196, 30, 58, 0.42)',
          marginTop: 8,
        }}
      >
        Close
      </button>
    </Sheet>
  );
}