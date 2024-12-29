import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useStore } from '../../store';
import { format } from 'date-fns';

export function Calendar() {
  const { communications, companies, communicationMethods } = useStore();

  const events = communications.map(comm => {
    const company = companies.find(c => c.id === comm.companyId);
    const method = communicationMethods.find(m => m.id === comm.methodId);
    return {
      id: comm.id,
      title: `${company?.name} - ${method?.name}`,
      date: comm.date,
      backgroundColor: comm.completed ? '#10B981' : '#3B82F6',
      extendedProps: {
        notes: comm.notes,
        completed: comm.completed
      }
    };
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Communication Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={(eventInfo) => (
          <div className="p-1">
            <div className="text-xs font-semibold">{eventInfo.event.title}</div>
            {eventInfo.event.extendedProps.notes && (
              <div className="text-xs truncate">{eventInfo.event.extendedProps.notes}</div>
            )}
          </div>
        )}
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek'
        }}
      />
    </div>
  );
}