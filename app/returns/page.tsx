'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function ReturnsPage() {
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
              EXCHANGE POLICY
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              We want you to be completely satisfied with your purchase
            </p>
          </div>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-6 w-6 text-[#1e40af]" />
                <CardTitle className="text-gray-900">Returns & Exchanges</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Return Policy</h3>
                <p className="text-sm mb-4">
                  We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in original packaging with all tags attached.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Items must be in original condition</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Original tags must be attached</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Original packaging preferred</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Exchange Policy</h3>
                <p className="text-sm mb-4">
                  Exchanges are available for different sizes of the same item. Exchanges must be requested within 30 days of purchase.
                </p>
                <p className="text-sm text-gray-500">
                  If the item you want to exchange is out of stock, we will process a refund instead.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Refund Process</h3>
                <p className="text-sm mb-4">
                  Refunds will be processed within 5-7 business days after we receive and inspect the returned item.
                </p>
                <p className="text-sm text-gray-500">
                  Refunds will be issued to the original payment method used for the purchase.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Non-Returnable Items</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Items that have been worn or washed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Items without original tags</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Made-to-order items (unless defective)</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How to Return</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Contact us at info@whiteline.com with your order number</li>
                  <li>We'll provide you with return instructions and a return authorization</li>
                  <li>Package the item securely with all original tags and packaging</li>
                  <li>Ship the item back to us using a trackable shipping method</li>
                  <li>Once received, we'll process your refund or exchange</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}

