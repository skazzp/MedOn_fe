import { useCallback, useMemo } from 'react';
import { DateLocalizer, Views, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { t } from 'i18next';

import { StyledCalendar } from 'components/BookAppointmentCalendar/styles';
import { BookAppointmentCalendarProps } from 'components/BookAppointmentCalendar/types';

import { toastConfig } from 'utils/toastConfig';
import {
  dateFormatCalendar,
  dayFormat,
  timeFormat,
  weekdayFormat,
} from 'utils/constants/dateFormat';
import { getDayPropGetter } from 'utils/functions/getDayPropGetter';

const mLocalizer = dayjsLocalizer(dayjs);

function BookAppointmentCalendar({
  setSelectedDate,
  selectedDate,
}: BookAppointmentCalendarProps) {
  const { formats } = useMemo(
    () => ({
      formats: {
        dateFormat: dateFormatCalendar,
        weekdayFormat: (
          date: Date,
          culture?: string,
          localizer?: DateLocalizer
        ) => {
          if (localizer) {
            return localizer.format(date, weekdayFormat, culture);
          }

          return '';
        },
        dayFormat: (
          date: Date,
          culture?: string,
          localizer?: DateLocalizer
        ) => {
          if (localizer) {
            return localizer.format(date, dayFormat, culture);
          }

          return '';
        },
        timeGutterFormat: (
          date: Date,
          culture?: string,
          localizer?: DateLocalizer
        ) => {
          if (localizer) {
            return localizer.format(date, timeFormat, culture);
          }

          return '';
        },
      },
    }),
    []
  );

  const onSelectSlot = useCallback(
    (slotInfo: { start: Date | null }) => {
      const currentDate = new Date();

      currentDate.setDate(currentDate.getDate() - 1);

      if (slotInfo.start && slotInfo.start >= currentDate) {
        if (dayjs(slotInfo.start).isSame(selectedDate, 'day')) {
          setSelectedDate(null);
        } else {
          setSelectedDate(slotInfo.start);
        }
      } else if (!dayjs(slotInfo.start).isAfter(dayjs())) {
        toast.warning(t('availability.badDate'), toastConfig);
      }
    },
    [selectedDate, setSelectedDate]
  );

  const DayPropGetter = useCallback(
    (date: Date) => {
      const { style } = getDayPropGetter(date);

      return {
        className: `
      ${dayjs(date).isSame(selectedDate, 'day') ? 'selected-day' : ''}
    `,
        style,
      };
    },
    [selectedDate]
  );

  return (
    <div>
      <StyledCalendar
        localizer={mLocalizer}
        views={[Views.MONTH]}
        onSelectSlot={onSelectSlot}
        selectable
        formats={formats}
        dayPropGetter={DayPropGetter}
      />
    </div>
  );
}

export default BookAppointmentCalendar;
