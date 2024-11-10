import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppointmentsList from '@/components/appointments-list';
import type { Appointment } from './appointments-list';

interface AppointmentsTabsProps {
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
}

export default function AppointmentsTabs({
  upcomingAppointments,
  pastAppointments,
}: AppointmentsTabsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>
          View and manage your scheduled appointments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <AppointmentsList appointments={upcomingAppointments} />
          </TabsContent>
          <TabsContent value="past">
            <AppointmentsList appointments={pastAppointments} />
          </TabsContent>
          <TabsContent value="cancelled">
            <div className="py-8 text-center text-muted-foreground">
              No cancelled appointments
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
