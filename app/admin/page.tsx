'use client';

import { useOrders } from '@/lib/hooks/useOrders';
import { useProducts } from '@/lib/hooks/useProducts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const { orders } = useOrders();
  const { products } = useProducts();

  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const processingOrders = orders.filter((o) => o.status === 'processing').length;
  const shippedOrders = orders.filter((o) => o.status === 'shipped').length;
  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;
  const totalProducts = products.length;

  // Calculate daily sales (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    date.setHours(0, 0, 0, 0);
    return {
      date: new Date(date),
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  });

  const dailySales = last7Days.map(({ date, label }) => {
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);
    
    const dayOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= date && orderDate <= dayEnd;
    });
    return {
      day: label,
      revenue: dayOrders.reduce((sum, order) => sum + order.totalAmount, 0),
    };
  });

  // Calculate weekly sales (last 4 weeks)
  const last4Weeks = Array.from({ length: 4 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (i * 7));
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    return `Week ${4 - i}`;
  }).reverse();

  const weeklySales = last4Weeks.map((week, index) => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - ((4 - index) * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const weekOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= weekStart && orderDate <= weekEnd;
    });
    return {
      week,
      revenue: weekOrders.reduce((sum, order) => sum + order.totalAmount, 0),
    };
  });

  const maxDailyRevenue = Math.max(...dailySales.map(d => d.revenue), 1);
  const maxWeeklyRevenue = Math.max(...weeklySales.map(w => w.revenue), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor revenue, orders, and daily performance</p>
        </div>
        <Button variant="outline" className="border-[#1e40af] text-[#1e40af]">
          Refresh
        </Button>
      </div>

      {/* Total Revenue & Orders Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Revenue Card - Dark Red Background */}
        <Card className="bg-[#dc2626] text-white border-0">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-white/90 uppercase">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">Rs. {totalSales.toLocaleString()}</p>
          </CardContent>
        </Card>

        {/* Orders Overview Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase">Orders Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <div className="px-4 py-2 rounded-full bg-orange-500 text-white font-medium">
                Pending {pendingOrders}
              </div>
              <div className="px-4 py-2 rounded-full bg-yellow-500 text-white font-medium">
                Processing {processingOrders}
              </div>
              <div className="px-4 py-2 rounded-full bg-blue-500 text-white font-medium">
                Shipped {shippedOrders}
              </div>
              <div className="px-4 py-2 rounded-full bg-green-500 text-white font-medium">
                Delivered {deliveredOrders}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Sales & Weekly Sales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Daily Sales</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">Trend</Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">Daily Revenue (NPR)</p>
            {/* Bar Chart */}
            <div className="h-64 flex items-end justify-between gap-2 mb-4">
              {dailySales.map((data, index) => {
                const height = maxDailyRevenue > 0 ? (data.revenue / maxDailyRevenue) * 100 : 0;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                    {/* Bar */}
                    <div className="w-full flex flex-col items-center justify-end" style={{ height: '200px' }}>
                      <div
                        className="w-full bg-[#1e40af] rounded-t transition-all hover:bg-[#1e3a8a] cursor-pointer relative"
                        style={{ 
                          height: `${height}%`,
                          minHeight: data.revenue > 0 ? '4px' : '0'
                        }}
                        title={`${data.day}: Rs. ${data.revenue.toLocaleString()}`}
                      >
                        {data.revenue > 0 && (
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Rs. {data.revenue.toFixed(0)}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Day Label */}
                    <span className="text-xs text-muted-foreground font-medium">{data.day}</span>
                  </div>
                );
              })}
            </div>
            {/* Y-axis labels */}
            <div className="flex justify-between items-center text-xs text-muted-foreground px-1 mt-2">
              <span>0</span>
              <span>{(maxDailyRevenue * 0.25).toLocaleString()}</span>
              <span>{(maxDailyRevenue * 0.5).toLocaleString()}</span>
              <span>{(maxDailyRevenue * 0.75).toLocaleString()}</span>
              <span>{maxDailyRevenue.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Sales Chart */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Weekly Sales</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">Overview</Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">Weekly Revenue (NPR)</p>
            {/* Bar Chart */}
            <div className="h-64 flex items-end justify-between gap-2 mb-4">
              {weeklySales.map((data, index) => {
                const height = maxWeeklyRevenue > 0 ? (data.revenue / maxWeeklyRevenue) * 100 : 0;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                    {/* Bar */}
                    <div className="w-full flex flex-col items-center justify-end" style={{ height: '200px' }}>
                      <div
                        className="w-full bg-[#dc2626] rounded-t transition-all hover:bg-[#b91c1c] cursor-pointer relative"
                        style={{ 
                          height: `${height}%`,
                          minHeight: data.revenue > 0 ? '4px' : '0'
                        }}
                        title={`${data.week}: Rs. ${data.revenue.toLocaleString()}`}
                      >
                        {data.revenue > 0 && (
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Rs. {data.revenue.toFixed(0)}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Week Label */}
                    <span className="text-xs text-muted-foreground font-medium">{data.week}</span>
                  </div>
                );
              })}
            </div>
            {/* Y-axis labels */}
            <div className="flex justify-between items-center text-xs text-muted-foreground px-1 mt-2">
              <span>0</span>
              <span>{(maxWeeklyRevenue * 0.25).toLocaleString()}</span>
              <span>{(maxWeeklyRevenue * 0.5).toLocaleString()}</span>
              <span>{(maxWeeklyRevenue * 0.75).toLocaleString()}</span>
              <span>{maxWeeklyRevenue.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

