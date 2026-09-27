import Image from 'next/image';

const POSTER_SRC = '/images/home/lifestyle-brand-poster-user.png';

/** Figma 10:11 + 8:2 — wall, black frame, brand poster (upright in frame) */
export function LifestyleSignageComposite({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-neutral-300 ${className ?? ''}`}>
      {/* Signage mockup — wall + frame (node 10:11) */}
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-[-66.03%] h-full w-[232.29%]">
          <Image
            src="/images/home/lifestyle-signage.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 560px"
            aria-hidden
          />
        </div>
      </div>

      {/* Brand poster in frame — Figma 8:2 inset (95px / 446×641 in 643×1121) */}
      <div className="absolute left-[14.8%] top-[19.9%] flex h-[57.2%] w-[69.4%] items-center justify-center pointer-events-none">
        <div className="relative h-full w-full overflow-hidden bg-[#0a205c] ring-1 ring-[#e88011]/80">
          <Image
            src={POSTER_SRC}
            alt="White Line — Smart clothing for smarter people"
            width={712}
            height={1024}
            className="h-full w-full object-cover object-center"
            sizes="(max-width: 768px) 70vw, 310px"
          />
        </div>
      </div>
    </div>
  );
}
