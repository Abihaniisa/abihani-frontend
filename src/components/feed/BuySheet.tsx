/* ABIHANI — Buy Sheet
 * Fixing: BUG-13 (two doors: Pay now and Ask about this first),
 *         BUG-14 (optional note, 200 chars, immutable after payment),
 *         BUG-15 (seller can refuse cleanly — button lives in the
 *         order thread, not here. This sheet only creates the order.)
 * Wirings:
 *   - Pay now → onPay(note) → parent creates the order with the
 *     note. Order appears in Orders tab for both. Seller receives
 *     push with product, price, note. Thread opens. Stock
 *     decremented. Journal entry written. Admin metrics incremented.
 *   - Ask about this first → onAsk() → parent opens private
 *     conversation thread (Stage 8). No order is created. No
 *     money moves. Nothing counted. The conversation is stored
 *     separately from orders.
 *   - Cancel → onClose() → nothing happens.
 *   - Note is captured at the moment of Pay now. Never before.
 *     Never after. Immutable once paid. */

import { useState } from 'react';
import Sheet from '../common/Sheet';
import type { Post } from '../../types/post.types';

type BuySheetProps = {
  post: Post;
  onClose: () => void;
  onPay: (note: string) => void;
  onAsk: () => void;
};

const NOTE_MAX = 200;

export default function BuySheet({
  post,
  onClose,
  onPay,
  onAsk,
}: BuySheetProps) {
  const [note, setNote] = useState('');

  const outOfStock = post.stock !== undefined && post.stock <= 0;
  const price = post.price;
  const deliveryFee = 0;
  const fee = Math.round(price * 0.01);
  const total = price + deliveryFee + fee;

  return (
    <Sheet
      title="Buy now"
      subtitle="Your money holds safely until you confirm receipt."
      onClose={onClose}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          marginBottom: 18,
        }}
      >
        <Row label="Item" value={`₦${price.toLocaleString('en-NG')}`} />
        <Row
          label="Delivery"
          value={deliveryFee === 0 ? 'Free' : `₦${deliveryFee.toLocaleString('en-NG')}`}
        />
        <Row
          label="Held in escrow"
          value={`₦${fee.toLocaleString('en-NG')}`}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 14,
            marginTop: 4,
            borderTop: '1px solid rgba(245, 240, 230, 0.16)',
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--bone)',
            }}
          >
            Total
          </span>
          <span
            style={{
              fontSize: 23,
              fontWeight: 800,
              color: 'var(--crimson)',
              letterSpacing: '-0.6px',
            }}
          >
            ₦{total.toLocaleString('en-NG')}
          </span>
        </div>
      </div>

      <div style={{ marginBottom: 6 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            color: 'var(--bone-faint)',
            marginBottom: 8,
          }}
        >
          Add a note — optional
        </div>
        <textarea
          value={note}
          onChange={(e) => {
            const v = e.target.value;
            if (v.length <= NOTE_MAX) setNote(v);
          }}
          placeholder="Size, colour, any specifics."
          rows={3}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="sentences"
          spellCheck={false}
          data-lpignore="true"
          data-form-type="other"
          style={{
            width: '100%',
            padding: '14px 16px',
            background: 'var(--surface-2, #221F2A)',
            border: '1px solid rgba(245, 240, 230, 0.10)',
            borderRadius: 14,
            color: 'var(--bone)',
            fontFamily: 'inherit',
            fontSize: 14.5,
            fontWeight: 500,
            letterSpacing: '-0.1px',
            resize: 'none',
            outline: 'none',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: 11,
            color:
              note.length >= NOTE_MAX
                ? 'var(--crimson)'
                : 'var(--bone-faint)',
            fontWeight: 600,
            marginTop: 6,
          }}
        >
          {note.length}/{NOTE_MAX}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 10,
          marginTop: 12,
        }}
      >
        <button
          type="button"
          onClick={onAsk}
          style={{
            flex: 1,
            padding: 16,
            borderRadius: 40,
            background: 'rgba(245, 240, 230, 0.08)',
            color: 'var(--bone)',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: 14.5,
            fontWeight: 600,
            letterSpacing: '-0.15px',
            cursor: 'pointer',
          }}
        >
          Ask about this first
        </button>

        <button
          type="button"
          onClick={() => onPay(note.trim())}
          disabled={outOfStock}
          style={{
            flex: 1,
            padding: 16,
            borderRadius: 40,
            background: 'var(--crimson)',
            color: '#FFF',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: 14.5,
            fontWeight: 700,
            letterSpacing: '-0.15px',
            cursor: outOfStock ? 'not-allowed' : 'pointer',
            opacity: outOfStock ? 0.5 : 1,
            boxShadow: outOfStock
              ? 'none'
              : '0 8px 26px rgba(196, 30, 58, 0.42)',
          }}
        >
          {outOfStock ? 'Sold out' : 'Pay now'}
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          marginTop: 18,
          fontSize: 12,
          color: 'var(--bone-dim)',
          letterSpacing: '0.05px',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width={13}
          height={13}
          fill="none"
          stroke="var(--crimson)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Money held safely until you confirm
      </div>
    </Sheet>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 14.5,
      }}
    >
      <span style={{ color: 'var(--bone-dim)', fontWeight: 500 }}>
        {label}
      </span>
      <span
        style={{
          color: 'var(--bone)',
          fontWeight: 700,
          letterSpacing: '-0.1px',
        }}
      >
        {value}
      </span>
    </div>
  );
}