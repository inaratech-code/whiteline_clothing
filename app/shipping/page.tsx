'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, MapPin, Package } from 'lucide-react';

export default function ShippingPage() {
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
              DELIVERY INFORMATION
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Fast and reliable shipping to get your premium menswear to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Truck className="h-6 w-6 text-[#1e40af]" />
                  <CardTitle className="text-gray-900">Shipping Options</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Standard Delivery</h3>
                  <p className="text-sm">Free delivery on orders over NPR 1,500</p>
                  <p className="text-sm">NPR 200 for orders under NPR 1,500</p>
                  <p className="text-sm text-gray-500 mt-1">Delivery time: 5-7 business days</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Express Delivery</h3>
                  <p className="text-sm">NPR 500</p>
                  <p className="text-sm text-gray-500 mt-1">Delivery time: 2-3 business days</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-[#1e40af]" />
                  <CardTitle className="text-gray-900">Processing Time</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p className="text-sm">
                  All orders are processed within 1-2 business days. Made-to-order items may take 4-6 weeks to manufacture before shipping.
                </p>
                <p className="text-sm text-gray-500">
                  You will receive a confirmation email once your order has been shipped with tracking information.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-[#1e40af]" />
                  <CardTitle className="text-gray-900">Delivery Areas</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p className="text-sm">
                  We currently deliver throughout Nepal. Delivery times may vary based on your location.
                </p>
                <p className="text-sm text-gray-500">
                  For remote areas, additional delivery time may be required.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Package className="h-6 w-6 text-[#1e40af]" />
                  <CardTitle className="text-gray-900">Order Tracking</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p className="text-sm">
                  Once your order ships, you'll receive a tracking number via email. You can use this to track your package in real-time.
                </p>
                <p className="text-sm text-gray-500">
                  If you have any questions about your delivery, please contact us at info@whiteline.com
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

