import { useState } from 'react';
import dayjs from 'dayjs';
import { Views, dayjsLocalizer, Event } from 'react-big-calendar';
import { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';

import { eventsCard } from 'utils/mock/patientCalendar';
import { getDateAndHourEvent } from 'utils/functions/getDateAndHourEvent';
import { getDayPropGetter } from 'utils/functions/getDayPropGetter';
import { getEventPropGetter } from 'utils/functions/getEventPropGetter';

import { StyledCalendar, StyledModal } from './styles';
import { useModal } from './hooks';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export function PatientCardCalendar() {
  const [event, setEvent] = useState<Event>();

  const theme = useTheme();

  const { hideModal, isVisible, showModal } = useModal(false);

  const localizer = dayjsLocalizer(dayjs);

  const dayPropGetter = getDayPropGetter(theme);
  const eventPropGetter = getEventPropGetter(theme);

  function handleEventSelect(eventValue: Event) {
    showModal();
    setEvent(eventValue);
  }

  return (
    <>
      <StyledCalendar
        localizer={localizer}
        defaultView="month"
        views={[Views.MONTH, Views.WEEK]}
        // mock
        events={eventsCard}
        dayPropGetter={dayPropGetter}
        eventPropGetter={eventPropGetter}
        onSelectEvent={handleEventSelect}
        popup
        selectable
        step={60}
      />
      <StyledModal
        title={`Appointment ${event?.title}`}
        open={isVisible}
        onOk={showModal}
        onCancel={hideModal}
      >
        <p>
          <strong>Title: </strong>
          {event?.title}
        </p>
        <p>
          <strong>Start Appointment: </strong>
          {getDateAndHourEvent(event?.start)}
        </p>
        <p>
          <strong>End Appointment: </strong>
          {getDateAndHourEvent(event?.end)}
        </p>
        <p>
          <strong>Zoom Link: </strong>
          <Link to={event?.resource.link}>Link</Link>
        </p>
      </StyledModal>
    </>
  );
}
