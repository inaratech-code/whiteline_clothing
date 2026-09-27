'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { resetPassword } from '@/lib/firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80&auto=format&fit=crop)',
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="bg-gradient-to-b from-slate-800/95 via-slate-700/95 to-slate-800/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-slate-600">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-white/80 text-sm md:text-base">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          {sent ? (
            <div className="text-center space-y-6">
              <p className="text-green-300 font-medium">
                Check your inbox for a password reset link.
              </p>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-white hover:text-white/80 font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-lg border border-red-700 bg-red-950/50 p-4 text-sm text-white">
                  {error}
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-white mb-2 block">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="your@email.com"
                    className="pl-10 h-12 bg-white/10 border-2 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-white text-slate-900 hover:bg-white/90 font-bold"
              >
                {loading ? 'Sending...' : (
                  <span className="flex items-center justify-center gap-2">
                    Send Reset Link
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

              <div className="text-center pt-4">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
