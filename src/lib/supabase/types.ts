// Database types for the Décor Rental CRM

export interface Client {
  id: string;
  tenantid: string;
  projectid: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  preferred_style: string | null; // modern, classic, rustic, minimalist, etc.
  total_spent: number;
  booking_count: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface InventoryItem {
  id: string;
  tenantid: string;
  projectid: string;
  name: string;
  description: string | null;
  category: string; // chargers, vases, linens, centerpieces, etc.
  quantity_total: number;
  quantity_available: number;
  quantity_rented: number;
  rental_price: number;
  replacement_cost: number;
  image_url: string | null;
  sku: string | null;
  status: 'active' | 'maintenance' | 'retired';
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  tenantid: string;
  projectid: string;
  client_id: string;
  event_name: string;
  event_date: string;
  event_location: string | null;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  subtotal: number;
  deposit_amount: number;
  deposit_paid: boolean;
  total_amount: number;
  balance_due: number;
  payment_status: 'unpaid' | 'partial' | 'paid' | 'overdue';
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookingItem {
  id: string;
  tenantid: string;
  projectid: string;
  booking_id: string;
  inventory_item_id: string;
  quantity: number;
  rental_price: number;
  line_total: number;
  checked_out: boolean;
  checked_out_at: string | null;
  checked_in: boolean;
  checked_in_at: string | null;
  created_at: string;
}

export interface Invoice {
  id: string;
  tenantid: string;
  projectid: string;
  booking_id: string;
  client_id: string;
  invoice_number: string;
  invoice_type: 'rental' | 'damage' | 'replacement';
  subtotal: number;
  tax: number;
  total: number;
  amount_paid: number;
  balance_due: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  due_date: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface StockMovement {
  id: string;
  tenantid: string;
  projectid: string;
  inventory_item_id: string;
  booking_id: string | null;
  movement_type: 'checkout' | 'return' | 'damage' | 'loss';
  quantity: number;
  condition: 'excellent' | 'good' | 'fair' | 'damaged' | 'lost';
  notes: string | null;
  staff_name: string | null;
  photo_url: string | null;
  created_at: string;
}

export interface DamageReport {
  id: string;
  tenantid: string;
  projectid: string;
  booking_id: string;
  inventory_item_id: string;
  damage_type: 'broken' | 'stained' | 'missing' | 'scratched' | 'other';
  quantity_affected: number;
  replacement_cost: number;
  description: string;
  photo_url: string | null;
  invoice_id: string | null; // Links to generated replacement invoice
  resolved: boolean;
  created_at: string;
  resolved_at: string | null;
}

// Extended types with relations
export interface ClientWithStats extends Client {
  recent_bookings?: Booking[];
  outstanding_balance?: number;
}

export interface BookingWithDetails extends Booking {
  client?: Client;
  items?: (BookingItem & { inventory_item?: InventoryItem })[];
  invoices?: Invoice[];
}

export interface InventoryItemWithAvailability extends InventoryItem {
  upcoming_rentals?: { event_date: string; quantity: number }[];
}

// Dashboard metrics
export interface DashboardMetrics {
  total_inventory_value: number;
  items_currently_rented: number;
  upcoming_events_this_week: number;
  outstanding_payments: number;
  total_clients: number;
  revenue_this_month: number;
}

// AI Insights
export interface AIInsight {
  type: 'trending' | 'forecast' | 'alert' | 'recommendation';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  metric?: string;
  change?: number;
}
