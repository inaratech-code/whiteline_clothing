'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Package, ShoppingCart, RefreshCw, Copyright, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Design Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
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
      </div>

      <section className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Scroll Gradient Top */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-20" />
        
        {/* Scroll Gradient Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-20" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-4xl mx-auto space-y-8 relative"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-gray-900">
              TERMS & CONDITIONS
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              By accessing and using Whiteline, you agree to be bound by these Terms and Conditions.
            </p>
          </div>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Package className="h-6 w-6 text-[#1e40af]" />
                <CardTitle className="text-gray-900">1. Products</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p className="text-sm">
                All Whiteline products are made-to-order on premium apparel. Orders are manufactured after the order deadline and shipped within 4-6 weeks.
              </p>
              <p className="text-sm text-gray-500">
                Product images are for illustrative purposes only. Actual colors may vary slightly due to screen settings.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-[#1e40af]" />
                <CardTitle className="text-gray-900">2. Orders</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p className="text-sm">
                You are responsible for all orders you place with Whiteline. Orders are only manufactured after the order deadline. All orders will be shipped 4-6 weeks after the order deadline.
              </p>
              <p className="text-sm text-gray-500">
                We reserve the right to refuse or cancel any order at our discretion. In such cases, you will receive a full refund.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-6 w-6 text-[#1e40af]" />
                <CardTitle className="text-gray-900">3. Returns & Refunds</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p className="text-sm">
                Returns are accepted within 30 days of purchase. Items must be unworn, unwashed, and in original packaging with tags attached. Refunds will be processed within 5-7 business days.
              </p>
              <p className="text-sm text-gray-500">
                Made-to-order items may only be returned if defective. Please see our Exchange Policy for more details.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Copyright className="h-6 w-6 text-[#1e40af]" />
                <CardTitle className="text-gray-900">4. Intellectual Property</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p className="text-sm">
                All designs, logos, and content on Whiteline are the property of Whiteline and are protected by copyright and trademark laws.
              </p>
              <p className="text-sm text-gray-500">
                You may not reproduce, distribute, or use any content from this website without our written permission.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-[#1e40af]" />
                <CardTitle className="text-gray-900">5. Limitation of Liability</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p className="text-sm">
                Whiteline's liability is limited to direct damages only. We are not liable for consequential or indirect loss or damage.
              </p>
              <p className="text-sm text-gray-500">
                Our total liability for any claim shall not exceed the amount you paid for the product in question.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}

