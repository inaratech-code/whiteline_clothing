'use client';

import { usePathname } from 'next/navigation';

type ConditionalLayoutProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
};

export function ConditionalLayout({ children, header, footer }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isAuthPage = pathname?.startsWith('/auth/');

  if (isAdminRoute || isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-hidden">
      {header}
      <main className="flex-1 min-w-0 w-full">{children}</main>
      {footer}
    </div>
  );
}
