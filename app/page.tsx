'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useProducts } from '@/lib/hooks/useProducts';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HomePage() {
  // Fetch featured products
  const { products: featuredProducts, loading: featuredLoading } = useProducts({ limitCount: 8 });
  
  // Ref for about section parallax
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.8]);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Store Interior Background */}
      <section className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image - Store Interior */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80&auto=format&fit=crop)',
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          </div>
        </motion.div>
        
        {/* Hero Content */}
        <div className="relative z-10 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 tracking-tight text-white uppercase leading-tight">
              <span className="block">DEFINE YOUR</span>
              <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl">STYLE</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: [0.4, 0, 0.2, 1] }}
            className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.22em] text-white/85 uppercase mb-3 sm:mb-4"
          >
            SMART CLOTHING FOR SMARTER PEOPLE
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 max-w-2xl leading-relaxed"
          >
            Discover premium menswear that combines comfort, style, and quality. From casual essentials to sophisticated pieces, find your perfect look.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <Link href="/shop">
              <Button 
                size="lg" 
                className="bg-[#1e40af] text-white hover:bg-[#1e3a8a] px-6 py-5 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide rounded-md w-full sm:w-auto"
              >
                SHOP THE LATEST
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section - Dark Design */}
      <section ref={aboutRef} id="about" className="relative min-h-screen bg-black overflow-hidden">
        {/* Background Design Elements */}
        <div className="absolute inset-0 z-0">
          {/* Zoom Background Image with Parallax */}
          <motion.div
            style={{ scale, opacity }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80&auto=format&fit=crop)',
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-slate-900/70 via-black/80 to-slate-900/70" />
            </div>
          </motion.div>
          
          {/* Geometric Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          {/* Animated Circles */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 right-20 w-96 h-96 bg-[#1e40af]/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -40, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 left-20 w-80 h-80 bg-[#1e40af]/5 rounded-full blur-3xl"
          />
          
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-px h-full bg-white" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-white" />
            <div className="absolute top-0 left-3/4 w-px h-full bg-white" />
            <div className="absolute top-1/4 left-0 w-full h-px bg-white" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-white" />
            <div className="absolute top-3/4 left-0 w-full h-px bg-white" />
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {/* About Us Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center uppercase tracking-tight text-white">
                ABOUT US
              </h1>

              {/* Main Paragraph */}
              <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed text-justify">
                Made in Nepal and Designed for men - Whiteline is about YOU, the person who knows that quality is always in style. We believe that fashion should make you feel good, comfortable and different. Our brand represents you and your identity with uniqueness and style. Just like every company has their own logo, we want our brand to be your LOGO – that defines individualism and only you with your own style.
              </p>

              {/* Quote */}
              <p className="text-sm sm:text-base md:text-lg italic text-white leading-relaxed text-justify">
                "Style is something each of us already has, all we need to do is find it."
              </p>

              {/* Learn More Link */}
              <div className="text-left">
                <Link 
                  href="/shop" 
                  className="text-[#1e40af] hover:text-[#1e3a8a] font-medium transition-colors inline-flex items-center gap-1"
                >
                  learn more →
                </Link>
              </div>
            </motion.div>

            {/* Separator */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
              className="border-t border-white"
            />

            {/* Footer Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              className="space-y-4 pt-8"
            >
              <p className="text-base md:text-lg text-white leading-relaxed text-justify">
                Our business concept is to design and deliver beautiful, high-quality "Made in Nepal" apparels with sustainable and ethical manufacturing practices directly to you at an affordable price point.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bestseller Section - LOGO Style */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">BESTSELLER</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Our most loved products, handpicked for you
          </p>
        </div>
        <ProductGrid products={featuredProducts} loading={featuredLoading} />
        <div className="text-center mt-12">
          <Link href="/shop">
            <Button variant="outline" size="lg" className="border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Shop Men Section - LOGO Style */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop Men</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover premium menswear that combines comfort, style, and quality. From casual essentials to sophisticated pieces.
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-[#1e40af] text-white hover:bg-[#1e3a8a] px-8">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <Link href="/shop?category=shirts" className="group">
            <div className="relative h-96 bg-muted overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-4xl font-bold text-white">SHIRTS</h3>
              </div>
            </div>
          </Link>
          <Link href="/shop?category=pants" className="group">
            <div className="relative h-96 bg-muted overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-4xl font-bold text-white">PANTS</h3>
              </div>
            </div>
          </Link>
          <Link href="/shop?category=shorts" className="group">
            <div className="relative h-96 bg-muted overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-4xl font-bold text-white">SHORTS</h3>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
