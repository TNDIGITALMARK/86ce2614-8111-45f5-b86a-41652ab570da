'use client';

import { AppLayout } from '@/components/layouts/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  FileText,
  Download,
  Send,
  DollarSign,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { mockBookings } from '@/lib/data/mockData';

export default function InvoicesPage() {
  // Generate mock invoices from bookings
  const invoices = mockBookings.map((booking, index) => ({
    id: `inv-${booking.id}`,
    invoice_number: `INV-2024-${String(index + 1001).padStart(4, '0')}`,
    booking: booking,
    client: booking.client,
    invoice_type: 'rental' as const,
    subtotal: booking.subtotal,
    tax: booking.subtotal * 0.08,
    total: booking.total_amount,
    amount_paid: booking.deposit_paid ? booking.deposit_amount : 0,
    balance_due: booking.balance_due,
    status: booking.payment_status === 'paid' ? 'paid' : booking.payment_status === 'partial' ? 'sent' : 'overdue',
    created_at: booking.created_at,
    due_date: booking.event_date
  }));

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.amount_paid, 0);
  const totalOutstanding = invoices.reduce((sum, inv) => sum + inv.balance_due, 0);
  const overdueCount = invoices.filter(inv => inv.status === 'overdue').length;

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Invoices & Payments</h1>
            <p className="text-muted-foreground text-lg">
              Track billing, payments, and financial records
            </p>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Invoiced</p>
                  <p className="text-2xl font-bold">
                    ${totalInvoiced.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${totalPaid.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding</p>
                  <p className="text-2xl font-bold text-amber-600">
                    ${totalOutstanding.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">
                    {overdueCount}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Invoices</CardTitle>
                <CardDescription>Complete billing history</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Paid</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} className="hover:bg-secondary/50">
                    <TableCell>
                      <span className="font-mono font-semibold">
                        {invoice.invoice_number}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{invoice.client?.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {invoice.client?.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {invoice.booking.event_name}
                    </TableCell>
                    <TableCell>
                      <span className="capitalize text-sm">
                        {invoice.invoice_type}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.due_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${invoice.total.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-green-600">
                      ${invoice.amount_paid.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={invoice.balance_due > 0 ? 'text-amber-600 font-semibold' : 'text-muted-foreground'}>
                        ${invoice.balance_due.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={
                        invoice.status === 'paid' ? 'paid' :
                        invoice.status === 'sent' ? 'partial' :
                        'overdue'
                      } />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payment Collection Info */}
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle>Automated Payment Processing</CardTitle>
            <CardDescription>
              Secure payment portal accepts deposits and full payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold">Features:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Stripe integration for secure payments</li>
                  <li>• Automatic invoice generation and email delivery</li>
                  <li>• Real-time payment tracking and reconciliation</li>
                  <li>• Deposit and balance payment processing</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Damage & Replacement Invoices:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Automatic damage invoice generation upon report</li>
                  <li>• Linked to original booking for easy tracking</li>
                  <li>• Replacement cost calculations included</li>
                  <li>• Photo documentation attached to invoices</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
