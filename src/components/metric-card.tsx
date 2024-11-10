import { TrendingUp, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
  title: string;
  value: number | string;
  trend?: number;
  icon: LucideIcon;
  description?: string;
  unit?: string;
  severity?: 'normal' | 'warning' | 'critical';
  chartData?: Array<{ time: string; value: number }>;
}

export function MetricCard({
  title,
  value,
  trend,
  icon: Icon,
  description,
  unit,
  severity = 'normal',
  chartData,
}: MetricCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`rounded-lg p-2 ${severity === 'normal' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : ''} ${severity === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' : ''} ${severity === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' : ''} `}
            >
              <Icon className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 text-xs ${trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} `}
            >
              <TrendingUp
                className={`h-3 w-3 ${trend < 0 ? 'rotate-180' : ''}`}
              />
              {Math.abs(trend)}%
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold">{value}</div>
            {unit && (
              <div className="text-sm text-muted-foreground">{unit}</div>
            )}
          </div>
          {description && (
            <div className="text-xs text-muted-foreground">{description}</div>
          )}
          {chartData && (
            <div className="h-[60px] pt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
