import { useRef, useState } from 'react';

type CarouselProps = {
  images: string[];
  alt?: string;
};

export default function Carousel({ images, alt = '' }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  }

  if (images.length === 0) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #1F1C25, #0B0B0F)',
        }}
      />
    );
  }

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={alt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    );
  }

  return (
    <>
      <div
        ref={trackRef}
        onScroll={onScroll}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              flex: '0 0 100%',
              height: '100%',
              scrollSnapAlign: 'center',
            }}
          >
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 'calc(var(--safe-bottom) + 190px)',
          zIndex: 22,
          display: 'flex',
          gap: 5,
          padding: '6px 10px',
          borderRadius: 40,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {images.map((_, i) => (
          <span
            key={i}
            style={{
              width: i === index ? 16 : 5,
              height: 5,
              borderRadius: i === index ? 4 : '50%',
              background:
                i === index ? 'var(--bone)' : 'rgba(245, 240, 230, 0.4)',
              transition: 'all .3s var(--ease)',
            }}
          />
        ))}
      </div>
    </>
  );
}