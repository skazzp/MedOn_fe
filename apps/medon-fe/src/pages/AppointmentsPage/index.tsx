import React, { SyntheticEvent, useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import { dayjsLocalizer, Views } from 'react-big-calendar';
import AppointmentsList from 'components/AppointmentsList';
import {
  Container,
  Header,
  UserIcon,
  View,
  ViewItem,
  Title,
  StyledCalendar,
} from './styles';

const AppointmentsPage = () => {
  const localizer = dayjsLocalizer(dayjs);
  const { t } = useTranslation();
  const [isMonthView, setIsMonthView] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<SyntheticEvent<
    HTMLElement,
    Event
  > | null>(null);

  const handleEventClick = (
    event: object,
    e: SyntheticEvent<HTMLElement, Event>
  ) => {
    console.log(e);
    setSelectedEvent(e);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Header>
        <Title>
          <h2>Appointments</h2>
          <UserIcon />
        </Title>
        <View>
          <ViewItem
            isActive={!isMonthView}
            onClick={() => setIsMonthView(false)}
          >
            List
          </ViewItem>
          <ViewItem isActive={isMonthView} onClick={() => setIsMonthView(true)}>
            Month
          </ViewItem>
        </View>
      </Header>
      {!isMonthView && <AppointmentsList />}
      {isMonthView && (
        <>
          <StyledCalendar
            defaultView={Views.MONTH}
            events={[
              {
                start: dayjs('2023-05-18T10:00:00').toDate(),
                end: dayjs('2023-05-18T11:00:00').toDate(),
                title: 'Appointment',
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
          <Modal
            title="title"
            centered
            open={isModalOpen}
            onOk={handleCloseModal}
            onCancel={handleCloseModal}
          >
            <span>{'additional'}</span>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default AppointmentsPage;
