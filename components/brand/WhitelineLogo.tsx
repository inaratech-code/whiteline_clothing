import Image from 'next/image';

/** Upright brand poster — crest, WHITE LINE®, tagline (original artwork) */
const LOCKUP_WIDTH = 1024;
const LOCKUP_HEIGHT = 712;
const LOCKUP_ASPECT = LOCKUP_HEIGHT / LOCKUP_WIDTH;

/** WL diamond crest only */
const CREST_WIDTH = 327;
const CREST_HEIGHT = 281;
const CREST_ASPECT = CREST_HEIGHT / CREST_WIDTH;

type WhitelineLogoProps = {
  className?: string;
  size?: number;
  /** Full poster lockup (default) or crest only */
  variant?: 'lockup' | 'crest';
};

export function WhitelineLogo({ className, size = 280, variant = 'lockup' }: WhitelineLogoProps) {
  if (variant === 'crest') {
    const height = Math.round(size * CREST_ASPECT);
    return (
      <Image
        src="/images/brand/wl-logo.png"
        alt="Whiteline logo"
        width={size}
        height={height}
        className={`h-auto w-auto object-contain ${className ?? ''}`}
        sizes={`${size}px`}
      />
    );
  }

  const height = Math.round(size * LOCKUP_ASPECT);
  return (
    <Image
      src="/images/brand/wl-brand-lockup.png"
      alt="White Line — Smart clothing for smarter people"
      width={size}
      height={height}
      className={`h-auto w-auto object-contain ${className ?? ''}`}
      sizes={`(max-width: 768px) 80vw, ${size}px`}
    />
  );
}
