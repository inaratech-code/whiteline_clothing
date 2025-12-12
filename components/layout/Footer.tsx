'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        {/* Newsletter Section - LOGO Style */}
        <div className="border-b pb-6 sm:pb-8 mb-6 sm:mb-8">
          <div className="max-w-md mx-auto text-center px-4">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">SIGN UP FOR UPDATES</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 mt-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-sm sm:text-base"
                required
              />
              <Button type="submit" className="bg-[#1e40af] text-white hover:bg-[#1e3a8a] text-sm sm:text-base w-full sm:w-auto">
                SUBSCRIBE
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Content - LOGO Style Multi-column */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">SHOP</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop?category=shirts" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shirts
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pants" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pants
                </Link>
              </li>
              <li>
                <Link href="/shop?category=shorts" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shorts
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">COMPANY</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4">HELP</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/size-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  Exchange Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Join Us / Contact */}
          <div>
            <h4 className="font-semibold mb-4">JOIN US</h4>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <Link href="/auth/signup" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sign Up for Updates
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Login / Register
                </Link>
              </li>
            </ul>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">+977-XXXXXXXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href="mailto:info@whiteline.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  info@whiteline.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - LOGO Style */}
        <div className="pt-8 border-t">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Copyright. All rights reserved Whiteline.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

