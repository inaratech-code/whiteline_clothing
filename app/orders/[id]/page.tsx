'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useOrder } from '@/lib/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle } from 'lucide-react';
import { OrderTracking } from '@/components/orders/OrderTracking';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { order, loading } = useOrder(orderId);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground mb-4">Order not found</p>
        <Link href="/account/orders">
          <Button>View All Orders</Button>
        </Link>
      </div>
    );
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        {/* Order Tracking */}
        <div className="mb-8">
          <OrderTracking order={order} />
        </div>

        <div className="border rounded-lg p-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Order Number</span>
              <span className="font-mono">{order.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant={getStatusColor(order.status)}>
                {order.status.toUpperCase()}
              </Badge>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">NPR {item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="font-semibold mb-4">Shipping Information</h2>
            <div className="text-sm space-y-1">
              <p>{order.shippingInfo.name}</p>
              <p>{order.shippingInfo.address}</p>
              <p>
                {order.shippingInfo.city}, {order.shippingInfo.postalCode}
              </p>
              <p>{order.shippingInfo.country}</p>
              <p>{order.shippingInfo.phone}</p>
              <p>{order.shippingInfo.email}</p>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold">NPR {order.totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/account/orders">
            <Button variant="outline">View All Orders</Button>
          </Link>
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

