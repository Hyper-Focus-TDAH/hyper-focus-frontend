import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import React from 'react';

function Calendar({ events, dateClick, eventContent }) {
  return (
    <FullCalendar
      themeSystem="bootstrap"
      plugins={[dayGridPlugin, interactionPlugin, bootstrapPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={dateClick}
      eventContent={eventContent}
    />
  );
}

export default Calendar;
