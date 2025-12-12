'use client';

import { Order } from '@/lib/types';
import { CheckCircle2, Circle, Package, Truck, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderTrackingProps {
  order: Order;
}

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: Circle },
  { key: 'processing', label: 'Processing', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Home },
];

export function OrderTracking({ order }: OrderTrackingProps) {
  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex((step) => step.key === status);
  };

  const currentIndex = getStatusIndex(order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Order Tracking</h2>
        <p className="text-muted-foreground">
          Track your order in real-time
        </p>
      </div>

      {isCancelled ? (
        <div className="border rounded-lg p-6 bg-destructive/10">
          <p className="text-destructive font-semibold">Order Cancelled</p>
          <p className="text-sm text-muted-foreground mt-1">
            This order has been cancelled.
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(currentIndex / (statusSteps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 w-full bg-[#1e40af] origin-top"
            />
          </div>

          {/* Status Steps */}
          <div className="space-y-8 relative">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentIndex;
              const isCurrent = index === currentIndex;
              const Icon = step.icon;
              const isPast = index < currentIndex;

              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    {isCompleted ? (
                      <div className="h-12 w-12 rounded-full bg-[#1e40af] flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center border-2 border-muted-foreground/20">
                        <Icon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.label}
                      </h3>
                      {isCurrent && (
                        <span className="text-xs bg-[#1e40af]/10 text-[#1e40af] px-2 py-0.5 rounded-full font-medium">
                          Current
                        </span>
                      )}
                    </div>
                    {isCurrent && (
                      <p className="text-sm text-muted-foreground">
                        {order.status === 'pending' && 'Your order has been placed and is awaiting processing.'}
                        {order.status === 'processing' && 'We are preparing your order for shipment.'}
                        {order.status === 'shipped' && 'Your order is on the way to you.'}
                        {order.status === 'delivered' && 'Your order has been delivered successfully.'}
                      </p>
                    )}
                    {isPast && index === 0 && (
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    )}
                    {isPast && index === 1 && order.status !== 'pending' && (
                      <p className="text-xs text-muted-foreground">
                        Processing started
                      </p>
                    )}
                    {isPast && index === 2 && (order.status === 'shipped' || order.status === 'delivered') && (
                      <p className="text-xs text-muted-foreground">
                        Shipped on {new Date(order.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                    {isPast && index === 3 && order.status === 'delivered' && (
                      <p className="text-xs text-muted-foreground">
                        Delivered on {new Date(order.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

