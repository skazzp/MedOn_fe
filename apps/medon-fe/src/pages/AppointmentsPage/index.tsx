import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { dayjsLocalizer, Views } from 'react-big-calendar';
import {
  Container,
  Header,
  UserIcon,
  View,
  ViewItem,
  Title,
  StyledCalendar,
} from './styles';
import AppointmentsList from 'components/AppointmentsList';

const AppointmentsPage = () => {
  const localizer = dayjsLocalizer(dayjs);
  const { t } = useTranslation();
  const [isMonthView, setIsMonthView] = useState<boolean>(false);
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
          views={[Views.MONTH, Views.AGENDA]}
          selectable
          popup
          step={60}
          timeslots={1}
        />
      )}
    </Container>
  );
};

export default AppointmentsPage;
