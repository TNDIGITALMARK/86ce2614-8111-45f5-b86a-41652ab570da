import { supabase, TENANT_ID, PROJECT_ID } from './client';
import type {
  Client,
  InventoryItem,
  Booking,
  BookingItem,
  Invoice,
  StockMovement,
  DamageReport,
  DashboardMetrics,
  AIInsight,
  BookingWithDetails,
  ClientWithStats
} from './types';

// ============================================
// CLIENT QUERIES
// ============================================

export async function getClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Client[];
}

export async function getClientById(id: string) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Client;
}

export async function createClient(client: Omit<Client, 'id' | 'tenantid' | 'projectid' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('clients')
    .insert({
      tenantid: TENANT_ID,
      projectid: PROJECT_ID,
      ...client
    })
    .select()
    .single();

  if (error) throw error;
  return data as Client;
}

export async function updateClient(id: string, updates: Partial<Client>) {
  const { data, error } = await supabase
    .from('clients')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Client;
}

// ============================================
// INVENTORY QUERIES
// ============================================

export async function getInventoryItems() {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('status', 'active')
    .order('name', { ascending: true });

  if (error) throw error;
  return data as InventoryItem[];
}

export async function getAvailableInventory() {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('status', 'active')
    .gt('quantity_available', 0)
    .order('name', { ascending: true });

  if (error) throw error;
  return data as InventoryItem[];
}

export async function getInventoryById(id: string) {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as InventoryItem;
}

export async function updateInventoryQuantity(id: string, quantityChange: number) {
  const item = await getInventoryById(id);

  const { data, error } = await supabase
    .from('inventory_items')
    .update({
      quantity_available: item.quantity_available + quantityChange,
      quantity_rented: item.quantity_rented - quantityChange,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as InventoryItem;
}

// ============================================
// BOOKING QUERIES
// ============================================

export async function getBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, client:clients(*)')
    .order('event_date', { ascending: false });

  if (error) throw error;
  return data as BookingWithDetails[];
}

export async function getUpcomingBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, client:clients(*)')
    .gte('event_date', new Date().toISOString())
    .in('status', ['confirmed', 'in_progress'])
    .order('event_date', { ascending: true });

  if (error) throw error;
  return data as BookingWithDetails[];
}

export async function getBookingById(id: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      client:clients(*),
      items:booking_items(*, inventory_item:inventory_items(*)),
      invoices:invoices(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as BookingWithDetails;
}

export async function createBooking(booking: Omit<Booking, 'id' | 'tenantid' | 'projectid' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      tenantid: TENANT_ID,
      projectid: PROJECT_ID,
      ...booking
    })
    .select()
    .single();

  if (error) throw error;
  return data as Booking;
}

export async function updateBookingStatus(id: string, status: Booking['status']) {
  const { data, error } = await supabase
    .from('bookings')
    .update({
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Booking;
}

// ============================================
// STOCK MOVEMENT QUERIES
// ============================================

export async function createStockMovement(movement: Omit<StockMovement, 'id' | 'tenantid' | 'projectid' | 'created_at'>) {
  const { data, error } = await supabase
    .from('stock_movements')
    .insert({
      tenantid: TENANT_ID,
      projectid: PROJECT_ID,
      ...movement
    })
    .select()
    .single();

  if (error) throw error;
  return data as StockMovement;
}

export async function getStockMovements(inventoryItemId?: string, bookingId?: string) {
  let query = supabase
    .from('stock_movements')
    .select('*, inventory_item:inventory_items(*), booking:bookings(*)')
    .order('created_at', { ascending: false });

  if (inventoryItemId) {
    query = query.eq('inventory_item_id', inventoryItemId);
  }

  if (bookingId) {
    query = query.eq('booking_id', bookingId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

// ============================================
// DAMAGE REPORT QUERIES
// ============================================

export async function createDamageReport(report: Omit<DamageReport, 'id' | 'tenantid' | 'projectid' | 'created_at'>) {
  const { data, error } = await supabase
    .from('damage_reports')
    .insert({
      tenantid: TENANT_ID,
      projectid: PROJECT_ID,
      ...report
    })
    .select()
    .single();

  if (error) throw error;
  return data as DamageReport;
}

export async function getDamageReports(resolved?: boolean) {
  let query = supabase
    .from('damage_reports')
    .select('*, inventory_item:inventory_items(*), booking:bookings(*, client:clients(*))')
    .order('created_at', { ascending: false });

  if (resolved !== undefined) {
    query = query.eq('resolved', resolved);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

// ============================================
// INVOICE QUERIES
// ============================================

export async function getInvoices() {
  const { data, error } = await supabase
    .from('invoices')
    .select('*, booking:bookings(*), client:clients(*)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getOverdueInvoices() {
  const { data, error } = await supabase
    .from('invoices')
    .select('*, booking:bookings(*), client:clients(*)')
    .eq('status', 'overdue')
    .order('due_date', { ascending: true });

  if (error) throw error;
  return data;
}

// ============================================
// DASHBOARD & ANALYTICS
// ============================================

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  // In a real implementation, these would be database queries
  // For MVP, we'll return mock data
  return {
    total_inventory_value: 127500,
    items_currently_rented: 43,
    upcoming_events_this_week: 7,
    outstanding_payments: 3200,
    total_clients: 45,
    revenue_this_month: 18500
  };
}

export async function getAIInsights(): Promise<AIInsight[]> {
  // Mock AI insights - in production, these would come from analytics
  return [
    {
      type: 'trending',
      title: 'Gold Chargers Trending',
      description: 'Gold-rimmed charger plates are up 25% this month',
      priority: 'high',
      metric: '+25%',
      change: 25
    },
    {
      type: 'forecast',
      title: 'Wedding Season Peak',
      description: 'Wedding season approaching - expect 40% booking increase',
      priority: 'high',
      metric: 'Peak: May-June',
      change: 40
    },
    {
      type: 'alert',
      title: 'Low Stock Alert',
      description: 'White linens running low - only 12 sets available',
      priority: 'medium',
      metric: '12 remaining',
      change: -60
    },
    {
      type: 'recommendation',
      title: 'Client Follow-up',
      description: '5 clients haven\'t booked in 6+ months',
      priority: 'low',
      metric: '5 clients',
      change: 0
    }
  ];
}
