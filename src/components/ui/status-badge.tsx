import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'confirmed' | 'pending' | 'in_progress' | 'completed' | 'cancelled' |
          'paid' | 'partial' | 'unpaid' | 'overdue' |
          'active' | 'maintenance' | 'retired';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles = {
    // Booking statuses
    confirmed: 'bg-green-100 text-green-700 border-green-300',
    pending: 'bg-amber-100 text-amber-700 border-amber-300',
    in_progress: 'bg-blue-100 text-blue-700 border-blue-300',
    completed: 'bg-gray-100 text-gray-700 border-gray-300',
    cancelled: 'bg-red-100 text-red-700 border-red-300',

    // Payment statuses
    paid: 'bg-green-100 text-green-700 border-green-300',
    partial: 'bg-amber-100 text-amber-700 border-amber-300',
    unpaid: 'bg-gray-100 text-gray-700 border-gray-300',
    overdue: 'bg-red-100 text-red-700 border-red-300',

    // Inventory statuses
    active: 'bg-green-100 text-green-700 border-green-300',
    maintenance: 'bg-amber-100 text-amber-700 border-amber-300',
    retired: 'bg-gray-100 text-gray-700 border-gray-300'
  };

  const labels = {
    confirmed: 'Confirmed',
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    paid: 'Paid',
    partial: 'Partial Payment',
    unpaid: 'Unpaid',
    overdue: 'Overdue',
    active: 'Active',
    maintenance: 'Maintenance',
    retired: 'Retired'
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      styles[status],
      className
    )}>
      {labels[status]}
    </span>
  );
}
