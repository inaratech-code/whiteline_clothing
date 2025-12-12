'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { TextReveal } from '@/components/animations/TextReveal';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend/email service
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="flex flex-col relative min-h-screen">
      {/* Background Image - Contact Us */}
      <div className="fixed inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80&auto=format&fit=crop)',
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-slate-900/30 via-black/40 to-slate-900/30" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 text-white overflow-hidden z-10">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="container mx-auto px-4 text-center"
        >
          <TextReveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tight">
              CONTACT US
            </h1>
          </TextReveal>
          <TextReveal delay={0.15}>
            <p className="text-xl md:text-2xl text-white/90">
              Get in touch with the Whiteline team
            </p>
          </TextReveal>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <FadeIn delay={0.1}>
              <Card className="bg-slate-900/80 backdrop-blur-sm border-2 border-slate-700/50 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Mail className="h-5 w-5" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">info@whiteline.com</p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Card className="bg-slate-900/80 backdrop-blur-sm border-2 border-slate-700/50 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Phone className="h-5 w-5" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">+977 1-XXX-XXXX</p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <Card className="bg-slate-900/80 backdrop-blur-sm border-2 border-slate-700/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <p className="text-green-400 font-semibold mb-2">
                    Thank you for your message!
                  </p>
                  <p className="text-white/80">
                    We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Name</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-white">Subject</Label>
                    <Input
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-white/50"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#1e40af] text-white hover:bg-[#1e3a8a]">
                    Send Message
                  </Button>
                </form>
              )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

