import { useCallback, useState } from 'react';
import { momentLocalizer, Views, Event } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { hoursSchema } from 'validation/selectHourRangeSchema';
import { SelectAntD } from 'components/common';
import { endHours, startHours } from 'utils/constants/options/hourOptions';
import { toastConfig } from 'utils/toastConfig';
import {
  AddTimeBox,
  BtnContainer,
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
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { control, handleSubmit, setValue, reset } = useForm<SelectHours>({
    resolver: yupResolver(hoursSchema),
    defaultValues: { start: 0, end: 1 },
  });

  const handleSelectDay = useCallback(
    (event: Event) => {
      setEditIndex(null);
      setSelectedDay(event.start);
      reset();
    },
    [reset]
  );

  const handleSelectEvent = useCallback(
    (event: Event) => {
      const index = myEvents.findIndex(
        (object) =>
          moment(object.start).isSame(event.start) &&
          moment(object.end).isSame(event.end)
      );

      setSelectedDay(event.start);
      setEditIndex(index);
      setValue('start', moment(event.start).hours());
      setValue('end', moment(event.end).hours());
    },
    [myEvents, setValue]
  );

  const checkDates = (
    start: Date,
    end: Date,
    eventArray: Event[],
    indexToFilter: number | null
  ) => {
    if (typeof indexToFilter === 'number') {
      eventArray = [...eventArray].filter(
        (elem, index) => index !== indexToFilter
      );
    }

    return eventArray.find((event) => {
      const eventStart = moment(event.start).valueOf();
      const eventEnd = moment(event.end).valueOf();
      const newEventStart = moment(start).valueOf();
      const newEventEnd = moment(end).valueOf();

      return (
        moment(newEventStart).isBetween(
          eventStart,
          eventEnd,
          undefined,
          '[)'
        ) ||
        moment(newEventEnd).isBetween(eventStart, eventEnd, undefined, '(]')
      );
    });
  };

  const handleCancel = () => {
    setSelectedDay(undefined);
  };

  const handleRemove = () => {
    setEvents((prev) => [...prev.filter((e, i) => i !== editIndex)]);
    setSelectedDay(undefined);
    setEditIndex(null);
  };

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

    const datesCross = checkDates(
      newEvent.start,
      newEvent.end,
      myEvents,
      editIndex
    );

    if (datesCross) {
      toast.error('That time is already used', toastConfig);
    } else {
      setEvents((prev) => {
        if (editIndex !== null) {
          prev.splice(editIndex, 1);
        }

        return [...prev, newEvent];
      });
      setEditIndex(null);
      setSelectedDay(undefined);
    }
  };

  return (
    <Container onClick={(e) => console.log(e.target, e.currentTarget)}>
      <Title>{t('availability.title')}</Title>
      <StyledCalendar
        defaultView={Views.MONTH}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectDay}
        views={[Views.MONTH, Views.AGENDA]}
        selectable
        popup
        step={60}
        timeslots={1}
      />
      <AddTimeBox>
        {!selectedDay ? (
          <DateText>{t('availability.message')}</DateText>
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
            <BtnContainer>
              <StyledButton type="primary" htmlType="submit" size="large">
                {editIndex === null ? (
                  <>
                    <CheckOutlined />
                    &nbsp;{t('save')}
                  </>
                ) : (
                  <>
                    <EditOutlined />
                    &nbsp;{t('edit')}
                  </>
                )}
              </StyledButton>
              {editIndex !== null && (
                <StyledButton
                  type="default"
                  htmlType="button"
                  size="large"
                  danger
                  onClick={handleRemove}
                >
                  <DeleteOutlined />
                </StyledButton>
              )}
              <StyledButton
                type="default"
                htmlType="button"
                size="large"
                onClick={handleCancel}
              >
                <CloseOutlined />
              </StyledButton>
            </BtnContainer>
          </Form>
        )}
      </AddTimeBox>
    </Container>
  );
}
