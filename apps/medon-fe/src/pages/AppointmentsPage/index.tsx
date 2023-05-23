import { useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { dayjsLocalizer, Views, Event } from 'react-big-calendar';

import { AppointmentsCard } from 'components/AppointmentsCard';

import { useAppSelector } from 'redux/hooks';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';

import { appointmentCardMock } from 'utils/mock/appointment';

import {
  Container,
  Header,
  UserIcon,
  View,
  ViewItem,
  Title,
  StyledCalendar,
  StyledModal,
  Details,
  ProfileIcon,
  Entity,
  AppointmentContainer,
} from './styles';

const AppointmentsPage = () => {
  const [isMonthView, setIsMonthView] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const user = useAppSelector(getUserSelector);
  const { t } = useTranslation();

  const localizer = dayjsLocalizer(dayjs);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Header>
        <Title>
          <h2>{t('appointments.title')}</h2>
          <UserIcon />
          {
            // TODO: MED-133 populate with real events from db
          }
          <span>20</span>
        </Title>
        <View>
          <ViewItem
            isActive={!isMonthView}
            onClick={() => setIsMonthView(false)}
          >
            {t('appointments.view.list')}
          </ViewItem>
          <ViewItem isActive={isMonthView} onClick={() => setIsMonthView(true)}>
            {t('appointments.view.month')}
          </ViewItem>
        </View>
      </Header>
      {!isMonthView && (
        <AppointmentContainer>
          {appointmentCardMock.map((appointment) => (
            <AppointmentsCard
              key={appointment.id}
              role={user.role?.toString()}
              isLinkAdded={appointment.link === ''}
              {...appointment}
            />
          ))}
        </AppointmentContainer>
      )}

      {
        // TODO: MED-133 populate with real events from db
        isMonthView && (
          <>
            <StyledCalendar
              defaultView={Views.MONTH}
              events={[
                {
                  start: dayjs('2023-05-18T10:00:00').toDate(),
                  end: dayjs('2023-05-18T11:00:00').toDate(),
                  title: 'Appointment title',
                },
              ]}
              localizer={localizer}
              views={[Views.MONTH]}
              selectable
              popup
              step={60}
              timeslots={1}
              onSelectEvent={handleEventClick}
            />
            <StyledModal
              title={selectedEvent?.title}
              centered
              open={isModalOpen}
              onOk={handleCloseModal}
              onCancel={handleCloseModal}
            >
              {
                // TODO: MED-133 integrate with real data
              }
              <Details>
                <span>{t('appointments.details.patient')}</span>
                <Entity>
                  <p>Adam Smith</p>
                  <ProfileIcon />
                </Entity>
                <span>{t('appointments.details.doctor')}</span>
                <p>Local/Dr.Martines</p>
                <span>{t('appointments.details.date')}</span>
                <p>
                  {new Date('2023-05-18T10:00:00').toDateString()}{' '}
                  {t('appointments.details.starts')} 10:00
                </p>
              </Details>
            </StyledModal>
          </>
        )
      }
    </Container>
  );
};

export default AppointmentsPage;
