import { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import { DateLocalizer, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { StyledCalendar } from './styles';
import { BookAppointmentCalendarProps } from './types';

const mLocalizer = momentLocalizer(moment);

function BookAppointmentCalendar({
  setSelectedDate,
}: BookAppointmentCalendarProps) {
  const clickRef = useRef<number | undefined>(undefined);
  const selectedSlotRef = useRef<Element | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

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

      minDate.setDate(minDate.getDate() - 1);

      if (slotInfo.start && slotInfo.start >= minDate) {
        window.clearTimeout(clickRef.current);
        clickRef.current = window.setTimeout(() => {
          setSelectedDate(slotInfo.start);
          setSelectedSlot(slotInfo.start);
        }, 250);
        console.log(slotInfo);
        console.log(selectedSlot);
      }
      setSelectedSlot(null);
    },
    [selectedSlot, setSelectedDate]
  );

  useEffect(
    () => () => {
      window.clearTimeout(clickRef?.current);
    },
    []
  );

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element;
      const dayBgElement = target.closest('.rbc-day-bg');

      if (dayBgElement) {
        if (selectedSlotRef.current) {
          selectedSlotRef.current.classList.remove('selected-slot');
        }

        dayBgElement.classList.add('selected-slot');
        selectedSlotRef.current = dayBgElement;
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (selectedSlot) {
      const dayElements = document.querySelectorAll('.rbc-day-bg');

      dayElements.forEach((dayElement) => {
        const dateStr = dayElement.getAttribute('data-date');
        const date = moment(dateStr).toDate();
        const isSameDay = moment(date).isSame(selectedSlot, 'day');

        if (isSameDay) {
          dayElement.classList.add('selected-slot');
        } else {
          dayElement.classList.remove('selected-slot');
        }
      });
    }
  }, [selectedSlot]);

  // const slotPropGetter = (date: Date) => {
  //   const isSelected = moment(date).isSame(selectedDate1, 'day');
  //   const isPastDay = moment(date).isBefore(moment(), 'day');

  //   return {
  //     style: {
  //       backgroundColor: isSelected
  //         ? '#DEECF9'
  //         : isPastDay
  //         ? '#fbfcfd'
  //         : 'white',
  //       borderRight: '1px solid #e5e9f0',
  //       borderBottom: '1px solid #e5e9f0',
  //     },
  //     onClick: () => {
  //       setSelectedDate1(date);
  //     },
  //   };
  // };

  return (
    <div>
      <StyledCalendar
        localizer={mLocalizer}
        defaultView="month"
        views={['month']}
        onSelectSlot={onSelectSlot}
        selectable={true}
        formats={formats}
        // slotPropGetter={slotPropGetter}
      />
    </div>
  );
}

export default BookAppointmentCalendar;
