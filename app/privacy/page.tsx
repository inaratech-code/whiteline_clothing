'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, Mail, Cookie } from 'lucide-react';

export default function PrivacyPage() {
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
              PRIVACY POLICY
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we protect your personal information.
            </p>
          </div>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-[#1e40af]" />
                <CardTitle className="text-gray-900">Our Commitment</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                At Whiteline, we are committed to protecting your privacy and personal information. This policy explains how we collect, use, and safeguard your data.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-[#1e40af]" />
                <CardTitle className="text-gray-900">1. Information We Collect</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p className="text-sm">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Name, email address, and phone number</li>
                <li>Shipping and billing addresses</li>
                <li>Payment information (processed securely through our payment providers)</li>
                <li>Order history and preferences</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-[#1e40af]" />
                <CardTitle className="text-gray-900">2. How We Use Your Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p className="text-sm">
                We use your information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our services and website experience</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-[#1e40af]" />
                <CardTitle className="text-gray-900">3. Information Sharing</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p className="text-sm">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Service providers who assist us in operating our website and conducting our business</li>
                <li>Payment processors to handle transactions</li>
                <li>Shipping companies to deliver your orders</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-[#1e40af]" />
                <CardTitle className="text-gray-900">4. Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p className="text-sm">
                We implement appropriate security measures to protect your personal information, including encryption and secure servers. However, no method of transmission over the internet is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-[#1e40af]" />
                <CardTitle className="text-gray-900">5. Your Rights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p className="text-sm">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Access your personal information</li>
                <li>Update or correct your information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                To exercise these rights, please contact us at info@whiteline.com
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-[#1e40af]" />
                <CardTitle className="text-gray-900">6. Cookies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p className="text-sm">
                We use cookies to enhance your experience on our website. Cookies help us remember your preferences and improve site functionality. You can choose to disable cookies through your browser settings, though this may affect site functionality.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}

