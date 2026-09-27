import Image from 'next/image';

const POSTER_SRC = '/images/home/lifestyle-brand-poster-user.png';

type BrandPosterProps = {
  className?: string;
  variant?: 'upright' | 'cover';
  priority?: boolean;
};

/** Portrait poster — WHITE LINE reads normally top-to-bottom */
export function BrandPosterImage({ className, variant = 'upright', priority }: BrandPosterProps) {
  return (
    <Image
      src={POSTER_SRC}
      alt="White Line — Smart clothing for smarter people"
      width={712}
      height={1024}
      priority={priority}
      className={
        variant === 'cover'
          ? `h-full w-full object-cover object-center ${className ?? ''}`
          : `h-full w-full object-contain object-center ${className ?? ''}`
      }
      sizes="(max-width: 768px) 80vw, 400px"
    />
  );
}

/**
 * Portrait poster for wall / footer — no rotation.
 * Layout: WHITE LINE → SMART CLOTHING FOR → SMARTER PEOPLE
 */
export function BrandPosterPortrait({ className }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[446/641] overflow-hidden bg-[#0a205c] border-2 border-[#e88011] ${className ?? ''}`}
    >
      <BrandPosterImage variant="cover" />
    </div>
  );
}

/** @deprecated Use BrandPosterPortrait */
export function BrandPosterHorizontal({ className }: { className?: string }) {
  return <BrandPosterPortrait className={className} />;
}

export { FooterBrandBackdrop } from '@/components/brand/FooterBrandBackdrop';
