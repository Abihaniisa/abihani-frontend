type IconName =
  | 'house'
  | 'compass'
  | 'plus'
  | 'bookmark'
  | 'person'
  | 'search'
  | 'heart'
  | 'comment'
  | 'share'
  | 'save'
  | 'more'
  | 'check';

type IconProps = {
  name: IconName;
  size?: number;
  filled?: boolean;
  strokeWidth?: number;
};

const PATHS: Record<IconName, React.ReactNode> = {
  house: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  bookmark: (
    <>
      <path d="M5 2h14a2 2 0 0 1 2 2v18l-9-5-9 5V4a2 2 0 0 1 2-2z" />
    </>
  ),
  person: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  heart: (
    <>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </>
  ),
  comment: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </>
  ),
  share: (
    <>
      <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </>
  ),
  save: (
    <>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </>
  ),
  more: (
    <>
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="19" cy="12" r="1" fill="currentColor" />
      <circle cx="5" cy="12" r="1" fill="currentColor" />
    </>
  ),
  check: (
    <>
      <polyline points="20 6 9 17 4 12" />
    </>
  ),
};

export default function Icon({
  name,
  size = 22,
  filled = false,
  strokeWidth = 1.9,
}: IconProps) {
  const isFilled = filled && (name === 'heart' || name === 'save');

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth={isFilled ? 0 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}