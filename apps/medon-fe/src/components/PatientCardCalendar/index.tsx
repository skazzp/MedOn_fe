import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Views, dayjsLocalizer, Event } from 'react-big-calendar';
import { useTheme } from 'styled-components';

import Link from 'components/Link';

import { eventsCard } from 'utils/mock/patientCalendar';
import { getDateAndHourEvent } from 'utils/functions/getDateAndHourEvent';
import { getDayPropGetter } from 'utils/functions/getDayPropGetter';
import { getEventPropGetter } from 'utils/functions/getEventPropGetter';
import { roles } from 'utils/constants';

import { useAppSelector } from 'redux/hooks';

import Plus from 'assets/svgs/plus_listcard.svg';

import {
  Dot,
  Legend,
  StyledCalendar,
  StyledModal,
  Subtitle,
  TextSubtitle,
  Title,
} from './styles';
import { useModal } from './hooks';

export function PatientCardCalendar() {
  const [event, setEvent] = useState<Event>();

  const theme = useTheme();
  const { t } = useTranslation();
  const { role } = useAppSelector((state) => state.userState.user);

  const { hideModal, isVisible, showModal } = useModal(false);

  const handleEventSelect = (eventValue: Event) => {
    showModal();
    setEvent(eventValue);
  };

  return (
    <>
      <Title>
        <h2>{t('patient-card.calendar.title')}</h2>
        {role === roles.local && (
          <Link
            to="#"
            bgcolor={theme.colors.btnGradient}
            textcolor={theme.colors.white}
          >
            {t('patient-card.calendar.link')}
            <img src={Plus} alt={`${t('patient-card.alt-image')}`} />
          </Link>
        )}
      </Title>
      <StyledCalendar
        localizer={dayjsLocalizer(dayjs)}
        defaultView={Views.WEEK}
        views={[Views.WEEK]}
        // mock
        events={eventsCard}
        dayPropGetter={getDayPropGetter}
        eventPropGetter={getEventPropGetter}
        onSelectEvent={handleEventSelect}
        popup
        selectable
        timeslots={1}
        step={60}
      />
      <Legend>
        <legend>{t('patient-card.calendar.legend-title')}</legend>
        <Subtitle>
          <Dot color={theme.colors.purple} />
          <TextSubtitle>
            {t('patient-card.calendar.appointment-you')}
          </TextSubtitle>
        </Subtitle>
        <Subtitle>
          <Dot color={theme.colors.blue_500} />
          <TextSubtitle>
            {t('patient-card.calendar.appointment-others')}
          </TextSubtitle>
        </Subtitle>
      </Legend>
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
