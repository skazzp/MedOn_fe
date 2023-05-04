import { useCallback, useState } from 'react';
import { momentLocalizer, Views, Event } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { hoursSchema } from 'validation/selectHourRangeSchema';
import { SelectAntD } from 'components/common';
import { endHours, startHours } from 'utils/constants/options/hourOptions';
import {
  AddTimeBox,
  Container,
  DateText,
  Form,
  InputContainer,
  StyledButton,
  StyledCalendar,
  Text,
  Title,
} from './style';

interface SelectHours {
  start: number;
  end: number;
}

export default function CalendarRBC() {
  const localizer = momentLocalizer(moment);
  const { t } = useTranslation();
  const [myEvents, setEvents] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const { control, handleSubmit, reset } = useForm<SelectHours>({
    resolver: yupResolver(hoursSchema),
    defaultValues: { start: 0, end: 1 },
  });

  const handleSelectDay = useCallback(
    (event: Event) => {
      setSelectedDay(event.start);
      console.log(myEvents);
    },
    [myEvents]
  );

  const handleSelectEvent = useCallback(
    (event: Event) => window.alert(event.title),
    []
  );

  const onSubmit = (data: SelectHours) => {
    const title = `${moment()
      .hours(data.start)
      .minutes(0)
      .format('HH:mm')} - ${moment()
      .hours(data.end)
      .minutes(0)
      .format('HH:mm')}`;
    const newEvent = {
      title,
      start: moment(selectedDay).hours(data.start).minutes(0).toDate(),
      end: moment(selectedDay).hours(data.end).minutes(0).toDate(),
    };

    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <Container>
      <Title>Availability schedule:</Title>
      <StyledCalendar
        // defaultDate={defaultDate}
        defaultView={Views.MONTH}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectDay}
        views={[Views.MONTH, Views.AGENDA]}
        selectable
        step={60}
        timeslots={1}
      />
      <AddTimeBox>
        {!selectedDay ? (
          <DateText>Select day or availability slot to start editing</DateText>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <DateText>
              {moment(selectedDay).format('dddd, MMMM, Do, YYYY')}
            </DateText>
            <InputContainer>
              <SelectAntD
                name="start"
                control={control}
                size="large"
                options={startHours}
              />
              <Text>-</Text>
              <SelectAntD
                name="end"
                control={control}
                size="large"
                options={endHours}
              />
            </InputContainer>
            <InputContainer>
              <StyledButton type="primary" htmlType="submit" size="large">
                <CheckOutlined />
                {t('save')}
              </StyledButton>
              <StyledButton type="default" htmlType="button" size="large">
                <CloseOutlined />
              </StyledButton>
            </InputContainer>
          </Form>
        )}
      </AddTimeBox>
    </Container>
  );
}
