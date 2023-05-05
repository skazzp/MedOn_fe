import { useCallback, useState } from 'react';
import { Event } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { hoursSchema } from 'validation/selectHourRangeSchema';
import { toastConfig } from 'utils/toastConfig';

interface SelectHours {
  start: number;
  end: number;
}

export function useCalendar() {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, reset } = useForm<SelectHours>({
    resolver: yupResolver(hoursSchema),
    defaultValues: { start: 0, end: 1 },
  });
  const [myEvents, setEvents] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const handleSelectDay = useCallback(
    (event: Event) => {
      setEditIndex(null);
      setSelectedDay(event.start);
      reset();
    },
    [reset]
  );
  const dateInText = moment(selectedDay).format('dddd, MMMM, Do, YYYY');

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

  const handleCancel = () => {
    setSelectedDay(undefined);
  };

  const handleRemove = () => {
    setEvents((prev) => [...prev.filter((e, i) => i !== editIndex)]);
    setSelectedDay(undefined);
    setEditIndex(null);
  };

  const submitEvent = (data: SelectHours) => {
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
      toast.error(t('availability.timeUsed'), toastConfig);
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

  return {
    handleSelectDay,
    handleSelectEvent,
    submitEvent,
    handleRemove,
    handleCancel,
    control,
    handleSubmit,
    setValue,
    reset,
    editIndex,
    selectedDay,
    myEvents,
    dateInText,
  };
}
