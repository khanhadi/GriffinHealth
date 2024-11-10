import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  Heart,
  Brain,
  LucideSyringe,
  Gauge,
  Utensils,
  Moon,
  Timer,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

interface HealthMetric {
  icon: React.ElementType;
  label: string;
  value: string;
  unit: string;
  trend?: number;
  status: 'normal' | 'warning' | 'critical';
  time?: string;
}

const healthMetrics: HealthMetric[] = [
  {
    icon: Heart,
    label: 'Heart Rate',
    value: '72',
    unit: 'BPM',
    trend: 1.2,
    status: 'normal',
    time: '2m ago',
  },
  {
    icon: Activity,
    label: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    status: 'normal',
    time: '5m ago',
  },
  {
    icon: LucideSyringe,
    label: 'Oxygen Level',
    value: '98',
    unit: '%',
    status: 'normal',
    time: 'Just now',
  },
  {
    icon: Brain,
    label: 'Stress Level',
    value: 'Low',
    unit: '',
    status: 'normal',
    time: '10m ago',
  },
  {
    icon: Gauge,
    label: 'Blood Glucose',
    value: '95',
    unit: 'mg/dL',
    trend: -2.3,
    status: 'normal',
    time: '15m ago',
  },
  {
    icon: Moon,
    label: 'Sleep Score',
    value: '85',
    unit: '/100',
    status: 'normal',
    time: '6h ago',
  },
  {
    icon: Timer,
    label: 'Recovery Time',
    value: '94',
    unit: '%',
    trend: 5.2,
    status: 'normal',
    time: '1h ago',
  },
  {
    icon: Utensils,
    label: 'Nutrition Score',
    value: '82',
    unit: '/100',
    status: 'warning',
    time: '2h ago',
  },
];

const statusColors = {
  normal:
    'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  warning:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  critical: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
};

export default function HealthOverview() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Health Overview</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Real-time monitoring
            </p>
          </div>
          <Badge variant="outline" className="font-normal">
            Last updated: Just now
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Today's Score */}
          <div className="flex items-center justify-center py-6">
            <div className="relative flex items-center justify-center">
              <svg className="h-32 w-32">
                <circle
                  className="text-muted/20"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="56"
                  cx="64"
                  cy="64"
                />
                <circle
                  className="text-primary"
                  strokeWidth="8"
                  strokeDasharray={350.8}
                  strokeDashoffset={350.8 * (1 - 0.87)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="56"
                  cx="64"
                  cy="64"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <p className="text-3xl font-bold">87%</p>
                <p className="text-sm text-muted-foreground">Health Score</p>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {healthMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="relative rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-lg p-2.5 ${statusColors[metric.status]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {metric.label}
                      </p>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold">
                          {metric.value}
                        </span>
                        {metric.unit && (
                          <span className="mb-1 text-sm text-muted-foreground">
                            {metric.unit}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {metric.trend && (
                          <div
                            className={`flex items-center text-xs ${
                              metric.trend > 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          >
                            {metric.trend > 0 ? (
                              <TrendingUp className="mr-1 h-3 w-3" />
                            ) : (
                              <TrendingDown className="mr-1 h-3 w-3" />
                            )}
                            {Math.abs(metric.trend)}%
                          </div>
                        )}
                        {metric.time && (
                          <span className="text-xs text-muted-foreground">
                            {metric.time}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
