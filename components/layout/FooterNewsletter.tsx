'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { subscribeNewsletter } from '@/lib/firebase/forms';

export function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      await subscribeNewsletter(email);
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      setStatus('error');
      setErrorMessage('Unable to subscribe right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-2">
        <p className="text-sm sm:text-base text-[#e88011] font-semibold drop-shadow-sm">
          You&apos;re subscribed! Watch your inbox for updates.
        </p>
      </div>
    );
  }

  return (
    <>
      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 uppercase tracking-wide text-white drop-shadow-sm">
        SIGN UP FOR UPDATES
      </h3>
      <p className="text-xs sm:text-sm text-white/75 mb-4 px-2">
        Be the first to know about new arrivals and exclusive offers.
      </p>
      <form
        onSubmit={handleNewsletterSubmit}
        className="flex flex-col sm:flex-row gap-2 mt-4 max-w-md mx-auto w-full px-2 sm:px-0"
      >
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 min-w-0 text-sm sm:text-base bg-white/10 text-white border-white/25 placeholder:text-white/45 focus-visible:border-[#e88011] focus-visible:ring-[#e88011]/30 backdrop-blur-sm"
          required
          disabled={loading}
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-[#e88011] text-white hover:bg-[#d0700f] text-sm sm:text-base w-full sm:w-auto shrink-0 uppercase tracking-wide font-bold rounded-none"
        >
          {loading ? 'Subscribing...' : 'SUBSCRIBE'}
        </Button>
      </form>
      {status === 'error' && (
        <p className="text-xs sm:text-sm text-red-300 mt-2 px-2">{errorMessage}</p>
      )}
    </>
  );
}
