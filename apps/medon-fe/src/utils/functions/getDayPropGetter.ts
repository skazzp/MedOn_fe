import dayjs from 'dayjs';
import { theme } from 'styles/theme';

export function getDayPropGetter(myTheme: typeof theme) {
  return function dayPropGetter(date: Date) {
    const today = dayjs();
    const isPast = dayjs(date).isBefore(today, 'date');
    const isToday = dayjs(date).isSame(today, 'date');

    const bgColor = {
      past: myTheme.colors.gray_200,
      today: myTheme.colors.gray_400,
      future: myTheme.colors.white,
    };
    const style = { backgroundColor: bgColor.future };

    if (isPast) {
      style.backgroundColor = bgColor.past;
    } else if (isToday) {
      style.backgroundColor = bgColor.today;
    }

    return { style };
  };
}
