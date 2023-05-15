import { useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Views, dayjsLocalizer, Event } from 'react-big-calendar';
import { useTheme } from 'styled-components';

import Link from 'components/Link';

import { eventsCard } from 'utils/mock/patientCalendar';
import { getDateAndHourEvent } from 'utils/functions/getDateAndHourEvent';
import { getDayPropGetter } from 'utils/functions/getDayPropGetter';
import { getEventPropGetter } from 'utils/functions/getEventPropGetter';
import { roles, routes } from 'utils/constants';

import { useAppSelector } from 'redux/hooks';

import Plus from 'assets/svgs/plus_listcard.svg';

import { StyledCalendar, StyledModal, Title } from './styles';
import { useModal } from './hooks';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export function PatientCardCalendar() {
  const [event, setEvent] = useState<Event>();

  const theme = useTheme();
  const { t } = useTranslation();
  const { role } = useAppSelector((state) => state.userState.user);

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
      <Title>
        <h2>{t('patient-card.calendar.title')}</h2>
        {role === roles.local && (
          <Link
            to={`${routes.patientCardAppointment}`}
            bgcolor={theme.colors.btnGradient}
            textcolor={theme.colors.white}
          >
            {t('patient-card.calendar.link')}
            <img src={Plus} alt="Plus svg" />
          </Link>
        )}
      </Title>
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
        title={`${t('patient-card.calendar.prefix-modal')} ${event?.title}`}
        open={isVisible}
        onOk={showModal}
        onCancel={hideModal}
      >
        <p>
          <strong>{t('patient-card.calendar.modal-title')} </strong>
          {event?.title}
        </p>
        <p>
          <strong>{t('patient-card.calendar.modal-start')} </strong>
          {getDateAndHourEvent(event?.start)}
        </p>
        <p>
          <strong>{t('patient-card.calendar.modal-end')} </strong>
          {getDateAndHourEvent(event?.end)}
        </p>
        <p>
          <strong>{t('patient-card.calendar.modal-link')} </strong>
          <Link
            bgcolor={theme.colors.transparent}
            textcolor={theme.colors.blue_300}
            to={event?.resource.link}
          >
            {t('patient-card.calendar.modal-name-link')}
          </Link>
        </p>
      </StyledModal>
    </>
  );
}
