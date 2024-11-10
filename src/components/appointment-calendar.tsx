import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface Appointment {
  time: string;
  patient: string;
  type: string;
}

interface AppointmentsByDate {
  [date: string]: Appointment[];
}

interface AppointmentCalendarProps {
  /** Initial date to show selected in the calendar */
  initialDate?: Date;
  /** Custom appointments data */
  appointments?: AppointmentsByDate;
  /** Callback when a date is selected */
  onDateSelect?: (date: Date) => void;
  /** Callback when an appointment is clicked */
  onAppointmentClick?: (appointment: Appointment) => void;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  initialDate = new Date(),
  appointments = {
    '2024-11-10': [
      { time: '09:00', patient: 'John Smith', type: 'Follow-up' },
      { time: '10:30', patient: 'Sarah Johnson', type: 'Check-up' },
    ],
    '2024-11-11': [
      { time: '14:00', patient: 'Michael Chen', type: 'Urgent Care' },
    ],
    '2024-11-12': [
      { time: '11:00', patient: 'Emma Davis', type: 'Regular Check-up' },
      { time: '15:30', patient: 'James Wilson', type: 'Follow-up' },
    ],
  },
  onDateSelect,
  onAppointmentClick,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  // Generate dates for the current week
  const getWeekDates = (): Date[] => {
    const dates: Date[] = [];
    const currentDate = new Date();
    const firstDay = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay())
    );

    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const getAppointmentsForDate = (date: Date): Appointment[] => {
    return appointments[formatDate(date)] || [];
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    onAppointmentClick?.(appointment);
  };

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
        {weekDates.map((date) => (
          <Button
            key={date.toISOString()}
            variant={
              formatDate(date) === formatDate(selectedDate)
                ? 'default'
                : 'outline'
            }
            className="h-20 flex-col p-2"
            onClick={() => handleDateSelect(date)}
          >
            <span className="text-sm">{date.getDate()}</span>
            <div className="mt-1">
              {getAppointmentsForDate(date).length > 0 && (
                <div className="flex items-center justify-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span className="text-xs">
                    {getAppointmentsForDate(date).length}
                  </span>
                </div>
              )}
            </div>
          </Button>
        ))}
      </div>

      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">
            Appointments for {selectedDate.toLocaleDateString()}
          </h3>
          <div className="space-y-2">
            {getAppointmentsForDate(selectedDate).map((apt, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center justify-between rounded-lg border p-2 text-sm hover:bg-muted/50"
                onClick={() => handleAppointmentClick(apt)}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{apt.time}</span>
                  <span>{apt.patient}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {apt.type}
                </span>
              </div>
            ))}
            {getAppointmentsForDate(selectedDate).length === 0 && (
              <div className="text-center text-sm text-muted-foreground">
                No appointments scheduled
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AppointmentCalendar;
