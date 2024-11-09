'use client';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from '@/components/ui/chart';

const SleepAnalysis = () => {
  const data = [
    { name: 'Awake', value: 180 },
    { name: 'REM', value: 100 },
    { name: 'Core', value: 50 },
    { name: 'Deep', value: 25 },
  ];

  const chartConfig = {
    Awake: {
      label: 'Awake',
      color: 'hsl(var(--chart-1))',
    },
    REM: {
      label: 'REM',
      color: 'hsl(var(--chart-2))',
    },
    Core: {
      label: 'Core',
      color: 'hsl(var(--chart-3))',
    },
    Deep: {
      label: 'Deep',
      color: 'hsl(var(--chart-3))',
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-[220px] w-[400px] p-3">
      <BarChart data={data} width={180} height={160}>
        <CartesianGrid vertical={false} stroke="#e5e7eb" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fontWeight: 500, fill: '#374151' }}
        />
        <YAxis
          type="number"
          domain={[0, 'dataMax']}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fontWeight: 500, fill: '#374151' }}
          label={{
            value: 'Minutes',
            angle: -90,
            position: 'insideLeft',
            fontSize: 11,
          }}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend
          content={<ChartLegendContent />}
          wrapperStyle={{ fontSize: 11, fontWeight: 500, color: '#374151' }}
        />
        <Bar dataKey="value" fill="var(--color-deep)" radius={4} barSize={25} />
      </BarChart>
    </ChartContainer>
  );
};

export default SleepAnalysis;
