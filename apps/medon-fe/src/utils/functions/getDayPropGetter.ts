import dayjs from 'dayjs';
import { theme } from 'styles/theme';

export function getDayPropGetter(date: Date): { style: React.CSSProperties } {
  const dateObj = dayjs(date);
  const today = dayjs();
  const isPast = dateObj.isBefore(today, 'date');
  const isToday = dateObj.isSame(today, 'date');

  const bgColor = {
    past: theme.colors.gray_200,
    today: theme.colors.gray_400,
    future: theme.colors.white,
  };

  let backgroundColor = bgColor.future;

  if (isPast) {
    backgroundColor = bgColor.past;
  } else if (isToday) {
    backgroundColor = bgColor.today;
  }

  const style = {
    backgroundColor,
  };

  return { style };
}
