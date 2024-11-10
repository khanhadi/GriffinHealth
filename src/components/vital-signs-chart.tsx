import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const heartRateData = [
  { time: '00:00', value: 62 },
  { time: '04:00', value: 58 },
  { time: '08:00', value: 71 },
  { time: '12:00', value: 75 },
  { time: '16:00', value: 68 },
  { time: '20:00', value: 65 },
  { time: '23:59', value: 60 },
];

const bloodPressureData = [
  { time: '00:00', systolic: 118, diastolic: 75 },
  { time: '04:00', systolic: 115, diastolic: 72 },
  { time: '08:00', systolic: 120, diastolic: 78 },
  { time: '12:00', systolic: 125, diastolic: 82 },
  { time: '16:00', systolic: 122, diastolic: 80 },
  { time: '20:00', systolic: 118, diastolic: 76 },
  { time: '23:59', systolic: 116, diastolic: 74 },
];

export default function VitalSignsChart() {
  return (
    <Tabs defaultValue="heart">
      <TabsList className="mb-4">
        <TabsTrigger value="heart">Heart Rate</TabsTrigger>
        <TabsTrigger value="bp">Blood Pressure</TabsTrigger>
        <TabsTrigger value="temp">Temperature</TabsTrigger>
      </TabsList>
      <TabsContent value="heart" className="mt-0 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={heartRateData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[50, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ff6b6b"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="bp" className="mt-0 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={bloodPressureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[40, 160]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="systolic"
              stroke="#4a90e2"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  );
}
