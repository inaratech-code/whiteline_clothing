'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { signIn, userData } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      // If redirect is to admin area, redirect to admin login instead
      if (redirect.startsWith('/admin')) {
        router.push('/admin/login?redirect=' + encodeURIComponent(redirect));
      } else {
        router.push(redirect);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image - Store Interior */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-500 ease-out"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80&auto=format&fit=crop)',
          }}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="w-full h-full bg-gradient-to-b from-black/60 via-black/50 to-black/60"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Dark Slate Box with Rounded Corners */}
        <div className="bg-gradient-to-b from-slate-800/95 via-slate-700/95 to-slate-800/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-slate-600">
          {/* WELCOME BACK Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
            className="flex justify-center mb-6"
          >
            <div className="px-6 py-2 rounded-full border-2 border-white">
              <p className="text-white text-xs md:text-sm font-semibold tracking-wider uppercase">
                WELCOME BACK
              </p>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Sign in to{' '}
              <span className="text-4xl md:text-5xl font-extrabold">WHITELINE</span>
            </h1>
          </motion.div>

          {/* Descriptive Text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
            className="text-white/90 text-center text-sm md:text-base mb-8 leading-relaxed px-4"
          >
            Access your saved favourites, track orders in real time, or jump into the admin dashboard to keep the kitchen running smoothly.
          </motion.p>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.7 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="bg-red-950/50 text-white text-sm p-4 rounded-lg border border-red-700 flex items-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  <span>{error}</span>
                </motion.div>
              )}
              
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-white mb-2 block">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="your@email.com"
                    className="pl-10 h-12 bg-white/10 border-2 border-white/30 text-white placeholder:text-white/50 focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-white">
                    Password
                  </Label>
                  <Link href="/auth/forgot-password" className="text-sm text-white/80 hover:text-white underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    placeholder="Enter your password"
                    className="pl-10 h-12 bg-white/10 border-2 border-white/30 text-white placeholder:text-white/50 focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.9 }}
              >
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-white text-slate-900 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-base group mt-6" 
                  disabled={loading}
                >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-slate-900 border-t-transparent rounded-full"
                    />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
              </motion.div>
            </form>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 1 }}
              className="mt-8 space-y-4 pt-6 border-t border-white/20"
            >
              <div className="text-center text-sm">
                <span className="text-white/80">Don't have an account? </span>
                <Link href="/auth/signup" className="font-medium text-white hover:text-white/80 underline transition-colors">
                  Sign up
                </Link>
              </div>
              <div className="pt-4">
                <p className="text-xs text-center text-white/70 mb-2">
                  Admin access?
                </p>
                <Link 
                  href="/admin/login" 
                  className="flex items-center justify-center gap-2 text-sm text-white hover:text-white/80 font-medium transition-colors group"
                >
                  Go to Admin Login
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80&auto=format&fit=crop)',
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
        </div>
        <div className="w-full max-w-lg bg-gradient-to-b from-slate-800/95 via-slate-700/95 to-slate-800/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border-2 border-slate-600 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
            <p className="text-white/80">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

