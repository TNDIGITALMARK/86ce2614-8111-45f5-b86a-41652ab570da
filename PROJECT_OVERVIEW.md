# Décor Rental CRM - AI-Powered Management System

## 🎯 Overview

A modern, AI-powered CRM system tailored for décor rental companies. This platform centralizes inventory management, client relationships, booking workflows, and financial tracking in a sophisticated, user-friendly interface.

## ✨ Key Features

### 📊 **Smart Dashboard**
- Real-time inventory value tracking ($127,500+ total value)
- Live metrics for rented items, upcoming events, and outstanding payments
- AI-powered insights with trending items and seasonal forecasting
- Upcoming events calendar with preparation tracking
- Quick stats on clients, inventory, and monthly revenue

### 🛍️ **Client Booking Portal**
- Complete booking lifecycle management (pending → confirmed → in progress → completed)
- Client profile integration with booking history
- Event details tracking (date, location, items)
- Payment status monitoring (unpaid, partial, paid, overdue)
- Search and filter capabilities across all bookings

### 📦 **Inventory Command Center**
- Real-time stock availability tracking
- Low stock alerts (automatic warnings at 25% threshold)
- Item categorization (Chargers, Linens, Centerpieces, Decorative)
- Check-out/check-in workflow for event preparation
- Rental pricing and replacement cost tracking
- Total inventory value calculation

### 👥 **Client Management**
- Comprehensive client database with contact details
- Booking history and spending analytics
- Preferred style tracking (Modern, Classic, Rustic, etc.)
- Company affiliation management
- Client insights and metrics

### 💰 **Invoice & Payment Tracking**
- Automated invoice generation linked to bookings
- Payment status monitoring (paid, partial, unpaid, overdue)
- Deposit and balance due tracking
- Financial overview dashboard
- Secure payment portal integration (ready for Stripe)
- Automatic damage/replacement invoice generation

## 🎨 Design System

### Color Palette
- **Primary**: Deep Navy (`hsl(220 50% 20%)`) - Professional luxury tone
- **Accent**: Gold (`hsl(45 100% 50%)`) - Luxury highlights and CTAs
- **Background**: Light blue-gray (`hsl(210 100% 98%)`) - Clean, spacious feel
- **Cards**: Pure white (`hsl(0 0% 100%)`) - Crisp content areas

### Typography
- **Primary Font**: Inter (Google Fonts) - Modern, highly readable
- **Weight Range**: 400 (regular) to 800 (extra bold)
- **Hierarchy**: Clear heading scale from 2.5rem (h1) to 1rem (h6)

### Component Design
- Sophisticated rounded corners (0.5rem radius)
- Subtle shadows for depth and elevation
- Gold gradient text for premium metrics
- Status badges with color-coded states
- Hover effects and smooth transitions

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/page.tsx          # Main dashboard with AI insights
│   ├── bookings/page.tsx           # Booking management
│   ├── inventory/page.tsx          # Inventory tracking
│   ├── clients/page.tsx            # Client database
│   ├── invoices/page.tsx           # Financial management
│   ├── layout.tsx                  # Root layout with providers
│   ├── globals.css                 # Design system CSS
│   └── page.tsx                    # Redirects to dashboard
├── components/
│   ├── layouts/
│   │   └── AppLayout.tsx           # Main app wrapper with sidebar
│   ├── navigation/
│   │   └── MainNav.tsx             # Sidebar navigation
│   └── ui/
│       ├── metric-card.tsx         # Dashboard metric cards
│       ├── status-badge.tsx        # Status indicators
│       └── [shadcn components]     # Button, Card, Table, etc.
├── lib/
│   ├── data/
│   │   └── mockData.ts             # Sample data for demo
│   ├── supabase/
│   │   ├── client.ts               # Supabase configuration
│   │   ├── types.ts                # TypeScript interfaces
│   │   └── queries.ts              # Database query functions
│   └── utils.ts                    # Utility functions
```

## 🚀 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS 4 + Custom CSS Variables
- **UI Components**: Radix UI primitives + shadcn/ui
- **Database**: Supabase (PostgreSQL with RLS)
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter family)

## 🔧 Database Schema

### Tables
- **clients**: Client profiles with contact info and preferences
- **inventory_items**: Rental items with availability tracking
- **bookings**: Event bookings with dates and status
- **booking_items**: Line items linking bookings to inventory
- **invoices**: Financial records with payment tracking
- **stock_movements**: Check-out/check-in logs with conditions
- **damage_reports**: Damage/loss tracking with replacement costs

All tables include:
- Multi-tenant isolation (`tenantid`, `projectid`)
- Row Level Security (RLS) policies
- Automatic timestamps
- Foreign key relationships

## 📊 Mock Data Highlights

### Sample Clients
- Sarah Martinez (Elite Events Planning) - $8,400 spent, 12 bookings
- Michael Chen (Corporate Events) - $12,500 spent, 8 bookings
- Emily Johnson (Dream Weddings) - $15,200 spent, 15 bookings

### Sample Inventory
- Gold-Rimmed Charger Plates: 48 total (16 available, 32 rented) @ $2.00/each
- White Linen Tablecloths: 80 total (12 available, 68 rented) @ $12.00/each
- Crystal Vase Centerpieces: 60 total (45 available, 15 rented) @ $8.00/each
- Gold Candelabras: 24 total (20 available, 4 rented) @ $18.00/each

### Sample Bookings
- Martinez Wedding (June 15, 2025) - $1,250 | Confirmed | Partial Payment
- Tech Corp Annual Gala (Dec 20, 2025) - $3,500 | Confirmed | Partial Payment
- Johnson-Smith Reception (Dec 18, 2025) - $2,100 | In Progress | Partial Payment

## 🎯 AI-Powered Insights

The system provides intelligent analytics:
- **Trending Items**: Identifies items with increased demand (+25% gold chargers)
- **Seasonal Forecasts**: Predicts booking peaks (wedding season May-June, +40% expected)
- **Stock Alerts**: Warns of low inventory (white linens: 12 remaining)
- **Client Patterns**: Analyzes booking frequency and style preferences

## 🔐 Security Features

- Row Level Security (RLS) on all database tables
- Tenant/project isolation for multi-tenant architecture
- Secure authentication tokens (45-minute lifetime)
- Automatic data filtering by tenant and project
- FK constraints preventing orphaned records

## 📱 Responsive Design

- Desktop-optimized layout with persistent sidebar
- Tablet-friendly responsive grid systems
- Mobile-ready navigation (sidebar hidden on mobile, accessible via menu)
- Touch-friendly controls and spacing
- Adaptive table layouts for smaller screens

## 🚀 Future Enhancement Opportunities

1. **Advanced Features**
   - Real barcode scanning for check-out/in
   - Photo upload for damage documentation
   - Stripe payment integration
   - Email invoice delivery
   - PDF invoice generation
   - Real-time notifications

2. **Analytics Expansion**
   - Predictive inventory purchasing
   - Dynamic pricing optimization
   - Client lifetime value calculations
   - Revenue forecasting

3. **Integration Capabilities**
   - QuickBooks for accounting
   - Marketing automation platforms
   - SMS notifications for event reminders
   - Calendar sync (Google Calendar, Outlook)

## 🎨 Brand Identity

**Logo Concept**: Gold trending-up arrow on navy background
**Tagline**: "Rental Management"
**Color Psychology**:
- Navy = Trust, professionalism, stability
- Gold = Luxury, quality, premium service
- White = Cleanliness, simplicity, clarity

## 📈 Business Value

This CRM transforms décor rental operations by:
- **Preventing Double-Bookings**: Real-time inventory availability
- **Reducing Lost Inventory**: Complete check-out/check-in tracking
- **Improving Cash Flow**: Automated invoicing and payment tracking
- **Enhancing Client Relationships**: Complete history and preferences
- **Optimizing Inventory**: AI insights for purchasing decisions
- **Saving Time**: Automated workflows eliminate manual processes

---

**Built with precision. Designed for luxury. Engineered for growth.**
