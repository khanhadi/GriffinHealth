import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: number;
  subtitle: string;
  trend: number;
  trendIndicator: 'up' | 'down';
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendIndicator,
  className,
  ...props
}: MetricCardProps) {
  return (
    <Card className={cn('h-[120px] p-4', className)} {...props}>
      <CardContent className="flex h-full flex-col p-0">
        {/* Title */}
        <div className="truncate text-sm font-medium text-muted-foreground">
          {title}
        </div>

        {/* Value */}
        <div className="my-2">
          <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        </div>

        {/* Subtitle and Trend */}
        <div className="mt-auto flex items-center justify-between">
          <p className="max-w-[130px] truncate text-xs text-muted-foreground">
            {subtitle}
          </p>
          <p
            className={cn(
              'ml-2 flex items-center whitespace-nowrap text-xs font-medium',
              trendIndicator === 'up' ? 'text-blue-500' : 'text-red-500'
            )}
          >
            {trend.toFixed(2)}%
            <span className="ml-1">{trendIndicator === 'up' ? '▲' : '▼'}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
