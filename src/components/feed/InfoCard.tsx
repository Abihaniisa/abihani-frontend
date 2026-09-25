import { useState } from 'react';
import type { Post } from '../../types/post.types';

type InfoCardProps = {
  post: Post;
  onSellerTap: () => void;
  onBuy: () => void;
  onOpenChange?: (open: boolean) => void;
};

export default function InfoCard({
  post,
  onSellerTap,
  onBuy,
  onOpenChange,
}: InfoCardProps) {
  const [open, setOpenState] = useState(false);

  function setOpen(next: boolean) {
    setOpenState(next);
    onOpenChange?.(next);
  }

  const outOfStock = post.stock !== undefined && post.stock <= 0;
  const canBuy = post.price > 0 && !outOfStock;

  return (
    <div
      style={{
        position: 'absolute',
        left: 12,
        right: 12,
        bottom: 'calc(var(--safe-bottom) + 100px)',
        zIndex: 24,
        background: 'rgba(18, 16, 20, 0.82)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: '1px solid rgba(245, 240, 230, 0.10)',
        borderRadius: 20,
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.55)',
        overflow: 'hidden',
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '9px 12px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span
          onClick={(e) => {
            e.stopPropagation();
            onSellerTap();
          }}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundImage: `url('${post.seller.avatarUrl ?? ''}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexShrink: 0,
            border: '1.5px solid rgba(245, 240, 230, 0.16)',
            cursor: 'pointer',
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSellerTap();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              marginBottom: 2,
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                fontSize: 15.5,
                fontWeight: 700,
                color: 'var(--bone)',
                letterSpacing: '-0.3px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {post.seller.name}
            </span>
            {post.seller.verified && (
              <span
                aria-hidden="true"
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  background: 'var(--crimson)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: '#FFF',
                  fontSize: 9,
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                ✓
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: 12.5,
              fontWeight: 500,
              color: 'var(--bone-dim)',
              letterSpacing: '-0.1px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {post.title}
          </div>
        </div>
        <span
          aria-hidden="true"
          style={{
            color: 'var(--bone-dim)',
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform .3s var(--ease)',
            display: 'flex',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width={16}
            height={16}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      <div
        style={{
          maxHeight: open ? 320 : 0,
          overflow: 'hidden',
          transition: 'max-height .4s var(--ease)',
        }}
      >
        <div
          style={{
            padding: '12px 12px 13px',
            borderTop: '1px solid rgba(245, 240, 230, 0.10)',
          }}
        >
          <p
            style={{
              fontSize: 12.5,
              color: 'var(--bone-dim)',
              lineHeight: 1.5,
              marginBottom: 12,
            }}
          >
            {post.description}
          </p>

          {post.stock !== undefined && post.stock > 0 && post.stock <= 5 && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 9px',
                borderRadius: 40,
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--gold)',
                background: 'rgba(231, 194, 122, 0.16)',
                border: '1px solid rgba(231, 194, 122, 0.4)',
                marginBottom: 12,
              }}
            >
              Only {post.stock} left
            </div>
          )}

          {outOfStock && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 9px',
                borderRadius: 40,
                fontSize: 11,
                fontWeight: 700,
                color: '#FF5C78',
                background: 'rgba(196, 30, 58, 0.14)',
                border: '1px solid rgba(196, 30, 58, 0.45)',
                marginBottom: 12,
              }}
            >
              Sold out
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 19,
                fontWeight: 800,
                color: 'var(--gold)',
                letterSpacing: '-0.5px',
              }}
            >
              ₦{post.price.toLocaleString('en-NG')}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (canBuy) onBuy();
              }}
              disabled={!canBuy}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '10px 18px',
                background: canBuy
                  ? 'var(--crimson)'
                  : 'rgba(245, 240, 230, 0.12)',
                color: canBuy ? '#FFF' : 'var(--bone-faint)',
                border: 'none',
                borderRadius: 40,
                fontSize: 13.5,
                fontWeight: 700,
                fontFamily: 'inherit',
                letterSpacing: '-0.2px',
                cursor: canBuy ? 'pointer' : 'not-allowed',
                boxShadow: canBuy
                  ? '0 8px 22px rgba(196, 30, 58, 0.42)'
                  : 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'transform .15s var(--spring), filter .15s var(--ease)',
              }}
            >
              {outOfStock ? 'Sold out' : 'Buy now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}