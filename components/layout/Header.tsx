'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCartContext } from '@/contexts/CartContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCartContext();
  const { user, userData, signOut, isAdmin } = useAuthContext();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-0 z-50 w-full bg-slate-900 border-b-2 border-slate-700 shadow-sm"
    >
      {/* Pre-header Banner */}
      <div className="bg-[#1e40af] text-white py-2 text-center border-b-2 border-slate-700">
        <p className="text-xs md:text-sm font-medium">
          🚚 Free delivery over NPR 1500
        </p>
      </div>

      {/* Main header - Dark Design */}
      <div className="bg-slate-900 border-b-2 border-slate-700">
        <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-3 sm:px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-white group-hover:text-[#1e40af] transition-colors duration-200">
              WHITELINE
            </span>
          </Link>

        {/* Desktop Navigation - Dark Style */}
        <nav className="hidden md:flex items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-base font-medium text-white hover:text-[#1e40af] transition-colors duration-200 uppercase tracking-wide">
                MEN
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[180px]">
              <DropdownMenuItem asChild>
                <Link href="/shop?category=shirts" className="w-full">
                  Shirts
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/shop?category=pants" className="w-full">
                  Trousers
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/shop?category=shorts" className="w-full">
                  Shorts
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/shop" className="text-base font-medium text-white hover:text-[#1e40af] transition-colors uppercase tracking-wide">
            NEW ARRIVALS
          </Link>
          <a href="#about" className="text-base font-medium text-white hover:text-[#1e40af] transition-colors uppercase tracking-wide">
            ABOUT
          </a>
          <Link href="/contact" className="text-base font-medium text-white hover:text-[#1e40af] transition-colors uppercase tracking-wide">
            CONTACT
          </Link>
        </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white hover:bg-slate-800 hover:text-[#1e40af] h-9 w-9 sm:h-10 sm:w-10"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* User menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800 hover:text-[#1e40af] h-9 w-9 sm:h-10 sm:w-10">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href="/account">
                    <DropdownMenuItem className="cursor-pointer">My Account</DropdownMenuItem>
                  </Link>
                  <Link href="/account/orders">
                    <DropdownMenuItem className="cursor-pointer">Orders</DropdownMenuItem>
                  </Link>
                  {isAdmin && (
                    <Link href="/admin">
                      <DropdownMenuItem className="cursor-pointer">Admin Dashboard</DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-white hover:bg-slate-800 hover:text-[#1e40af] text-xs sm:text-sm px-2 sm:px-3">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Cart Drawer */}
            <CartDrawer />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-slate-800 h-9 w-9 sm:h-10 sm:w-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900 border-t border-slate-700 overflow-hidden"
          >
            <div className="p-4">
              <form action="/search" method="get" className="flex gap-2 max-w-2xl mx-auto">
                <Input
                  name="q"
                  placeholder="Search products..."
                  className="flex-1 bg-slate-800 text-white border-slate-700 placeholder:text-slate-400"
                  autoFocus
                />
                <Button type="submit" className="bg-[#1e40af] text-white hover:bg-[#1e3a8a]">
                  Search
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="bg-slate-900 border-t border-slate-700 md:hidden overflow-hidden shadow-lg"
          >
            <nav className="flex flex-col space-y-0 p-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="py-3 px-4 text-sm font-semibold uppercase text-white border-b border-slate-700">Men</div>
                <div className="pl-4 space-y-0">
                  <Link
                    href="/shop?category=shirts"
                    className="py-4 px-4 text-base block text-slate-300 hover:text-[#1e40af] hover:bg-slate-800 active:bg-slate-700 transition-colors duration-150 border-b border-slate-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Shirts
                  </Link>
                  <Link
                    href="/shop?category=pants"
                    className="py-4 px-4 text-base block text-slate-300 hover:text-[#1e40af] hover:bg-slate-800 active:bg-slate-700 transition-colors duration-150 border-b border-slate-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Trousers
                  </Link>
                  <Link
                    href="/shop?category=shorts"
                    className="py-4 px-4 text-base block text-slate-300 hover:text-[#1e40af] hover:bg-slate-800 active:bg-slate-700 transition-colors duration-150 border-b border-slate-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Shorts
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/shop"
                  className="py-4 px-4 text-base font-semibold uppercase text-white hover:text-[#1e40af] hover:bg-slate-800 active:bg-slate-700 block border-t border-slate-700 transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  New Arrivals
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <a
                  href="#about"
                  className="py-4 px-4 text-base font-semibold uppercase text-white hover:text-[#1e40af] hover:bg-slate-800 active:bg-slate-700 block border-t border-slate-700 transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="py-4 px-4 text-base font-semibold uppercase text-white hover:text-[#1e40af] hover:bg-slate-800 active:bg-slate-700 block border-t border-slate-700 transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </motion.div>
              
              {/* User Account Links in Mobile Menu */}
              {user && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="border-t border-slate-700 mt-2 pt-2"
                >
                  <div className="py-3 px-4 text-sm font-semibold uppercase text-white border-b border-slate-700">Account</div>
                  <Link
                    href="/account"
                    className="py-4 px-4 text-base block text-slate-300 hover:text-[#1e40af] hover:bg-slate-800 active:bg-slate-700 transition-colors duration-150 border-b border-slate-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    href="/account/orders"
                    className="py-4 px-4 text-base block text-slate-300 hover:text-[#1e40af] hover:bg-slate-800 active:bg-slate-700 transition-colors duration-150 border-b border-slate-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="py-4 px-4 text-base block text-slate-300 hover:text-[#1e40af] hover:bg-slate-800 active:bg-slate-700 transition-colors duration-150 border-b border-slate-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="py-4 px-4 text-base block text-slate-300 hover:text-red-400 hover:bg-slate-800 active:bg-slate-700 transition-colors w-full text-left border-b border-slate-800"
                  >
                    Sign Out
                  </button>
                </motion.div>
              )}
              
              {!user && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="border-t border-slate-700 mt-2 pt-2"
                >
                  <Link
                    href="/auth/login"
                    className="py-4 px-4 text-base font-semibold uppercase text-white hover:text-[#1e40af] hover:bg-slate-800 active:bg-slate-700 block transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="py-4 px-4 text-base block text-slate-300 hover:text-[#1e40af] hover:bg-slate-800 active:bg-slate-700 transition-colors border-t border-slate-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                </motion.div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

