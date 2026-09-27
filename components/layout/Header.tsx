'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, User, Menu, X, Truck } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuthContext();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full min-w-0 font-whiteline">
      {/* Orange banner — Figma 36px */}
      <div className="bg-[#e88011] text-white h-9 flex items-center justify-center px-3">
        <p className="text-xs sm:text-base font-normal flex items-center gap-2">
          <Truck className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
          <span>Free Delivery over NPR 1500</span>
        </p>
      </div>

      {/* Navy nav — Figma 66px desktop */}
      <div className="bg-[#0a205c]">
        <div className="w-full max-w-[1440px] mx-auto flex h-14 lg:h-[66px] items-center justify-between gap-2 px-3 sm:px-6 lg:px-12">
          <Link href="/" className="shrink-0 min-w-0">
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">WHITELINE</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 xl:gap-14">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-2xl font-normal text-white hover:text-white/80 uppercase">MEN</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[180px]">
                <DropdownMenuItem asChild><Link href="/shop?category=shirts">Shirts</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/shop?category=pants">Trousers</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/shop" className="text-2xl font-normal text-white hover:text-white/80 uppercase">NEW ARRIVALS</Link>
            <a href="/#about" className="text-2xl font-normal text-white hover:text-white/80 uppercase">ABOUT</a>
            <Link href="/contact" className="text-2xl font-normal text-white hover:text-white/80 uppercase">CONTACT</Link>
          </nav>

          <div className="flex items-center gap-4 lg:gap-5 shrink-0">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)} className="text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10" aria-label="Search">
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 hidden sm:flex" aria-label="Account">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href="/account"><DropdownMenuItem className="cursor-pointer">My Account</DropdownMenuItem></Link>
                  <Link href="/account/orders"><DropdownMenuItem className="cursor-pointer">Orders</DropdownMenuItem></Link>
                  {isAdmin && <Link href="/admin"><DropdownMenuItem className="cursor-pointer">Admin Dashboard</DropdownMenuItem></Link>}
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login" className="hidden sm:block">
                <span className="text-2xl font-bold text-white uppercase hover:text-white/80">SIGN IN</span>
              </Link>
            )}

            <CartDrawer />

            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-[#0a205c] border-t border-white/10 overflow-hidden">
            <div className="p-4">
              <form action="/search" method="get" className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
                <Input name="q" placeholder="Search products..." className="flex-1 min-w-0 bg-white/10 text-white border-white/20 placeholder:text-white/50" autoFocus />
                <Button type="submit" className="bg-[#e88011] text-white hover:bg-[#d0700f] shrink-0">Search</Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-[#0a205c] border-t border-white/10 lg:hidden overflow-y-auto max-h-[calc(100svh-102px)]">
            <nav className="flex flex-col p-4 pb-6 text-xl">
              <div className="py-2 text-sm font-semibold uppercase text-white/70">Men</div>
              <Link href="/shop?category=shirts" className="py-3 pl-3 text-white hover:text-[#e88011]" onClick={closeMobileMenu}>Shirts</Link>
              <Link href="/shop?category=pants" className="py-3 pl-3 text-white hover:text-[#e88011]" onClick={closeMobileMenu}>Trousers</Link>
              <Link href="/shop" className="py-4 font-semibold uppercase text-white border-t border-white/10 mt-2" onClick={closeMobileMenu}>New Arrivals</Link>
              <a href="/#about" className="py-4 font-semibold uppercase text-white border-t border-white/10" onClick={closeMobileMenu}>About</a>
              <Link href="/contact" className="py-4 font-semibold uppercase text-white border-t border-white/10" onClick={closeMobileMenu}>Contact</Link>
              {!user ? (
                <Link href="/auth/login" className="py-4 font-bold uppercase text-white border-t border-white/10" onClick={closeMobileMenu}>Sign In</Link>
              ) : (
                <>
                  <Link href="/account" className="py-4 text-white border-t border-white/10" onClick={closeMobileMenu}>My Account</Link>
                  <button type="button" onClick={() => { signOut(); closeMobileMenu(); }} className="py-4 text-left text-white/80 border-t border-white/10">Sign Out</button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
