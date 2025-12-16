'use client';

import { AppLayout } from '@/components/layouts/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Mail,
  Phone,
  Building,
  DollarSign,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { mockClients, getBookingsByClient } from '@/lib/data/mockData';
import { useState } from 'react';

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total spent and average
  const totalRevenue = mockClients.reduce((sum, c) => sum + c.total_spent, 0);
  const avgSpent = totalRevenue / mockClients.length;
  const totalBookings = mockClients.reduce((sum, c) => sum + c.booking_count, 0);

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Client Management</h1>
            <p className="text-muted-foreground text-lg">
              Manage client profiles and relationship history
            </p>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Plus className="w-5 h-5 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Client Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                  <p className="text-2xl font-bold">{mockClients.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/30 bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-gold-gradient">
                    ${totalRevenue.toLocaleString()}
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
                  <p className="text-sm text-muted-foreground">Avg Per Client</p>
                  <p className="text-2xl font-bold">
                    ${Math.round(avgSpent).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{totalBookings}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Clients</CardTitle>
                <CardDescription>Complete client database</CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clients..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Preferred Style</TableHead>
                  <TableHead className="text-center">Bookings</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => {
                  const clientBookings = getBookingsByClient(client.id);

                  return (
                    <TableRow key={client.id} className="hover:bg-secondary/50">
                      <TableCell>
                        <div>
                          <div className="font-semibold">{client.name}</div>
                          {client.notes && (
                            <div className="text-xs text-muted-foreground mt-1 truncate max-w-[200px]">
                              {client.notes}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span>{client.email}</span>
                          </div>
                          {client.phone && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="w-3 h-3 text-muted-foreground" />
                              <span>{client.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {client.company ? (
                          <div className="flex items-center space-x-2">
                            <Building className="w-4 h-4 text-muted-foreground" />
                            <span>{client.company}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {client.preferred_style ? (
                          <Badge variant="outline">{client.preferred_style}</Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold">{client.booking_count}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div>
                          <div className="font-bold text-accent">
                            ${client.total_spent.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ${Math.round(client.total_spent / client.booking_count).toLocaleString()} avg
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Client Insights</CardTitle>
            <CardDescription>Key metrics and patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <h4 className="font-semibold mb-2">Top Client</h4>
                <p className="text-2xl font-bold text-accent">
                  {mockClients.reduce((prev, current) =>
                    prev.total_spent > current.total_spent ? prev : current
                  ).name}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  ${ mockClients.reduce((prev, current) =>
                    prev.total_spent > current.total_spent ? prev : current
                  ).total_spent.toLocaleString()} total spent
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <h4 className="font-semibold mb-2">Most Popular Style</h4>
                <p className="text-2xl font-bold">Modern Minimalist</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Preferred by 40% of clients
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <h4 className="font-semibold mb-2">Repeat Rate</h4>
                <p className="text-2xl font-bold text-green-600">85%</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Clients book multiple times
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
