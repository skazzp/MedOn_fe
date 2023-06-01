import dayjs from 'dayjs';
import { Skeleton } from 'antd';
import { useTheme } from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dayjsLocalizer, Views, Event } from 'react-big-calendar';

import Button from 'components/Button';
import { AppointmentsCard } from 'components/AppointmentsCard';

import { useModal } from 'hooks/useModal';

import { Filter, ShowAll } from 'interfaces/Filter';

import {
  useGetAllCalendarAppointmentsQuery,
  useGetAllListAppointmentsQuery,
} from 'redux/api/appointmentsApi';

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
  StyledSelect,
  Buttons,
  ChoosePage,
  SubHeader,
} from './styles';
import { useGetCalendarEvents } from './hooks';

const AppointmentsPage = () => {
  const [isMonthView, setIsMonthView] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.today);
  const [showAll, setShowAll] = useState<ShowAll>(ShowAll.true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(defaultLimit);

  const { t } = useTranslation();
  const theme = useTheme();

  const { data: listAppointments } = useGetAllListAppointmentsQuery({
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
  const { hideModal, isVisible, showModal } = useModal(false);

  const localizer = dayjsLocalizer(dayjs);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    showModal();
  };

  const resetPage = () => {
    setPage(1);
  };

  const handleSetPage = (newPage: number) => {
    if (filter !== Filter.today)
      if (newPage < 1) {
        setPage(1);
      } else {
        setPage(newPage);
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
          <>
            <Buttons>
              <Button
                bgcolor={theme.colors.gray_100}
                textcolor={theme.colors.black}
                type="button"
                onClick={() => {
                  resetPage();
                  setFilter(Filter.today);
                }}
                autoFocus
              >
                Today
              </Button>
              <Button
                bgcolor={theme.colors.gray_100}
                textcolor={theme.colors.gray_700}
                type="button"
                onClick={() => {
                  resetPage();
                  setFilter(Filter.future);
                }}
              >
                Future
              </Button>
              <Button
                bgcolor={theme.colors.gray_100}
                textcolor={theme.colors.gray_700}
                type="button"
                onClick={() => {
                  resetPage();
                  setFilter(Filter.past);
                }}
              >
                Past
              </Button>
            </Buttons>
            <Buttons>
              <Button
                type="button"
                bgcolor={theme.colors.gray_100}
                textcolor={theme.colors.gray_700}
                onClick={() => handleSetPage(page - 1)}
              >
                {'<'}
              </Button>
              <Button
                bgcolor={theme.colors.gray_100}
                textcolor={theme.colors.gray_700}
                type="button"
                onClick={() => handleSetPage(page + 1)}
              >
                {'>'}
              </Button>
            </Buttons>
          </>
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
        <StyledSelect
          options={[
            { label: 'All', value: 'true' },
            { label: 'Mine', value: 'false' },
          ]}
          defaultValue={'true'}
          onChange={(value) => setShowAll(value as ShowAll)}
        />
      </SubHeader>
      {!isMonthView && (
        <ListContainer>
          <AppointmentContainer>
            {listAppointments?.data?.slice(0, limit).map((appointment) => (
              <AppointmentsCard
                key={appointment.id}
                isLinkAdded
                {...appointment}
              />
            ))}
          </AppointmentContainer>
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
