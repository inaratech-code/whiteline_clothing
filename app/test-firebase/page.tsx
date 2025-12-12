'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase/config';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function TestFirebasePage() {
  const [status, setStatus] = useState<{
    config: 'checking' | 'success' | 'error';
    auth: 'checking' | 'success' | 'error';
    firestore: 'checking' | 'success' | 'error';
    message: string;
  }>({
    config: 'checking',
    auth: 'checking',
    firestore: 'checking',
    message: 'Testing Firebase connection...',
  });

  useEffect(() => {
    const testConnection = async () => {
      const results: {
        config: 'checking' | 'success' | 'error';
        auth: 'checking' | 'success' | 'error';
        firestore: 'checking' | 'success' | 'error';
        message: string;
      } = {
        config: 'checking',
        auth: 'checking',
        firestore: 'checking',
        message: '',
      };

      // Test 1: Check Config
      try {
        const config = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        };

        if (
          config.apiKey &&
          config.projectId &&
          config.authDomain &&
          !config.apiKey.includes('your-') &&
          !config.projectId.includes('your-')
        ) {
          results.config = 'success';
          results.message += '✅ Config loaded correctly\n';
        } else {
          results.config = 'error';
          results.message += '❌ Config has placeholder values\n';
        }
      } catch (error) {
        results.config = 'error';
        results.message += '❌ Config error\n';
      }
      setStatus((prev) => ({ ...prev, ...results }));

      // Test 2: Check Auth
      try {
        if (auth) {
          results.auth = 'success';
          results.message += '✅ Firebase Auth initialized\n';
        } else {
          results.auth = 'error';
          results.message += '❌ Firebase Auth not initialized\n';
        }
      } catch (error) {
        results.auth = 'error';
        results.message += '❌ Firebase Auth error\n';
      }
      setStatus((prev) => ({ ...prev, ...results }));

      // Test 3: Check Firestore
      try {
        const testQuery = query(collection(db, 'users'), limit(1));
        await getDocs(testQuery);
        results.firestore = 'success';
        results.message += '✅ Firestore connection successful\n';
      } catch (error: any) {
        results.firestore = 'error';
        results.message += `❌ Firestore error: ${error.message}\n`;
        if (error.code === 'permission-denied') {
          results.message += '   → Check Firestore security rules\n';
        }
        if (error.code === 'unavailable') {
          results.message += '   → Firestore API may not be enabled\n';
        }
      }
      setStatus((prev) => ({ ...prev, ...results }));
    };

    testConnection();
  }, []);

  const getStatusIcon = (status: 'checking' | 'success' | 'error') => {
    if (status === 'checking') {
      return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
    }
    if (status === 'success') {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  const getStatusText = (status: 'checking' | 'success' | 'error') => {
    if (status === 'checking') return 'Checking...';
    if (status === 'success') return 'Connected';
    return 'Failed';
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Firebase Connection Test</h1>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(status.config)}
                Configuration
              </CardTitle>
              <CardDescription>
                {getStatusText(status.config)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm font-mono">
                <div>
                  <span className="text-slate-600">Project ID:</span>{' '}
                  <span className="text-slate-900">
                    {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Not set'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-600">Auth Domain:</span>{' '}
                  <span className="text-slate-900">
                    {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'Not set'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-600">API Key:</span>{' '}
                  <span className="text-slate-900">
                    {process.env.NEXT_PUBLIC_FIREBASE_API_KEY
                      ? `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY.substring(0, 20)}...`
                      : 'Not set'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(status.auth)}
                Firebase Authentication
              </CardTitle>
              <CardDescription>
                {getStatusText(status.auth)}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(status.firestore)}
                Firestore Database
              </CardTitle>
              <CardDescription>
                {getStatusText(status.firestore)}
              </CardDescription>
            </CardHeader>
          </Card>

          {status.message && (
            <Card>
              <CardHeader>
                <CardTitle>Status Details</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm whitespace-pre-wrap font-mono bg-slate-100 p-4 rounded">
                  {status.message}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

