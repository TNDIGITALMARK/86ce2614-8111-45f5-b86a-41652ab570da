'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and analytics'
  },
  {
    name: 'Bookings',
    href: '/bookings',
    icon: ShoppingCart,
    description: 'Manage event bookings'
  },
  {
    name: 'Inventory',
    href: '/inventory',
    icon: Package,
    description: 'Track stock and items'
  },
  {
    name: 'Clients',
    href: '/clients',
    icon: Users,
    description: 'Client management'
  },
  {
    name: 'Invoices',
    href: '/invoices',
    icon: FileText,
    description: 'Billing and payments'
  }
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full bg-primary text-primary-foreground">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Décor CRM</h1>
            <p className="text-xs text-sidebar-foreground/60">Rental Management</p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-3 rounded-lg transition-all group',
                isActive
                  ? 'bg-accent text-accent-foreground shadow-md'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <Icon className={cn(
                'w-5 h-5 transition-transform',
                isActive && 'scale-110'
              )} />
              <div className="flex-1">
                <div className={cn(
                  'text-sm font-medium',
                  isActive && 'font-semibold'
                )}>
                  {item.name}
                </div>
                <div className="text-xs opacity-60 hidden xl:block">
                  {item.description}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer / Settings */}
      <div className="p-3 border-t border-sidebar-border">
        <Link
          href="/settings"
          className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>
    </nav>
  );
}
