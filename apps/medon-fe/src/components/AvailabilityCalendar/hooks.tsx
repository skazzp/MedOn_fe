import { useCallback, useEffect, useState } from 'react';
import { Event } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  useCreateAvailabilityMutation,
  useGetAvailabilityQuery,
  useRemoveAvailabilityMutation,
} from 'redux/api/availabilityApi';
import { IAvailability } from 'redux/api/types';
import { hoursSchema } from 'validation/selectHourRangeSchema';
import { toastConfig } from 'utils/toastConfig';
import { timeFormat } from 'utils/constants/timeFormat';
import { dateToTextFormat } from 'utils/constants';
import { CalendarSlot, SelectHours } from './types';

dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(dayOfYear);

export function useCalendar() {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, reset } = useForm<SelectHours>({
    resolver: yupResolver(hoursSchema),
    defaultValues: { start: 0, end: 1 },
  });
  const [timeSlots, setTimeSlots] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [createSlot] = useCreateAvailabilityMutation();
  const [removeSlot] = useRemoveAvailabilityMutation();

  const tZone = dayjs.tz.guess();
  const { data: availabilityResponse } = useGetAvailabilityQuery({
    timezone: tZone,
  });

  const convertSlotToArray = (timeSlot: CalendarSlot) => {
    const startHour = dayjs(timeSlot.start).hour();
    const endHour = dayjs(timeSlot.end).hour();
    const availabilityArray = [];

    if (endHour - startHour === 1) {
      return [
        {
          startTime: dayjs(timeSlot.start).toDate(),
          endTime: dayjs(timeSlot.end).toDate(),
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

  function joinConsecutiveDates(dates: IAvailability[]) {
    const ranges = [];
    let currentRange = {
      start: dates[0].startTime,
      end: dates[0].endTime,
      title: dates[0].title,
    };

    for (let i = 1; i < dates.length; i += 1) {
      const current = dates[i];
      const previous = dates[i - 1];

      if (
        new Date(current.startTime).getDate() ===
        new Date(previous.endTime).getDate()
      ) {
        currentRange.end = current.endTime;
      } else {
        ranges.push(currentRange);
        currentRange = {
          start: current.startTime,
          end: current.endTime,
          title: current.title,
        };
      }
    }

    ranges.push(currentRange);
    // console.log(ranges);

     const resultArray = ranges.map((elem) => ({
       start: dayjs(elem.start).toDate(),
       end: dayjs(elem.end).toDate(),
       title: elem.title,
     }));

    return resultArray;
  }

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

  const handleSelectDay = useCallback(
    (event: Event) => {
      setEditIndex(null);
      // console.log(timeSlots);
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
    if (editIndex && typeof timeSlots[editIndex]) {
      console.log('slot to del', timeSlots[editIndex]);
      const arrayToRemove = convertSlotToArray(
        timeSlots[editIndex] as CalendarSlot
      ).map((e) => ({ startTime: e.startTime, endTime: e.endTime }));

      console.log('arrayToRemove', arrayToRemove);
      // removeSlot(arrayToRemove);
      // setSelectedDay(undefined);
      // setEditIndex(null);
    }
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
      const newAvailability = convertSlotToArray(newEvent);

      console.log(newAvailability);

      createSlot({ dto: newAvailability, timezone: tZone });

      setEditIndex(null);
      setSelectedDay(undefined);
    }
  };

  useEffect(() => {
    if (availabilityResponse?.data?.length) {
      // console.log(availabilityResponse.data);
      const joined = joinConsecutiveDates(availabilityResponse.data);
      // const newArray = joined.map((elem) => ({
      //   start: dayjs(elem.start).toDate(),
      //   end: dayjs(elem.end).toDate(),
      //   title: elem.title,
      // }));

      setTimeSlots(joined);
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
