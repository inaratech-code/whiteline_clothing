'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Mail, Lock, AlertCircle } from 'lucide-react';

// Known admin UID - used for admin access
const ADMIN_UID = 'puZBmzHjSuer7CZDwMlkq72X8gj2';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';
  const { signIn } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Step 1: Sign in with Firebase Auth
      const user = await signIn(email, password);
      
      // Step 2: Check if this is the admin UID
      if (user.uid === ADMIN_UID) {
        // Admin user - allow access immediately
        router.push(redirect);
      } else {
        // Not admin - deny access
        setError('Access denied. This account does not have admin privileges.');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Background Image - Store Interior */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80&auto=format&fit=crop)',
          }}
        />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-xl border-0">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] flex items-center justify-center shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Admin Login
            </CardTitle>
            <CardDescription className="text-slate-600 mt-2">
              Sign in to access the admin dashboard
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-200 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  placeholder="admin@whiteline.com"
                  className="pl-10 h-11 border-slate-300 focus:border-[#1e40af] focus:ring-[#1e40af]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  placeholder="Enter your password"
                  className="pl-10 h-11 border-slate-300 focus:border-[#1e40af] focus:ring-[#1e40af]"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-center text-slate-600 mb-2">
              Are you a customer?
            </p>
            <Link 
              href="/auth/login" 
              className="block text-center text-sm text-[#1e40af] hover:text-[#1e3a8a] font-medium transition-colors"
            >
              Go to Customer Login →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}
