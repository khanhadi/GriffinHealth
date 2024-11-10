import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Video, Clock, Calendar, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Doctor {
  name: string;
  specialty: string;
  image: string;
}

export interface Appointment {
  id: number;
  doctor: Doctor;
  date: string;
  time: string;
  type: 'video' | 'in-person';
  location: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  duration: string;
}

interface AppointmentsListProps {
  appointments: Appointment[];
}

const statusStyles: Record<Appointment['status'], string> = {
  confirmed:
    'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  pending:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
};

export default function AppointmentsList({
  appointments,
}: AppointmentsListProps) {
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12">
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
                <div className="space-y-1">
                  <h4 className="font-semibold">{appointment.doctor.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {appointment.doctor.specialty}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge
                  variant="secondary"
                  className={statusStyles[appointment.status]}
                >
                  {appointment.status.charAt(0).toUpperCase() +
                    appointment.status.slice(1)}
                </Badge>
                <div className="flex items-center gap-2">
                  {appointment.type === 'video' ? (
                    <Button variant="outline" size="sm">
                      <Video className="mr-2 h-4 w-4" />
                      Join Call
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <MapPin className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              {appointment.type === 'video' ? (
                <Video className="h-4 w-4" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
              <span>{appointment.location}</span>
              <span>•</span>
              <span>{appointment.duration}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
