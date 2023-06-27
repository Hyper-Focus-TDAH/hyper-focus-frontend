import '@fortawesome/fontawesome-free/css/all.css';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

function Calendar({ events, dateClick, eventClick, eventContent }) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const calendarRef = useRef(null);

  useEffect(() => {
    calendarRef.current
      .getApi()
      .changeView(isMobile ? 'listWeek' : 'dayGridMonth');

    calendarRef.current.headerToolbar = isMobile
      ? mobileToolbar
      : desktopToolbar;
  }, [isMobile]);

  const mobileToolbar = {
    left: '',
    center: 'title',
    right: '',
  };

  const desktopToolbar = {
    right: 'prev,next today',
    left: 'title',
  };

  return (
    <FullCalendar
      ref={calendarRef}
      themeSystem="bootstrap"
      plugins={[dayGridPlugin, listPlugin, interactionPlugin, bootstrapPlugin]}
      initialView={isMobile ? 'listWeek' : 'dayGridMonth'}
      headerToolbar={isMobile ? mobileToolbar : desktopToolbar}
      events={events}
      dateClick={dateClick}
      eventClick={eventClick}
      eventContent={eventContent}
    />
  );
}

export default Calendar;
