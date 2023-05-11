import dayjs from 'dayjs';
import { Event } from 'react-big-calendar';

import { timeFormat } from 'utils/constants';
import { IAvailability } from 'redux/api/types';
import { CalendarSlot } from './types';

export const convertSlotToArray = (timeSlot: CalendarSlot) => {
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

export const joinConsecutiveDates = (dates: IAvailability[]) => {
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

  const resultArray = ranges.map((elem) => ({
    start: dayjs(elem.start).toDate(),
    end: dayjs(elem.end).toDate(),
    title: `${dayjs(elem.start).format(timeFormat)} - ${dayjs(elem.end).format(
      timeFormat
    )}`,
  }));

  return resultArray;
};

export const checkDates = (
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
