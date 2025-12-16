'use client';

import { AppLayout } from '@/components/layouts/AppLayout';
import { MetricCard } from '@/components/ui/metric-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  DollarSign,
  Package,
  Calendar,
  AlertCircle,
  Users,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { mockBookings, mockInventory, mockClients, getUpcomingBookings } from '@/lib/data/mockData';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const upcomingBookings = getUpcomingBookings().slice(0, 5);

  // Calculate metrics
  const totalInventoryValue = mockInventory.reduce((total, item) => {
    return total + (item.replacement_cost * item.quantity_total);
  }, 0);

  const itemsCurrentlyRented = mockInventory.reduce((total, item) => {
    return total + item.quantity_rented;
  }, 0);

  const upcomingEventsThisWeek = upcomingBookings.length;

  const outstandingPayments = mockBookings
    .filter(b => b.payment_status !== 'paid')
    .reduce((total, b) => total + b.balance_due, 0);

  // AI Insights
  const aiInsights = [
    {
      type: 'trending',
      title: 'Gold Chargers Trending Up',
      description: 'Gold-rimmed charger plates are up 25% this month',
      icon: TrendingUp,
      priority: 'high',
      metric: '+25%'
    },
    {
      type: 'forecast',
      title: 'Wedding Season Peak Approaching',
      description: 'Expect 40% increase in bookings May-June',
      icon: Calendar,
      priority: 'high',
      metric: 'Peak: May-June'
    },
    {
      type: 'alert',
      title: 'Low Stock Alert',
      description: 'White linens running low - only 12 sets available',
      icon: AlertCircle,
      priority: 'medium',
      metric: '12 remaining'
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Real-time overview of your décor rental operations
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Inventory Value"
            value={`$${totalInventoryValue.toLocaleString()}`}
            description="Total replacement cost"
            icon={DollarSign}
            variant="gold"
          />

          <MetricCard
            title="Items Currently Rented"
            value={itemsCurrentlyRented}
            description="Out for events"
            icon={Package}
          />

          <MetricCard
            title="Upcoming Events"
            value={upcomingEventsThisWeek}
            description="This week"
            icon={Calendar}
          />

          <MetricCard
            title="Outstanding Payments"
            value={`$${outstandingPayments.toLocaleString()}`}
            description="Balance due"
            icon={AlertCircle}
            variant="warning"
          />
        </div>

        {/* AI Insights Section */}
        <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span>AI-Powered Insights</span>
                </CardTitle>
                <CardDescription>
                  Smart analytics to help you make better decisions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <insight.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {insight.description}
                      </p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                        {insight.metric}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events requiring preparation</CardDescription>
              </div>
              <Link href="/bookings">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold">{booking.event_name}</h4>
                      <StatusBadge status={booking.status} />
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Client: {booking.client?.name}</p>
                      <p>Date: {new Date(booking.event_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                      {booking.event_location && (
                        <p>Location: {booking.event_location}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-lg font-bold">
                      ${booking.total_amount.toLocaleString()}
                    </div>
                    <StatusBadge status={booking.payment_status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{mockClients.length}</div>
                  <p className="text-sm text-muted-foreground mt-1">Active clients</p>
                </div>
                <Users className="w-12 h-12 text-muted-foreground/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inventory Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{mockInventory.length}</div>
                  <p className="text-sm text-muted-foreground mt-1">Active items</p>
                </div>
                <Package className="w-12 h-12 text-muted-foreground/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">$18,500</div>
                  <p className="text-sm text-green-600 mt-1">+12% from last month</p>
                </div>
                <DollarSign className="w-12 h-12 text-muted-foreground/20" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
