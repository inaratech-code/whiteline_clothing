'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  BarChart3,
  LogOut,
} from 'lucide-react';

// Known admin UIDs (fallback if Firestore is unavailable)
const KNOWN_ADMIN_UIDS = ['puZBmzHjSuer7CZDwMlkq72X8gj2'];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, userData, loading, isAdmin, signOut } = useAuthContext();

  // Don't apply admin check to login page
  const isLoginPage = pathname === '/admin/login';

  // Check if user is admin: UID check works immediately, role check is secondary
  const isAdminByUID = user?.uid && KNOWN_ADMIN_UIDS.includes(user.uid);
  const isAdminByRole = userData?.role === 'admin';
  const userIsAdmin = isAdminByUID || isAdminByRole;

  useEffect(() => {
    // Skip auth check on login page
    if (isLoginPage) return;
    
    // Give auth context time to update after login
    if (loading) return;
    
    // Check if user is authenticated and is admin
    if (!user) {
      router.push('/admin/login?redirect=' + encodeURIComponent(pathname || '/admin'));
      return;
    }
    
    // Check admin status - UID check works immediately
    if (!isAdminByUID && !isAdminByRole) {
      router.push('/admin/login?redirect=' + encodeURIComponent(pathname || '/admin'));
    }
  }, [user, userData, loading, router, pathname, isLoginPage, isAdminByUID, isAdminByRole]);

  // Don't render admin layout on login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="h-16 w-full" />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!user || !userIsAdmin) {
    return null;
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/categories', label: 'Categories', icon: FolderTree },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header - Urban Bhatti Style */}
      <header className="border-b bg-[#1e40af] text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-xl font-bold">
              Whiteline Admin
            </Link>
            <Link href="/" className="text-sm text-white/80 hover:text-white transition-colors">
              View Site →
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-white/80">
                {userData?.name || user?.displayName || user?.email || 'Admin User'}
              </div>
              {userData?.role && (
                <div className="text-xs text-white/60">
                  Role: {userData.role.toUpperCase()}
                </div>
              )}
              {user?.uid && (
                <div className="text-xs text-white/60 font-mono">ID: {user.uid.slice(0, 8)}...</div>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-white hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Urban Bhatti Style */}
        <aside className="w-64 border-r min-h-[calc(100vh-73px)] bg-muted/30">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1e40af]/10 hover:text-[#1e40af] transition-colors font-medium"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-background">{children}</main>
      </div>
    </div>
  );
}

