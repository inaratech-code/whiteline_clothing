import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FooterBrandBackdrop } from '@/components/brand/FooterBrandBackdrop';
import { FooterNewsletter } from '@/components/layout/FooterNewsletter';

const linkClass =
  'text-white/90 hover:text-[#e88011] transition-colors duration-200 break-words [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]';

const headingClass =
  'text-[11px] sm:text-sm font-bold mb-2 sm:mb-4 text-white uppercase tracking-[0.12em] sm:tracking-[0.2em] [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]';

export function Footer() {
  return (
    <footer className="min-w-0 w-full max-w-[100vw] overflow-x-hidden font-whiteline text-white">
      <FooterBrandBackdrop>
        <div className="w-full max-w-[1440px] mx-auto section-x py-8 sm:py-10 md:py-14">
          <div className="border-b border-white/15 pb-6 sm:pb-8 md:pb-10 mb-6 sm:mb-8 md:mb-10">
            <div className="max-w-xl mx-auto text-center">
              <Link href="/" className="inline-block group mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[#e88011] transition-colors drop-shadow-md">
                  WHITE LINE
                </span>
              </Link>
              <p className="text-xs sm:text-sm font-normal tracking-[0.18em] sm:tracking-[0.22em] text-white/90 uppercase mb-1 drop-shadow-md">
                SMART CLOTHING FOR
              </p>
              <p className="text-xs sm:text-sm font-normal tracking-[0.18em] sm:tracking-[0.22em] text-white/90 uppercase mb-4 sm:mb-6 px-2 drop-shadow-md">
                SMARTER PEOPLE
              </p>
              <FooterNewsletter />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-8 md:gap-10 mb-6 sm:mb-8 md:mb-10">
            <div className="min-w-0">
              <h4 className={headingClass}>Shop</h4>
              <ul className="space-y-1.5 sm:space-y-2.5 text-[11px] sm:text-sm">
                <li><Link href="/shop?category=shirts" className={linkClass}>Shirts</Link></li>
                <li><Link href="/shop?category=pants" className={linkClass}>Trousers</Link></li>
                <li><Link href="/shop?category=shorts" className={linkClass}>Shorts</Link></li>
                <li><Link href="/shop" className={linkClass}>New Arrivals</Link></li>
              </ul>
            </div>

            <div className="min-w-0">
              <h4 className={headingClass}>Company</h4>
              <ul className="space-y-1.5 sm:space-y-2.5 text-[11px] sm:text-sm">
                <li><a href="/#about" className={linkClass}>About Us</a></li>
                <li><Link href="/contact" className={linkClass}>Contact</Link></li>
              </ul>
            </div>

            <div className="min-w-0">
              <h4 className={headingClass}>Help</h4>
              <ul className="space-y-1.5 sm:space-y-2.5 text-[11px] sm:text-sm">
                <li><Link href="/size-guide" className={linkClass}>Size Guide</Link></li>
                <li><Link href="/shipping" className={linkClass}>Delivery Information</Link></li>
                <li><Link href="/returns" className={linkClass}>Exchange Policy</Link></li>
                <li><Link href="/privacy" className={linkClass}>Privacy Policy</Link></li>
                <li><Link href="/terms" className={linkClass}>Terms of Use</Link></li>
              </ul>
            </div>

            <div className="min-w-0">
              <h4 className={headingClass}>Join Us</h4>
              <ul className="space-y-1.5 sm:space-y-2.5 text-[11px] sm:text-sm mb-3 sm:mb-5">
                <li><Link href="/auth/signup" className={linkClass}>Create Account</Link></li>
                <li><Link href="/auth/login" className={linkClass}>Login / Register</Link></li>
              </ul>
              <div className="space-y-1.5 sm:space-y-2.5 text-[11px] sm:text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <Phone className="h-4 w-4 text-[#e88011] shrink-0" />
                  <span className="text-white/75 truncate">+977-XXXXXXXXXX</span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <Mail className="h-4 w-4 text-[#e88011] shrink-0" />
                  <a href="mailto:info@whiteline.com" className={`${linkClass} truncate`}>info@whiteline.com</a>
                </div>
                <div className="flex items-start gap-2 min-w-0">
                  <MapPin className="h-4 w-4 text-[#e88011] shrink-0 mt-0.5" />
                  <span className="text-white/75">Kathmandu, Nepal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-white/15">
            <p className="text-center text-[11px] xs:text-xs sm:text-sm text-white/55 px-2">
              &copy; 2026 Whiteline &amp;{' '}
              <a
                href="https://www.inaratech.com.np"
                target="_blank"
                rel="noopener noreferrer"
                className="text-inherit no-underline hover:text-[#e88011] transition-colors"
              >
                Inara Tech
              </a>
              . All rights reserved.
            </p>
          </div>
        </div>
      </FooterBrandBackdrop>
    </footer>
  );
}
