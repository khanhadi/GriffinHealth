import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { date: 'Mon', deep: 2, light: 4, rem: 1.5 },
  { date: 'Tue', deep: 2.5, light: 3.5, rem: 2 },
  { date: 'Wed', deep: 1.5, light: 4.5, rem: 1.8 },
  { date: 'Thu', deep: 3, light: 3, rem: 2.2 },
  { date: 'Fri', deep: 2.8, light: 3.8, rem: 1.6 },
  { date: 'Sat', deep: 2.2, light: 4.2, rem: 1.9 },
  { date: 'Sun', deep: 2.6, light: 3.6, rem: 2.1 },
];

export default function SleepQualityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="date" className="text-xs font-medium" />
        <YAxis
          className="text-xs font-medium"
          tickFormatter={(value) => `${value}h`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 'var(--radius)',
          }}
          labelClassName="font-medium"
        />
        <Legend
          verticalAlign="top"
          height={36}
          className="text-xs font-medium"
        />
        <Line
          type="monotone"
          dataKey="deep"
          name="Deep Sleep"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{
            fill: 'hsl(var(--primary))',
            strokeWidth: 2,
          }}
        />
        <Line
          type="monotone"
          dataKey="light"
          name="Light Sleep"
          stroke="hsl(var(--secondary))"
          strokeWidth={2}
          dot={{
            fill: 'hsl(var(--secondary))',
            strokeWidth: 2,
          }}
        />
        <Line
          type="monotone"
          dataKey="rem"
          name="REM Sleep"
          stroke="hsl(var(--accent))"
          strokeWidth={2}
          dot={{
            fill: 'hsl(var(--accent))',
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
