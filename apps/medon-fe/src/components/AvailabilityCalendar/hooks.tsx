import { useCallback, useEffect, useState } from 'react';
import { Event } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  useCreateAvailabilityMutation,
  useGetAvailabilityQuery,
} from 'redux/api/availabilityApi';
import { IAvailability } from 'redux/api/types';
import { hoursSchema } from 'validation/selectHourRangeSchema';
import { toastConfig } from 'utils/toastConfig';
import { timeFormat } from 'utils/constants/timeFormat';
import { dateToTextFormat } from 'utils/constants';
import { CalendarSlot, SelectHours } from './types';

dayjs.extend(isBetween);

export function useCalendar() {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, reset } = useForm<SelectHours>({
    resolver: yupResolver(hoursSchema),
    defaultValues: { start: 0, end: 1 },
  });
  const [timeSlots, setTimeSlots] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [createSlot, { isSuccess }] = useCreateAvailabilityMutation();
  const { data: availabilityResponse } = useGetAvailabilityQuery(null);

  const handleSelectDay = useCallback(
    (event: Event) => {
      setEditIndex(null);
      if (!dayjs(event.start).isAfter(dayjs())) {
        toast.warning(t('availability.badDate'), toastConfig);
        setSelectedDay(undefined);
      } else {
        setEditIndex(null);
        setSelectedDay(event.start);
        reset();
      }
    },
    [reset, t]
  );

  const dateInText = dayjs(selectedDay).format(dateToTextFormat);

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
      const eventStart = dayjs(event.start).valueOf();
      const eventEnd = dayjs(event.end).valueOf();
      const newEventStart = dayjs(start).valueOf();
      const newEventEnd = dayjs(end).valueOf();

      return (
        dayjs(newEventStart).isBetween(eventStart, eventEnd, undefined, '[)') ||
        dayjs(newEventEnd).isBetween(eventStart, eventEnd, undefined, '(]')
      );
    });
  };

  const dayPropGetter = useCallback(
    (date: Date) => ({
      ...(dayjs(date).isSame(selectedDay) && {
        className: 'av-selected-day',
      }),
    }),
    [selectedDay]
  );

  const handleSelectEvent = useCallback(
    (event: Event) => {
      const index = timeSlots.findIndex(
        (object) =>
          dayjs(object.start).isSame(event.start) &&
          dayjs(object.end).isSame(event.end)
      );

      setSelectedDay(event.start);
      setEditIndex(index);
      setValue('start', dayjs(event.start).hour());
      setValue('end', dayjs(event.end).hour());
    },
    [timeSlots, setValue]
  );

  const handleCancel = () => {
    setSelectedDay(undefined);
  };

  const handleRemove = () => {
    setTimeSlots((prev) => [...prev.filter((e, i) => i !== editIndex)]);
    setSelectedDay(undefined);
    setEditIndex(null);
  };

  const convertSlotToArray = (timeSlot: CalendarSlot) => {
    const startHour = dayjs(timeSlot.start).hour();
    const endHour = dayjs(timeSlot.end).hour();
    const availabilityArray = [];

    if (endHour - startHour === 1) {
      return [
        {
          startTime: timeSlot.start,
          endTime: timeSlot.end,
          title: timeSlot.title,
        },
      ];
    }
    for (let i = startHour; i < endHour; i += 1) {
      availabilityArray.push({
        startTime: dayjs(timeSlot.start).hour(i).toDate(),
        endTime: dayjs(timeSlot.start)
          .hour(i + 1)
          .toDate(),
        title: timeSlot.title,
      });
    }

    return availabilityArray;
  };

  const convertResponse = (response: IAvailability[]) => {
    const newAvailability = response.map((elem) => ({
      title: elem.title,
      start: elem.startTime,
      end: elem.endTime,
    }));

    return newAvailability;
  };

  const handleSubmitEvent = (data: SelectHours) => {
    const title = `${dayjs()
      .hour(data.start)
      .minute(0)
      .format(timeFormat)} - ${dayjs()
      .hour(data.end)
      .minute(0)
      .format(timeFormat)}`;

    const newEvent = {
      title,
      start: dayjs(selectedDay).hour(data.start).minute(0).toDate(),
      end: dayjs(selectedDay).hour(data.end).minute(0).toDate(),
    };

    const datesCross = checkDates(
      newEvent.start,
      newEvent.end,
      timeSlots,
      editIndex
    );

    if (datesCross) {
      toast.error(t('availability.timeUsed'), toastConfig);
    } else {
      console.log(newEvent);
      const newAvailability = convertSlotToArray(newEvent);

      createSlot(newAvailability);

      setTimeSlots((prev) => {
        if (editIndex !== null) {
          prev.splice(editIndex, 1);
        }

        return [...prev, newEvent];
      });
      setEditIndex(null);
      setSelectedDay(undefined);
    }
  };

  useEffect(() => {
    if (availabilityResponse?.data) {
      console.log(availabilityResponse);
      console.log(convertResponse(availabilityResponse.data));
      const currentAvailability = convertResponse(availabilityResponse.data);

      setTimeSlots(currentAvailability);
    }
  }, [availabilityResponse]);

  return {
    handleSelectDay,
    handleSelectEvent,
    handleSubmitEvent,
    handleRemove,
    handleCancel,
    control,
    handleSubmit,
    setValue,
    reset,
    editIndex,
    selectedDay,
    timeSlots,
    dateInText,
    dayPropGetter,
  };
}
