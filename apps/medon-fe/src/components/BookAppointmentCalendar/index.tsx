import { useCallback, useMemo } from 'react';
import { DateLocalizer, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { StyledCalendar } from 'components/BookAppointmentCalendar/styles';
import { BookAppointmentCalendarProps } from 'components/BookAppointmentCalendar/types';

const mLocalizer = dayjsLocalizer(dayjs);

function BookAppointmentCalendar({
  setSelectedDate,
  selectedDate,
}: BookAppointmentCalendarProps) {
  const { formats } = useMemo(
    () => ({
      formats: {
        dateFormat: 'D',
        weekdayFormat: (
          date: Date,
          culture: string | undefined,
          localizer: DateLocalizer | undefined
        ) => {
          if (localizer) {
            return localizer.format(date, 'dddd', culture);
          }

          return '';
        },
        dayFormat: (
          date: Date,
          culture: string | undefined,
          localizer: DateLocalizer | undefined
        ) => {
          if (localizer) {
            return localizer.format(date, 'dddd Do', culture);
          }

          return '';
        },
        timeGutterFormat: (
          date: Date,
          culture: string | undefined,
          localizer: DateLocalizer | undefined
        ) => {
          if (localizer) {
            return localizer.format(date, 'hh:mm a', culture);
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
      }
    },
    [selectedDate, setSelectedDate]
  );

  const DayPropGetter = useCallback(
    (date: Date) => ({
      className: dayjs(date).isSame(selectedDate, 'day') ? 'selected-day' : '',
    }),
    [selectedDate]
  );

  return (
    <div>
      <StyledCalendar
        localizer={mLocalizer}
        defaultView="month"
        views={['month']}
        onSelectSlot={onSelectSlot}
        selectable
        formats={formats}
        dayPropGetter={DayPropGetter}
      />
    </div>
  );
}

export default BookAppointmentCalendar;
