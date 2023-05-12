import dayjs, { Dayjs } from 'dayjs';
import { Views, dayjsLocalizer, Event } from 'react-big-calendar';
import { useTheme } from 'styled-components';

import { StyledCalendar } from './styles';

// type

interface CustomEvent {
  title: string;
  start: Date | Dayjs;
  end: Date | Dayjs;
}

// mock

const events: CustomEvent[] = [
  {
    title: 'Event 1',
    start: new Date('2023-05-15T10:00:00'),
    end: new Date('2023-05-15T11:00:00'),
  },
  {
    title: 'Event 2',
    start: new Date('2023-05-15T11:00:00'),
    end: new Date('2023-05-15T12:00:00'),
  },
  {
    title: 'Event 3',
    start: new Date('2023-05-15T12:00:00'),
    end: new Date('2023-05-15T13:00:00'),
  },
];

export function PatientCardCalendar() {
  const theme = useTheme();

  const localizer = dayjsLocalizer(dayjs);

  const dayPropGetter = (date: Date) => {
    const today = dayjs();
    const isPast = dayjs(date).isBefore(today, 'date');
    const isToday = dayjs(date).isSame(today, 'date');
    const bgColor = {
      past: theme.colors.gray_200,
      today: theme.colors.gray_400,
      future: 'white',
    };
    const style = { backgroundColor: bgColor.future };

    if (isPast) {
      style.backgroundColor = bgColor.past;
    } else if (isToday) {
      style.backgroundColor = bgColor.today;
    }

    return { style };
  };

  function handleEventSelect(event: Event) {
    console.log(
      `Selected event: title ${
        event.title
      }, start time ${event.start?.toLocaleString()}, end time: ${event.end?.toLocaleString()}`
    );
    // Add your code here to do something when the user clicks on an event
  }

  return (
    <StyledCalendar
      localizer={localizer}
      defaultView="month"
      views={[Views.MONTH, Views.WEEK]}
      events={events}
      dayPropGetter={dayPropGetter}
      onSelectEvent={handleEventSelect}
      popup
      selectable
      step={60}
      timeslots={2}
    />
  );
}
