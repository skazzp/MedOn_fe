import { useCallback, useMemo } from 'react';
import { DateLocalizer, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { StyledCalendar } from 'components/BookAppointmentCalendar/styles';
import { BookAppointmentCalendarProps } from 'components/BookAppointmentCalendar/types';

const mLocalizer = momentLocalizer(moment);

function BookAppointmentCalendar({
  setSelectedDate,
}: BookAppointmentCalendarProps) {
  const { formats } = useMemo(
    () => ({
      formats: {
        weekdayFormat: (
          date: Date,
          culture: string | undefined,
          localizer: DateLocalizer | undefined
        ): string => {
          if (localizer) {
            return localizer.format(date, 'dddd', culture);
          }

          return '';
        },
      },
    }),
    []
  );

  const onSelectSlot = useCallback(
    (slotInfo: { start: Date | null }) => {
      const minDate = new Date();

      if (slotInfo.start && slotInfo.start >= minDate) {
        setSelectedDate(slotInfo.start);
      }
    },
    [setSelectedDate]
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
      />
    </div>
  );
}

export default BookAppointmentCalendar;
