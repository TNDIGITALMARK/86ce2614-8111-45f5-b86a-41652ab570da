import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
  variant?: 'default' | 'gold' | 'success' | 'warning';
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  variant = 'default'
}: MetricCardProps) {
  const variantStyles = {
    default: 'border-border',
    gold: 'border-accent/30 bg-accent/5',
    success: 'border-green-200 bg-green-50',
    warning: 'border-amber-200 bg-amber-50'
  };

  const iconStyles = {
    default: 'text-primary',
    gold: 'text-accent',
    success: 'text-green-600',
    warning: 'text-amber-600'
  };

  return (
    <Card className={cn(
      'transition-all hover:shadow-lg',
      variantStyles[variant],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center',
            variant === 'gold' ? 'bg-accent/10' : 'bg-secondary'
          )}>
            <Icon className={cn('w-5 h-5', iconStyles[variant])} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className={cn(
            'text-3xl font-bold',
            variant === 'gold' && 'text-gold-gradient'
          )}>
            {value}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
          {trend && (
            <div className="flex items-center text-xs mt-2">
              <span className={cn(
                'font-medium',
                trend.value > 0 ? 'text-green-600' : 'text-red-600'
              )}>
                {trend.value > 0 ? '+' : ''}{trend.value}%
              </span>
              <span className="text-muted-foreground ml-1">{trend.label}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
