'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function AccountPage() {
  const router = useRouter();
  const { user, userData, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login?redirect=/account');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!user || !userData) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{userData.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{userData.email}</p>
            </div>
            {userData.phone && (
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{userData.phone}</p>
              </div>
            )}
            {userData.address && (
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{userData.address}</p>
              </div>
            )}
            <Link href="/account/edit">
              <Button variant="outline">Edit Profile</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/account/orders" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Order History
              </Button>
            </Link>
            <Link href="/account/edit" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Edit Profile
              </Button>
            </Link>
            {userData.role === 'admin' && (
              <Link href="/admin" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  Admin Dashboard
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

