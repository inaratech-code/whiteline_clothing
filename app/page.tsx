import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { label: 'SHOP T-SHIRTS', href: '/shop?category=shirts', image: '/images/home/category-tshirts.jpg' },
  { label: 'SHOP SHIRTS', href: '/shop?category=shirts', image: '/images/home/rack-shirts.jpg' },
  { label: 'SHOP SHORTS', href: '/shop?category=shorts', image: '/images/home/category-shorts.jpg' },
  { label: 'SHOP JEANS', href: '/shop?category=pants', image: '/images/home/rack-pants.jpg' },
];

const bestsellers = [
  { name: 'STRIPED SHIRTS', price: 'Starting from 650', href: '/shop?category=shirts', image: '/images/home/campaign-stripes.jpg' },
  { name: 'CHECKED SHIRTS', price: 'Starting from 650', href: '/shop?category=shirts', image: '/images/home/campaign-checks.jpg' },
  { name: 'PLAID SHIRTS', price: 'Starting from 650', href: '/shop?category=shirts', image: '/images/home/campaign-plaid-beige.jpg' },
];

function CategoryCard({ label, href, image }: { label: string; href: string; image: string }) {
  return (
    <Link
      href={href}
      className="group relative block w-full overflow-hidden bg-[#6b6b6b] aspect-[5/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[512px]"
    >
      <Image src={image} alt={label} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 lg:bottom-[30px] lg:right-[33px]">
        <span className="figma-category-btn inline-flex h-11 sm:h-12 lg:h-[69px] min-w-[140px] sm:min-w-[200px] lg:w-[312px] px-3 sm:px-4 text-[10px] xs:text-xs sm:text-sm lg:text-2xl transition-colors group-hover:bg-[#0a205c] group-hover:text-white group-hover:border-[#0a205c]">
          {label}
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col bg-white min-w-0 w-full max-w-[100vw] overflow-x-hidden font-whiteline">
      {/* Hero — Figma Desktop 1 */}
      <section className="relative w-full min-h-[480px] h-[max(480px,calc(100svh-5.75rem))] lg:min-h-[720px] lg:h-[max(720px,calc(100svh-6.375rem))] xl:h-[1024px] overflow-hidden">
        <Image
          src="/images/home/hero.jpg"
          alt="Whiteline menswear"
          fill
          priority
          className="object-cover object-[center_30%] lg:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15 lg:from-black/15 lg:via-black/5 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/35 xl:via-black/5" />

        {/* Hero — mobile: stacked centered block · md–laptop: two columns */}
        <div className="relative z-10 flex flex-col xl:hidden h-full w-full max-w-[1440px] mx-auto max-md:items-center max-md:justify-center gap-6 px-4 py-8 sm:px-5 md:grid md:grid-cols-[minmax(0,1fr)_minmax(220px,34vw)] lg:grid-cols-[minmax(0,1fr)_minmax(280px,32vw)] md:items-center md:justify-center md:gap-x-8 md:px-8 md:py-0">
          <div className="w-full max-md:max-w-[min(100%,22rem)] text-right text-white min-w-0 md:col-start-1">
            <p className="text-xs sm:text-sm md:text-lg uppercase tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[5px] lg:tracking-[7.92px] whitespace-nowrap mb-1">
              SMART CLOTHING FOR SMART PEOPLE
            </p>
            <p className="text-[clamp(2rem,9.5vw,3.5rem)] sm:text-[clamp(2.25rem,8vw,4rem)] md:text-[clamp(2rem,5vw,4rem)] lg:text-[clamp(48px,6vw,80px)] font-bold uppercase leading-none whitespace-nowrap">
              DEFINE YOUR
            </p>
            <p className="font-bold leading-[0.92] -mt-2 sm:-mt-3 md:-mt-2 lg:-mt-3 text-[clamp(2.75rem,22vw,7.5rem)] sm:text-[clamp(3.25rem,20vw,8rem)] md:text-[clamp(3.5rem,14vw,7rem)] lg:text-[clamp(120px,14vw,180px)] whitespace-nowrap">
              ST<span className="font-script-y font-normal text-[clamp(3.25rem,26vw,9rem)] sm:text-[clamp(3.75rem,24vw,10rem)] md:text-[clamp(4.5rem,18vw,10rem)] lg:text-[clamp(155px,18vw,240px)]">y</span>Le
            </p>
          </div>
          <div className="w-full max-md:max-w-[min(100%,22rem)] text-left text-sm sm:text-base md:text-base lg:text-lg text-white min-w-0 md:col-start-2">
            <p className="leading-relaxed md:leading-normal mb-0">Discover premium menswear that combines comfort, style, and quality.</p>
            <p className="leading-relaxed md:leading-normal mb-5 md:mb-8">From casual essentials to sophisticated pieces, find your perfect look.</p>
            <Link href="/shop">
              <span className="figma-btn inline-flex w-full max-w-[312px] h-12 sm:h-14 md:h-12 lg:h-14 text-sm md:text-sm lg:text-lg">SHOP THE LATEST</span>
            </Link>
          </div>
        </div>

        {/* Desktop — Figma two-column grid */}
        <div className="relative z-10 hidden xl:grid h-full w-full max-w-[1440px] mx-auto grid-cols-[minmax(0,1fr)_387px] items-center gap-x-12 px-10 2xl:px-12">
          <div className="text-right text-white min-w-0">
            <p className="text-2xl uppercase tracking-[7.92px] whitespace-nowrap mb-1">
              SMART CLOTHING FOR SMART PEOPLE
            </p>
            <p className="text-[96px] font-bold uppercase leading-none whitespace-nowrap">
              DEFINE YOUR
            </p>
            <p className="font-bold leading-[0.92] -mt-3 text-[220px] whitespace-nowrap">
              ST<span className="font-script-y font-normal text-[294px]">y</span>Le
            </p>
          </div>
          <div className="text-2xl text-white">
            <p className="leading-normal mb-0">Discover premium menswear that combines comfort, style, and quality.</p>
            <p className="leading-normal mb-10">From casual essentials to sophisticated pieces, find your perfect look.</p>
            <Link href="/shop">
              <span className="figma-btn inline-flex w-[312px] h-[69px] text-2xl">SHOP THE LATEST</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story — Figma Wireframe 1 */}
      <section id="about" className="bg-white section-y section-x text-center scroll-mt-[102px]">
        <div className="max-w-[522px] mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
          <h2 className="text-xl sm:text-2xl lg:text-[40px] font-bold uppercase text-black tracking-[0.22em] lg:tracking-[15.2px]">
            OUR STORY
          </h2>
          <p className="font-quote text-base sm:text-lg lg:text-2xl text-black leading-snug px-1">
            &ldquo;style is something each one of us already has, all we need to do is find it.&rdquo;
          </p>
          <p className="text-sm sm:text-base lg:text-2xl text-[#6b6b6b] leading-relaxed text-left sm:text-center">
            Made in Nepal and Designed for men -{' '}
            <span className="font-bold text-black">Whiteline</span> is about YOU, the person who
            knows that quality is always in style. We believe that fashion should make you feel
            good, comfortable and different. Our brand represents you and your identity with
            uniqueness and style. Just like every company has their own logo, we want our brand to
            be your LOGO that defines individualism and only you with your own style.
          </p>
        </div>
      </section>

      {/* Marketing promo — compact campaign clip */}
      <section className="bg-white section-x pb-8 sm:pb-10 lg:pb-12">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 py-4 sm:py-6 px-4 sm:px-6 bg-[#0a205c]">
          <div className="relative w-[120px] sm:w-[140px] lg:w-[160px] aspect-[478/850] shrink-0 overflow-hidden">
            <video
              src="/videos/campaign-shirts.mp4"
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="White Line shirts campaign video"
            />
          </div>
          <div className="text-center sm:text-left text-white space-y-2 sm:space-y-3 max-w-sm">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/80">
              Smart clothing for smarter people
            </p>
            <p className="text-base sm:text-lg lg:text-xl font-bold uppercase tracking-[0.12em]">
              New shirts in store
            </p>
            <Link href="/shop?category=shirts">
              <span className="figma-btn inline-flex h-9 sm:h-10 px-4 text-[10px] sm:text-xs mt-1">
                SHOP NOW
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories — Figma Wireframe 2 */}
      <section className="bg-white section-x pb-8 sm:pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,690fr)_minmax(0,720fr)] gap-2.5 max-w-[1440px] mx-auto w-full">
          {categories.map((cat) => (
            <CategoryCard key={cat.label} {...cat} />
          ))}
        </div>
      </section>

      {/* Best Seller */}
      <section className="bg-white section-y section-x overflow-hidden">
        <h2 className="text-xl sm:text-2xl lg:text-[40px] font-bold uppercase text-black text-center tracking-[0.22em] lg:tracking-[15.2px] mb-8 sm:mb-12 lg:mb-16">
          BEST SELLER
        </h2>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:gap-[31px] max-w-[1440px] lg:mx-auto w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {bestsellers.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group shrink-0 w-[min(78vw,300px)] snap-center lg:w-auto lg:max-w-none lg:shrink text-center"
            >
              <div className="relative w-full aspect-[16/10] bg-[#0a205c] mb-3 lg:mb-4 overflow-hidden mx-auto">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 78vw, 415px"
                />
              </div>
              <h3 className="text-xs sm:text-base lg:text-2xl font-normal uppercase tracking-[0.12em] sm:tracking-[0.21em] text-black mb-1 px-1">
                {item.name}
              </h3>
              <p className="text-xs sm:text-base lg:text-2xl text-[#6b6b6b]">{item.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Store — Figma Wireframe 4 */}
      <section className="bg-white section-y section-x">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start max-w-[1440px] mx-auto w-full">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[575px] overflow-hidden">
            <Image src="/images/home/store.jpg" alt="Whiteline store" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 776px" />
          </div>
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 lg:pt-9">
            <p className="text-sm sm:text-base lg:text-2xl text-[#6b6b6b] leading-normal">
              Our store offers an experience where you can explore our collections, discover your
              style, and find pieces that truly represent who you are. From carefully crafted
              fabrics to thoughtfully designed silhouettes, every detail is made with quality and
              comfort in mind.
            </p>
            <p className="text-sm sm:text-base lg:text-2xl text-[#6b6b6b] leading-normal">
              Made in Nepal and inspired by the people who wear it, Whiteline is built for
              individuals who understand that style is not about following trends but expressing
              themselves with confidence.
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-black lowercase">whiteline</p>
          </div>
        </div>
      </section>
    </div>
  );
}
