'use client';

import { useEffect, useState } from 'react';
import { getAllUsers, updateUserRole } from '@/lib/firebase/users';
import { getOrders } from '@/lib/firebase/orders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, Order } from '@/lib/types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users and orders independently
        const [allUsers, allOrders] = await Promise.all([
          getAllUsers(),
          getOrders() // Fetch all orders independently
        ]);
        setUsers(allUsers);
        setOrders(allOrders);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRoleUpdate = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  const adminCount = users.filter((u) => u.role === 'admin').length;
  const userCount = users.filter((u) => u.role === 'user').length;

  // User Analytics calculations
  const activeCustomers24h = new Set(
    orders
      .filter((order) => {
        const orderDate = new Date(order.createdAt);
        const now = new Date();
        return now.getTime() - orderDate.getTime() < 24 * 60 * 60 * 1000;
      })
      .map((order) => order.userId)
  ).size;

  const avgItemsPerOrder = orders.length > 0
    ? orders.reduce((sum, order) => sum + order.items.length, 0) / orders.length
    : 0;

  const repeatCustomers = users.length > 0 && orders.length > 0
    ? ((new Set(orders.map(o => o.userId)).size < orders.length ? 
        ((orders.length - new Set(orders.map(o => o.userId)).size) / users.length) * 100 : 0)).toFixed(1)
    : '0.0';

  // Calculate orders by hour (last 24 hours)
  const last24Hours = Array.from({ length: 24 }, (_, i) => {
    const hour = new Date();
    hour.setHours(hour.getHours() - (23 - i));
    hour.setMinutes(0, 0, 0);
    return hour;
  });

  const ordersByHour = last24Hours.map((hour) => {
    const hourEnd = new Date(hour);
    hourEnd.setHours(hour.getHours() + 1);
    
    const hourOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= hour && orderDate < hourEnd;
    });
    
    const revenue = hourOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    return {
      hour: hour.getHours(),
      hourLabel: hour.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
      orders: hourOrders.length,
      revenue,
    };
  });

  const maxOrders = Math.max(...ordersByHour.map(h => h.orders), 1);

  // Recent orders (last 5)
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header Banner - Dark Red */}
      <div className="bg-[#dc2626] text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">User Analytics</h1>
            <p className="text-white/90">Track visitor engagement, session duration, and browsing behaviour.</p>
          </div>
          <Button variant="outline" className="bg-white text-[#dc2626] hover:bg-white/90 border-white">
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2">
          <CardContent className="p-6">
            <p className="text-xs text-muted-foreground uppercase mb-2">Active Customers (24h)</p>
            <p className="text-3xl font-bold">{activeCustomers24h}</p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="p-6">
            <p className="text-xs text-muted-foreground uppercase mb-2">Site Visits</p>
            <p className="text-3xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="p-6">
            <p className="text-xs text-muted-foreground uppercase mb-2">Avg Items / Order</p>
            <p className="text-3xl font-bold">{avgItemsPerOrder.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="p-6">
            <p className="text-xs text-muted-foreground uppercase mb-2">Repeat Customers</p>
            <p className="text-3xl font-bold">{repeatCustomers}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders by Hour & Recent Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Orders by Hour Chart */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Orders by Hour (24h)</CardTitle>
            <p className="text-sm text-muted-foreground">Track order volume and revenue across the day.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Chart */}
              <div className="h-64 flex items-end justify-between gap-1">
                {ordersByHour.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center justify-end" style={{ height: '200px' }}>
                      <div
                        className="w-full bg-orange-500 rounded-t"
                        style={{ 
                          height: `${(data.orders / maxOrders) * 100}%`,
                          minHeight: data.orders > 0 ? '4px' : '0'
                        }}
                      />
                    </div>
                    {data.orders > 0 && (
                      <span className="text-xs text-muted-foreground">{data.hourLabel}</span>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Y-axis labels */}
              <div className="flex justify-between items-center text-xs text-muted-foreground px-2">
                <span>0</span>
                <span>{(maxOrders * 0.4).toFixed(1)}</span>
                <span>{(maxOrders * 0.8).toFixed(1)}</span>
                <span>{maxOrders.toFixed(1)}</span>
              </div>

              {/* Revenue display for hours with orders */}
              {ordersByHour.filter(h => h.orders > 0).map((data, index) => (
                <div key={index} className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm font-medium">{data.hourLabel}</span>
                  <span className="text-sm font-bold text-[#1e40af]">Rs. {data.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <p className="text-sm text-muted-foreground">Latest customer activity.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div key={order.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-semibold">{order.shippingInfo.name}</p>
                      <p className="text-sm font-bold text-[#1e40af]">Rs. {order.totalAmount.toLocaleString()}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {order.items.length} item(s) • {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No recent orders</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Section */}
      <div className="mt-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">User Management</h2>
          <p className="text-muted-foreground">
            Manage user accounts and roles • {users.length} total • {adminCount} admins • {userCount} users
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <Card className="border-2">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No users found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <Card key={user.id} className="border-2 hover:border-[#1e40af]/50 transition-colors">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <Badge 
                        variant={user.role === 'admin' ? 'default' : 'secondary'}
                        className={user.role === 'admin' ? 'bg-[#1e40af]' : ''}
                      >
                        {user.role.toUpperCase()}
                      </Badge>
                      <Select
                        value={user.role}
                        onValueChange={(value) => handleRoleUpdate(user.id, value as 'user' | 'admin')}
                      >
                        <SelectTrigger className="w-32 bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(user.phone || user.address) && (
                      <div className="space-y-1 pt-2 border-t">
                        {user.phone && (
                          <p className="text-sm text-muted-foreground">📞 {user.phone}</p>
                        )}
                        {user.address && (
                          <p className="text-sm text-muted-foreground">📍 {user.address}</p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
