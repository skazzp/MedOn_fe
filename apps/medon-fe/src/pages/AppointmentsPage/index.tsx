import dayjs from 'dayjs';
import { useTheme } from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dayjsLocalizer, Views, Event } from 'react-big-calendar';
import { Skeleton } from 'antd';

import Button from 'components/Button';
import { AppointmentsCard } from 'components/AppointmentsCard';

import { useModal } from 'hooks/useModal';

import { timeFormat, dateInputFormat, defaultLimit } from 'utils/constants';

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
  ListContainer,
} from './styles';
import {
  useGetCalendarEvents,
  useGetPastAppointmentsCalendarQuery,
  useGetPastAppointmentsListQuery,
} from './hooks';

// TODO: improve Skeleton and add filter to localDoctor

const AppointmentsPage = () => {
  const [isMonthView, setIsMonthView] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [limit, setLimit] = useState<number>(defaultLimit);

  const { t } = useTranslation();
  const theme = useTheme();

  const { data: getPastAppointments } = useGetPastAppointmentsListQuery({
    limit,
  });
  const { data: getPastCalendarAppointments, isFetching: isCalendarFetching } =
    useGetPastAppointmentsCalendarQuery({ skip: !isMonthView });
  const events = useGetCalendarEvents(getPastCalendarAppointments?.data);
  const { hideModal, isVisible, showModal } = useModal(false);

  const localizer = dayjsLocalizer(dayjs);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    showModal();
  };

  if (isCalendarFetching) {
    return <Skeleton />;
  }

  return (
    <Container>
      <Header>
        <Title>
          <h2>{t('appointments.title')}</h2>
          <UserIcon />
          <span>{getPastAppointments?.data?.length}</span>
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
        <ListContainer>
          <AppointmentContainer>
            {getPastAppointments?.data?.map((appointment) => (
              <AppointmentsCard
                key={appointment.id}
                isLinkAdded
                {...appointment}
              />
            ))}
          </AppointmentContainer>
          {Number(getPastAppointments?.data?.length) > limit && (
            <Button
              bgcolor={theme.colors.white}
              textcolor={theme.colors.blue_400}
              onClick={() => setLimit((prev) => prev + limit)}
            >
              {t('appointments.more')}
            </Button>
          )}
        </ListContainer>
      )}
      {isMonthView &&
        (!isCalendarFetching ? (
          <>
            <StyledCalendar
              defaultView={Views.MONTH}
              events={events}
              localizer={localizer}
              views={[Views.MONTH]}
              selectable
              popup
              timeslots={1}
              onSelectEvent={handleEventClick}
            />
            <StyledModal
              title={selectedEvent?.title}
              centered
              open={isVisible}
              onOk={hideModal}
              onCancel={hideModal}
            >
              <Details>
                <span>{t('appointments.details.patient')}</span>
                <Entity>
                  <p>{selectedEvent?.resource?.patient}</p>
                  <ProfileIcon />
                </Entity>
                <span>{t('appointments.details.doctor')}</span>
                <p>
                  {t('appointments.details.local')}{' '}
                  {selectedEvent?.resource?.localDoctor}
                </p>
                <span>{t('appointments.details.doctor')}</span>
                <p>
                  {t('appointments.details.remote')}{' '}
                  {selectedEvent?.resource?.remoteDoctor}
                </p>
                <span>{t('appointments.details.date')}</span>
                <p>
                  {dayjs(selectedEvent?.start).format(dateInputFormat)}{' '}
                  {t('appointments.details.starts')}{' '}
                  {dayjs(selectedEvent?.start).format(timeFormat)}
                </p>
              </Details>
            </StyledModal>
          </>
        ) : (
          <Skeleton />
        ))}
    </Container>
  );
};

export default AppointmentsPage;
