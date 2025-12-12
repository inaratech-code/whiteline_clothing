'use client';

import { useMemo, memo, useState } from 'react';
import { useOrders } from '@/lib/hooks/useOrders';
import { updateOrderStatus } from '@/lib/firebase/orders';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShoppingCart, Clock, Package, CheckCircle, XCircle, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Memoized Order Card Component
const OrderCard = memo(function OrderCard({ 
  order, 
  onStatusUpdate 
}: { 
  order: any; 
  onStatusUpdate: (orderId: string, newStatus: string) => void;
}) {
  const [updating, setUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus: string) => {
    setUpdating(true);
    try {
      await onStatusUpdate(order.id, newStatus);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500 text-white';
      case 'shipped': return 'bg-blue-500 text-white';
      case 'processing': return 'bg-yellow-500 text-white';
      case 'pending': return 'bg-orange-500 text-white';
      case 'cancelled': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <ShoppingCart className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2 hover:border-[#1e40af]/50 hover:shadow-lg transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-[#1e40af]/10 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-[#1e40af]" />
              </div>
              <div>
                <CardTitle className="text-xl">Order #{order.id.slice(0, 8).toUpperCase()}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
            <Badge className={`${getStatusColor(order.status)} text-sm px-4 py-2 flex items-center gap-2`}>
              {getStatusIcon(order.status)}
              {order.status.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold mb-3 text-muted-foreground uppercase flex items-center gap-2">
                <Package className="h-4 w-4" />
                Items
              </p>
              <div className="space-y-2">
                {order.items.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-slate-50 to-white border border-slate-200 hover:border-[#1e40af]/30 transition-colors duration-200"
                  >
                    <span className="text-sm">
                      <span className="font-medium">{item.product.name}</span>
                      <span className="text-muted-foreground ml-2">(Size: {item.size})</span>
                      <span className="text-muted-foreground"> × {item.quantity}</span>
                    </span>
                    <span className="font-semibold text-[#1e40af]">Rs. {item.price.toLocaleString()}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <div>
                <p className="text-sm text-muted-foreground uppercase mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-[#1e40af]">Rs. {order.totalAmount.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <Select
                  value={order.status}
                  onValueChange={handleStatusUpdate}
                  disabled={updating}
                >
                  <SelectTrigger className="w-44 bg-background border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Link href={`/orders/${order.id}`}>
                  <Button variant="outline" size="sm" className="bg-[#1e40af] text-white hover:bg-[#1e3a8a] border-[#1e40af] transition-colors duration-200">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

// Memoized Recent Order Item
const RecentOrderItem = memo(function RecentOrderItem({ order }: { order: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500 text-white';
      case 'shipped': return 'bg-blue-500 text-white';
      case 'processing': return 'bg-yellow-500 text-white';
      case 'pending': return 'bg-orange-500 text-white';
      case 'cancelled': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <ShoppingCart className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="p-4 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200 hover:border-[#1e40af]/50 hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#1e40af]/10 flex items-center justify-center group-hover:bg-[#1e40af]/20 transition-colors duration-200">
            <ShoppingCart className="h-5 w-5 text-[#1e40af]" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">{order.shippingInfo.name}</p>
            <p className="text-xs text-muted-foreground">
              {order.items.length} item(s) • {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-[#1e40af]">Rs. {order.totalAmount.toLocaleString()}</p>
          <Badge className={`${getStatusColor(order.status)} text-xs mt-1 flex items-center gap-1 w-fit`}>
            {getStatusIcon(order.status)}
            {order.status.toUpperCase()}
          </Badge>
        </div>
      </div>
    </motion.div>
  );
});

export default function AdminOrdersPage() {
  const { orders, loading, mutate } = useOrders();
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingOrderId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus as any);
      mutate();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Memoize expensive calculations
  const stats = useMemo(() => {
    const pendingCount = orders.filter((o) => o.status === 'pending').length;
    const processingCount = orders.filter((o) => o.status === 'processing').length;
    const shippedCount = orders.filter((o) => o.status === 'shipped').length;
    const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
    return { pendingCount, processingCount, shippedCount, deliveredCount };
  }, [orders]);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [orders]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">Orders</h1>
          <p className="text-muted-foreground">
            Manage customer orders • {stats.pendingCount} pending • {stats.processingCount} processing
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
        >
          <Card className="border-2 bg-gradient-to-br from-orange-50 to-orange-100/50 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground uppercase mb-1">Pending</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pendingCount}</p>
                </div>
                <motion.div 
                  className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Clock className="h-6 w-6 text-orange-600" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-2 bg-gradient-to-br from-yellow-50 to-yellow-100/50 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground uppercase mb-1">Processing</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.processingCount}</p>
                </div>
                <motion.div 
                  className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Package className="h-6 w-6 text-yellow-600" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-2 bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground uppercase mb-1">Shipped</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.shippedCount}</p>
                </div>
                <motion.div 
                  className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Truck className="h-6 w-6 text-blue-600" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="border-2 bg-gradient-to-br from-green-50 to-green-100/50 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground uppercase mb-1">Delivered</p>
                  <p className="text-3xl font-bold text-green-600">{stats.deliveredCount}</p>
                </div>
                <motion.div 
                  className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-[#1e40af]" />
              Recent Orders
            </CardTitle>
            <p className="text-sm text-muted-foreground">Latest customer activity</p>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : recentOrders.length > 0 ? (
              <AnimatePresence mode="popLayout">
                <div className="space-y-3">
                  {recentOrders.map((order, index) => (
                    <RecentOrderItem key={order.id} order={order} />
                  ))}
                </div>
              </AnimatePresence>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No recent orders</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* All Orders */}
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </motion.div>
      ) : orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2">
            <CardContent className="py-12 text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground text-lg">No orders yet</p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {orders.map((order, index) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}

