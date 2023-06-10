import '@fortawesome/fontawesome-free/css/all.css';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import React from 'react';

function Calendar({ events, dateClick, eventClick, eventContent }) {
  return (
    <FullCalendar
      themeSystem="bootstrap"
      plugins={[dayGridPlugin, interactionPlugin, bootstrapPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={dateClick}
      eventClick={eventClick}
      eventContent={eventContent}
    />
  );
}

export default Calendar;
