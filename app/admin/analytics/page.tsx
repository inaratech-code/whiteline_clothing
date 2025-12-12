'use client';

import { useOrders } from '@/lib/hooks/useOrders';
import { useProducts } from '@/lib/hooks/useProducts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminAnalyticsPage() {
  const { orders } = useOrders();
  const { products } = useProducts();

  // Calculate analytics
  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  // Orders by status
  const ordersByStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sales by month (last 6 months)
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }).reverse();

  const salesByMonth = last6Months.map((month) => {
    const monthOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) === month;
    });
    return {
      month,
      sales: monthOrders.reduce((sum, order) => sum + order.totalAmount, 0),
      orders: monthOrders.length,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Store performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">NPR {totalSales.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-2">All time sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalOrders}</p>
            <p className="text-sm text-muted-foreground mt-2">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">NPR {Math.round(averageOrderValue).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-2">Per order</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders by Status */}
      <Card>
        <CardHeader>
          <CardTitle>Orders by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(ordersByStatus).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center">
                <span className="capitalize">{status}</span>
                <span className="font-bold">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sales by Month */}
      <Card>
        <CardHeader>
          <CardTitle>Sales by Month (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesByMonth.map((data) => (
              <div key={data.month}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{data.month}</span>
                  <span className="text-sm font-bold">NPR {data.sales.toLocaleString()}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {data.orders} orders
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

