import type {
  Client,
  InventoryItem,
  Booking,
  BookingWithDetails,
  ClientWithStats,
  InventoryItemWithAvailability
} from '../supabase/types';

// ============================================
// MOCK CLIENTS
// ============================================

export const mockClients: Client[] = [
  {
    id: 'client-1',
    tenantid: 'q5HWUfnU7vXnDeHWKLWe0aHucZt1',
    projectid: '86ce2614-8111-45f5-b86a-41652ab570da',
    name: 'Sarah Martinez',
    email: 'sarah.martinez@example.com',
    phone: '(555) 234-5678',
    company: 'Elite Events Planning',
    preferred_style: 'Modern Minimalist',
    total_spent: 8400,
    booking_count: 12,
    notes: 'Prefers gold accents and white linens',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-12-01T10:00:00Z'
  },
  {
    id: 'client-2',
    tenantid: 'q5HWUfnU7vXnDeHWKLWe0aHucZt1',
    projectid: '86ce2614-8111-45f5-b86a-41652ab570da',
    name: 'Michael Chen',
    email: 'mchen@corporateevents.com',
    phone: '(555) 345-6789',
    company: 'Chen Corporate Events',
    preferred_style: 'Classic Elegant',
    total_spent: 12500,
    booking_count: 8,
    notes: 'Large corporate events, requires volume discounts',
    created_at: '2024-03-20T10:00:00Z',
    updated_at: '2024-11-15T10:00:00Z'
  },
  {
    id: 'client-3',
    tenantid: 'q5HWUfnU7vXnDeHWKLWe0aHucZt1',
    projectid: '86ce2614-8111-45f5-b86a-41652ab570da',
    name: 'Emily Johnson',
    email: 'emily.j@dreamweddings.com',
    phone: '(555) 456-7890',
    company: 'Dream Weddings Co',
    preferred_style: 'Rustic Chic',
    total_spent: 15200,
    booking_count: 15,
    notes: 'Wedding specialist, books 3-6 months in advance',
    created_at: '2023-09-10T10:00:00Z',
    updated_at: '2024-12-10T10:00:00Z'
  }
];

// ============================================
// MOCK INVENTORY ITEMS
// ============================================

export const mockInventory: InventoryItem[] = [
  {
    id: 'item-1',
    tenantid: 'q5HWUfnU7vXnDeHWKLWe0aHucZt1',
    projectid: '86ce2614-8111-45f5-b86a-41652ab570da',
    name: 'Gold-Rimmed Charger Plates',
    description: 'Elegant 13-inch charger plates with gold rim detail',
    category: 'Chargers',
    quantity_total: 48,
    quantity_available: 16,
    quantity_rented: 32,
    rental_price: 2.00,
    replacement_cost: 15.00,
    image_url: null,
    sku: 'CHG-GOLD-001',
    status: 'active',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z'
  },
  {
    id: 'item-2',
    tenantid: 'q5HWUfnU7vXnDeHWKLWe0aHucZt1',
    projectid: '86ce2614-8111-45f5-b86a-41652ab570da',
    name: 'White Linen Tablecloths (120" Round)',
    description: 'Premium white polyester tablecloths for 60-inch round tables',
    category: 'Linens',
    quantity_total: 80,
    quantity_available: 12,
    quantity_rented: 68,
    rental_price: 12.00,
    replacement_cost: 45.00,
    image_url: null,
    sku: 'LIN-WHT-120',
    status: 'active',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z'
  },
  {
    id: 'item-3',
    tenantid: 'q5HWUfnU7vXnDeHWKLWe0aHucZt1',
    projectid: '86ce2614-8111-45f5-b86a-41652ab570da',
    name: 'Crystal Vase Centerpieces',
    description: 'Tall crystal vases perfect for floral arrangements',
    category: 'Centerpieces',
    quantity_total: 60,
    quantity_available: 45,
    quantity_rented: 15,
    rental_price: 8.00,
    replacement_cost: 35.00,
    image_url: null,
    sku: 'CTR-CRY-001',
    status: 'active',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z'
  },
  {
    id: 'item-4',
    tenantid: 'q5HWUfnU7vXnDeHWKLWe0aHucZt1',
    projectid: '86ce2614-8111-45f5-b86a-41652ab570da',
    name: 'Gold Candelabra (5-Arm)',
    description: 'Elegant gold-finished candelabra with 5 candle holders',
    category: 'Decorative',
    quantity_total: 24,
    quantity_available: 20,
    quantity_rented: 4,
    rental_price: 18.00,
    replacement_cost: 85.00,
    image_url: null,
    sku: 'DEC-CAN-GOLD',
    status: 'active',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z'
  },
  {
    id: 'item-5',
    tenantid: 'q5HWUfnU7vXnDeHWKLWe0aHucZt1',
    projectid: '86ce2614-8111-45f5-b86a-41652ab570da',
    name: 'Navy Blue Table Runners',
    description: '108-inch polyester table runners in deep navy blue',
    category: 'Linens',
    quantity_total: 100,
    quantity_available: 75,
    quantity_rented: 25,
    rental_price: 5.00,
    replacement_cost: 18.00,
    image_url: null,
    sku: 'LIN-RUN-NAVY',
    status: 'active',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z'
  }
];

// ============================================
// MOCK BOOKINGS
// ============================================

export const mockBookings: BookingWithDetails[] = [
  {
    id: 'booking-1',
    tenantid: 'q5HWUfnU7vXnDeHWKLWe0aHucZt1',
    projectid: '86ce2614-8111-45f5-b86a-41652ab570da',
    client_id: 'client-1',
    event_name: 'Martinez Wedding',
    event_date: '2025-06-15T18:00:00Z',
    event_location: 'Grand Hotel Ballroom',
    status: 'confirmed',
    subtotal: 1250.00,
    deposit_amount: 500.00,
    deposit_paid: true,
    total_amount: 1250.00,
    balance_due: 750.00,
    payment_status: 'partial',
    notes: 'Setup required by 3 PM',
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2024-12-10T10:00:00Z',
    client: mockClients[0]
  },
  {
    id: 'booking-2',
    tenantid: 'q5HWUfnU7vXnDeHWKLWe0aHucZt1',
    projectid: '86ce2614-8111-45f5-b86a-41652ab570da',
    client_id: 'client-2',
    event_name: 'Tech Corp Annual Gala',
    event_date: '2025-12-20T19:00:00Z',
    event_location: 'Convention Center',
    status: 'confirmed',
    subtotal: 3500.00,
    deposit_amount: 1400.00,
    deposit_paid: true,
    total_amount: 3500.00,
    balance_due: 2100.00,
    payment_status: 'partial',
    notes: 'VIP section needs gold accents',
    created_at: '2024-11-15T10:00:00Z',
    updated_at: '2024-12-05T10:00:00Z',
    client: mockClients[1]
  },
  {
    id: 'booking-3',
    tenantid: 'q5HWUfnU7vXnDeHWKLWe0aHucZt1',
    projectid: '86ce2614-8111-45f5-b86a-41652ab570da',
    client_id: 'client-3',
    event_name: 'Johnson-Smith Wedding Reception',
    event_date: '2025-12-18T17:00:00Z',
    event_location: 'Riverside Gardens',
    status: 'in_progress',
    subtotal: 2100.00,
    deposit_amount: 1050.00,
    deposit_paid: true,
    total_amount: 2100.00,
    balance_due: 1050.00,
    payment_status: 'partial',
    notes: 'Rustic theme - browns and golds',
    created_at: '2024-10-20T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z',
    client: mockClients[2]
  },
  {
    id: 'booking-4',
    tenantid: 'q5HWUfnU7vXnDeHWKLWe0aHucZt1',
    projectid: '86ce2614-8111-45f5-b86a-41652ab570da',
    client_id: 'client-1',
    event_name: 'Corporate Holiday Party',
    event_date: '2025-12-22T18:00:00Z',
    event_location: 'Downtown Event Space',
    status: 'confirmed',
    subtotal: 1800.00,
    deposit_amount: 900.00,
    deposit_paid: false,
    total_amount: 1800.00,
    balance_due: 1800.00,
    payment_status: 'unpaid',
    notes: 'Payment overdue - follow up required',
    created_at: '2024-11-01T10:00:00Z',
    updated_at: '2024-12-14T10:00:00Z',
    client: mockClients[0]
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getClientById(id: string): Client | undefined {
  return mockClients.find(c => c.id === id);
}

export function getInventoryById(id: string): InventoryItem | undefined {
  return mockInventory.find(i => i.id === id);
}

export function getBookingById(id: string): BookingWithDetails | undefined {
  return mockBookings.find(b => b.id === id);
}

export function getUpcomingBookings(): BookingWithDetails[] {
  const now = new Date();
  return mockBookings
    .filter(b => new Date(b.event_date) >= now && ['confirmed', 'in_progress'].includes(b.status))
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
}

export function getBookingsByClient(clientId: string): BookingWithDetails[] {
  return mockBookings.filter(b => b.client_id === clientId);
}

export function calculateInventoryValue(): number {
  return mockInventory.reduce((total, item) => {
    return total + (item.replacement_cost * item.quantity_total);
  }, 0);
}
