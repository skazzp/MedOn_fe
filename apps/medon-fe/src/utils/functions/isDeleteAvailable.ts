import dayjs from 'dayjs';

export function isDeleteAvailable(endTime?: Date) {
  if (!endTime) {
    return false;
  }
  const now = dayjs();

  return now.isBefore(dayjs(endTime));
}
