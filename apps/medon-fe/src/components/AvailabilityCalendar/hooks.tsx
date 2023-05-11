import { useCallback, useEffect, useMemo, useState } from 'react';
import { DateLocalizer, Event } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  useCreateAvailabilityMutation,
  useGetAvailabilityQuery,
  useRemoveAvailabilityMutation,
  useUpdateAvailabilityMutation,
} from 'redux/api/availabilityApi';
import { hoursSchema } from 'validation/selectHourRangeSchema';
import { toastConfig } from 'utils/toastConfig';
import { timeFormat } from 'utils/constants/dateFormat';
import {
  dateFormatCalendar,
  dateToTextFormat,
  dayFormat,
  weekdayFormat,
} from 'utils/constants';
import { CalendarSlot, SelectHours } from './types';
import { checkDates, convertSlotToArray, joinConsecutiveDates } from './utils';

dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

export function useCalendar() {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, reset } = useForm<SelectHours>({
    resolver: yupResolver(hoursSchema),
    defaultValues: { start: 0, end: 1 },
  });
  const [timeSlots, setTimeSlots] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [createSlot, { isLoading: createLoading }] =
    useCreateAvailabilityMutation();
  const [removeSlot, { isLoading: removeLoading }] =
    useRemoveAvailabilityMutation();
  const [updateSlot, { isLoading: updateLoading }] =
    useUpdateAvailabilityMutation();
  const [disabledBtns, setDisabledBtns] = useState<boolean>(false);

  const tZone = dayjs.tz.guess();
  const { data: availabilityResponse } = useGetAvailabilityQuery({
    timezone: tZone,
  });

  const { formats } = useMemo(
    () => ({
      formats: {
        dateFormat: dateFormatCalendar,
        weekdayFormat: (
          date: Date,
          culture: string | undefined,
          localizer: DateLocalizer | undefined
        ) => {
          if (localizer) {
            return localizer.format(date, weekdayFormat, culture);
          }

          return '';
        },
        dayFormat: (
          date: Date,
          culture: string | undefined,
          localizer: DateLocalizer | undefined
        ) => {
          if (localizer) {
            return localizer.format(date, dayFormat, culture);
          }

          return '';
        },
        agendaTimeRangeFormat: (
          { start, end }: { start: Date; end: Date },
          culture: string | undefined,
          localizer: DateLocalizer | undefined
        ) => {
          if (localizer) {
            return `${localizer.format(
              start,
              timeFormat,
              culture
            )} - ${localizer.format(end, timeFormat, culture)}`;
          }

          return '';
        },
      },
    }),
    []
  );

  const dateInText = dayjs(selectedDay).format(dateToTextFormat);

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

  const handleRemove = async () => {
    if (editIndex !== null && timeSlots[editIndex]) {
      const arrayToRemove = convertSlotToArray(
        timeSlots[editIndex] as CalendarSlot
      ).map((e) => ({ startTime: e.startTime, endTime: e.endTime }));

      try {
        await removeSlot({ dto: arrayToRemove, timezone: tZone });
        setSelectedDay(undefined);
        setEditIndex(null);
      } catch (error) {
        toast.error(t('appointment.errorAsync'), toastConfig);
      }
    }
  };

  const handleSubmitEvent = async (data: SelectHours) => {
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

      try {
        await createSlot({ dto: newAvailability, timezone: tZone });
        setEditIndex(null);
        setSelectedDay(undefined);
      } catch (error) {
        toast.error(t('appointment.errorAsync'), toastConfig);
      }
    }
  };

  const handleEditEvent = async (data: SelectHours) => {
    const arrayToRemove =
      editIndex !== null
        ? convertSlotToArray(timeSlots[editIndex] as CalendarSlot).map((e) => ({
            startTime: e.startTime,
            endTime: e.endTime,
          }))
        : [];

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

      try {
        await updateSlot({
          toDelete: arrayToRemove,
          toCreate: newAvailability,
          timezone: tZone,
        });

        setEditIndex(null);
        setSelectedDay(undefined);
      } catch (error) {
        toast.error(t('appointment.errorAsync'), toastConfig);
      }
    }
  };

  useEffect(() => {
    if (createLoading || updateLoading || removeLoading) {
      setDisabledBtns(true);
    } else {
      setDisabledBtns(false);
    }
  }, [createLoading, removeLoading, updateLoading]);

  useEffect(() => {
    if (availabilityResponse?.data) {
      const joined = availabilityResponse?.data.length
        ? joinConsecutiveDates(availabilityResponse.data)
        : [];

      setTimeSlots(joined);
    }
  }, [availabilityResponse]);

  return {
    handleSelectDay,
    handleSelectEvent,
    handleSubmitEvent,
    handleRemove,
    handleEditEvent,
    handleCancel,
    createLoading,
    updateLoading,
    removeLoading,
    disabledBtns,
    handleSubmit,
    control,
    setValue,
    reset,
    editIndex,
    selectedDay,
    timeSlots,
    formats,
    dateInText,
  };
}
