import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, Clock } from 'lucide-react';
import type { Appointment } from './appointments-list';

interface NextAppointmentCardProps {
  appointment: Appointment;
}

export default function NextAppointmentCard({
  appointment,
}: NextAppointmentCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
        <CalendarDays className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={appointment.doctor.image}
              alt={appointment.doctor.name}
            />
            <AvatarFallback>
              {appointment.doctor.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{appointment.doctor.name}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>
                {new Date(appointment.date).toLocaleDateString()},{' '}
                {appointment.time}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
