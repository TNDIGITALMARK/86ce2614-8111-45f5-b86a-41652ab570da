'use client';

import { AppLayout } from '@/components/layouts/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Plus,
  Search,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowUpDown
} from 'lucide-react';
import { mockInventory } from '@/lib/data/mockData';
import { useState } from 'react';

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = mockInventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate metrics
  const totalValue = mockInventory.reduce((sum, item) =>
    sum + (item.replacement_cost * item.quantity_total), 0
  );
  const totalItems = mockInventory.reduce((sum, item) => sum + item.quantity_total, 0);
  const itemsRented = mockInventory.reduce((sum, item) => sum + item.quantity_rented, 0);
  const lowStockItems = mockInventory.filter(item =>
    item.quantity_available < (item.quantity_total * 0.25)
  ).length;

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Inventory Management</h1>
            <p className="text-muted-foreground text-lg">
              Track stock, monitor availability, and manage items
            </p>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Plus className="w-5 h-5 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Inventory Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-accent/30 bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-gold-gradient">
                    ${totalValue.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">{totalItems}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Currently Rented</p>
                  <p className="text-2xl font-bold">{itemsRented}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock Alerts</p>
                  <p className="text-2xl font-bold text-amber-600">{lowStockItems}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Inventory Items</CardTitle>
                <CardDescription>Complete catalog of rental items</CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search inventory..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Available</TableHead>
                  <TableHead className="text-center">Rented</TableHead>
                  <TableHead className="text-right">Rental Price</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => {
                  const availabilityPercent = (item.quantity_available / item.quantity_total) * 100;
                  const isLowStock = availabilityPercent < 25;

                  return (
                    <TableRow key={item.id} className="hover:bg-secondary/50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {item.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-mono text-muted-foreground">
                          {item.sku}
                        </span>
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {item.quantity_total}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <span className={isLowStock ? 'text-amber-600 font-semibold' : 'font-semibold'}>
                            {item.quantity_available}
                          </span>
                          {isLowStock && (
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-blue-600 font-semibold">
                          {item.quantity_rented}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-medium">
                          ${item.rental_price.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div>
                          <div className="font-semibold">
                            ${(item.replacement_cost * item.quantity_total).toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ${item.replacement_cost.toFixed(2)} each
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={item.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Check Out
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Stock Movement Tracking Section */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowUpDown className="w-5 h-5 text-blue-600" />
              <span>Stock Movement Portal</span>
            </CardTitle>
            <CardDescription>
              Log items checked out for events and track returns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border border-blue-200 bg-white">
                <h4 className="font-semibold mb-4 flex items-center space-x-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span>Check Out Items</span>
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Scan or select items being dispatched for an event. System automatically updates inventory availability.
                </p>
                <Button className="w-full">
                  <Package className="w-4 h-4 mr-2" />
                  Start Check-Out Process
                </Button>
              </div>

              <div className="p-6 rounded-lg border border-green-200 bg-white">
                <h4 className="font-semibold mb-4 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Return Items</span>
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Process item returns with condition assessment. Report damage or loss to generate replacement invoices automatically.
                </p>
                <Button className="w-full" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Process Returns
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
