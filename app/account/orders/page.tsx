'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { useOrders } from '@/lib/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrdersPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthContext();
  const { orders, loading: ordersLoading } = useOrders(user?.uid);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/account/orders');
    }
  }, [user, authLoading, router]);

  if (authLoading || ordersLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'shipped':
        return 'default';
      case 'processing':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
          <Link href="/shop">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={getStatusColor(order.status)} className="text-xs">
                    {order.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0 text-xs sm:text-sm">
                      <span className="break-words">
                        {item.product.name} (Size: {item.size}) × {item.quantity}
                      </span>
                      <span className="font-medium">NPR {item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-bold text-sm sm:text-base">Total</span>
                  <span className="text-lg sm:text-xl font-bold">NPR {order.totalAmount.toLocaleString()}</span>
                </div>
                <div className="mt-4">
                  <Link href={`/orders/${order.id}`}>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

