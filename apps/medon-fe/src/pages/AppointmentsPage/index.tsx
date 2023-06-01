import dayjs from 'dayjs';
import { Skeleton } from 'antd';
import { useTheme } from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dayjsLocalizer, Views, Event } from 'react-big-calendar';

import Button from 'components/Button';
import { Legend } from 'components/Legend';
import { AppointmentsCard } from 'components/AppointmentsCard';

import { useModal } from 'hooks/useModal';

import { Filter, ShowAll } from 'interfaces/Filter';

import { AppointmentsPageModal } from 'pages/AppointmentsPageModal';

import {
  useGetAllCalendarAppointmentsQuery,
  useGetAllListAppointmentsQuery,
} from 'redux/api/appointmentsApi';
import { useAppSelector } from 'redux/hooks';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';

import { defaultLimit, roles, defaultPage } from 'utils/constants';
import { getEventPropGetter } from 'utils/functions/getEventPropGetter';
import { options } from 'utils/constants/options/appointmentFilter';

import {
  Container,
  Header,
  UserIcon,
  View,
  ViewItem,
  Title,
  StyledCalendar,
  AppointmentContainer,
  ListContainer,
  StyledSelect,
  Buttons,
  SubHeader,
  CalendarContainer,
  NotFound,
} from './styles';
import { useGetCalendarEvents } from './hooks';

const AppointmentsPage = () => {
  const [isMonthView, setIsMonthView] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.today);
  const [showAll, setShowAll] = useState<ShowAll>(ShowAll.false);
  const [page, setPage] = useState<number>(defaultPage);
  const [limit, setLimit] = useState<number>(defaultLimit);

  const { t } = useTranslation();
  const theme = useTheme();

  const { data: listAppointments, isFetching: isListFetching } =
    useGetAllListAppointmentsQuery({
      filter,
      showAll,
      page,
    });

  const { data: calendarAppointments, isFetching: isCalendarFetching } =
    useGetAllCalendarAppointmentsQuery(
      {
        showAll,
      },
      {
        skip: !isMonthView,
      }
    );

  const events = useGetCalendarEvents(calendarAppointments?.data);
  const user = useAppSelector(getUserSelector);
  const { hideModal, isVisible, showModal } = useModal(false);

  const localizer = dayjsLocalizer(dayjs);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    showModal();
  };

  const handleButtonClick = (button: Filter) => {
    if (filter === button && filter !== Filter.today) {
      setPage((prev) => prev + 1);
    } else {
      setPage(defaultPage);
      setFilter(button);
      switch (button) {
        case Filter.today:
          setFilter(Filter.today);
          break;
        case Filter.past:
          setFilter(Filter.past);
          break;
        case Filter.future:
          setFilter(Filter.future);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Container>
      <Header>
        <Title>
          <h2>{t('appointments.title')}</h2>
          <UserIcon />
          <span>
            {limit < Number(listAppointments?.data?.length)
              ? limit
              : listAppointments?.data?.length}
          </span>
        </Title>
        {!isMonthView && (
          <Buttons>
            <Button
              bgcolor={theme.colors.gray_100}
              textcolor={theme.colors.black}
              type="button"
              onClick={() => handleButtonClick(Filter.today)}
              autoFocus
            >
              {t('appointments.buttons.today')}
            </Button>
            <Button
              bgcolor={theme.colors.gray_100}
              textcolor={theme.colors.gray_700}
              type="button"
              onClick={() => handleButtonClick(Filter.future)}
            >
              {t('appointments.buttons.future')}
            </Button>
            <Button
              bgcolor={theme.colors.gray_100}
              textcolor={theme.colors.gray_700}
              type="button"
              onClick={() => handleButtonClick(Filter.past)}
            >
              {t('appointments.buttons.past')}
            </Button>
          </Buttons>
        )}
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
      <SubHeader>
        {user.role === roles.local && (
          <StyledSelect
            options={options}
            defaultValue={ShowAll.false}
            onChange={(value) => setShowAll(value as ShowAll)}
          />
        )}
      </SubHeader>
      {!isMonthView && (
        <ListContainer>
          {!isListFetching ? (
            <AppointmentContainer>
              {listAppointments?.data?.length ? (
                listAppointments?.data
                  ?.slice(0, limit)
                  .map((appointment) => (
                    <AppointmentsCard
                      key={appointment.id}
                      isLinkAdded
                      {...appointment}
                    />
                  ))
              ) : (
                <NotFound>{t('appointments.not-found')}</NotFound>
              )}
            </AppointmentContainer>
          ) : (
            <Skeleton />
          )}
          {Number(listAppointments?.data?.length) > limit && (
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
          <CalendarContainer>
            <StyledCalendar
              defaultView={Views.MONTH}
              events={events}
              localizer={localizer}
              views={[Views.MONTH]}
              selectable
              eventPropGetter={getEventPropGetter}
              popup
              timeslots={1}
              onSelectEvent={handleEventClick}
            />
            <Legend />
            <AppointmentsPageModal
              selectedEvent={selectedEvent}
              hideModal={hideModal}
              isVisible={isVisible}
            />
          </CalendarContainer>
        ) : (
          <Skeleton />
        ))}
    </Container>
  );
};

export default AppointmentsPage;
