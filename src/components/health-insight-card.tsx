import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface HealthInsightCardProps {
  title: string;
  value: any;
  trend?: any;
  unit?: string;
  icon: any;
  tooltip: string;
}

const HealthInsightCard: React.FC<HealthInsightCardProps> = ({
  title,
  value,
  trend,
  unit = '',
  icon: Icon,
  tooltip,
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        <div className="flex items-center gap-2">
          {title}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="flex items-baseline space-x-3">
        <div className="text-2xl font-bold">
          {value} {unit}
        </div>
        {trend && (
          <div
            className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            {trend > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

export default HealthInsightCard;
