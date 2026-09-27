import Image from 'next/image';

/** Upright brand poster — full artwork, edge-to-edge width */
const LOCKUP_SRC = '/images/brand/wl-brand-lockup.png';
const LOCKUP_WIDTH = 1024;
const LOCKUP_HEIGHT = 712;

type FooterBrandBackdropProps = {
  className?: string;
  children: React.ReactNode;
};

/** Footer: brand poster edge-to-edge; left orange frame hidden via gradient overlay */
export function FooterBrandBackdrop({ className, children }: FooterBrandBackdropProps) {
  return (
    <div className={`relative overflow-hidden bg-[#0a205c] ${className ?? ''}`}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 overflow-hidden">
          {/* Nudge right + slight scale to clip the left orange frame line */}
          <Image
            src={LOCKUP_SRC}
            alt=""
            width={LOCKUP_WIDTH}
            height={LOCKUP_HEIGHT}
            className="absolute top-1/2 left-[1.5%] w-[103%] max-w-none h-auto -translate-y-1/2"
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* Hide left orange border; keep poster visible in the center */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a205c] from-0% via-[#0a205c]/72 via-[18%] to-[#0a205c]/48 to-100%" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0a205c]/25 via-50% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a205c]/88 via-[#0a205c]/35 via-45% to-[#0a205c]/88" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
