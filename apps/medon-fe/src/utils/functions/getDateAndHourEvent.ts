import dayjs from 'dayjs';
import { dayAndTimeHourFormat } from 'utils/constants';

export const getDateAndHourEvent = (date: Date | undefined): string => {
  if (!date) {
    return '';
  }

  return `${dayjs(date).format(dayAndTimeHourFormat)}`;
};
