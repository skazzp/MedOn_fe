export const formatTimeDifference = (
  time: Date | string,
  type: 'countdown' | 'counter' = 'countdown'
): string => {
  const seconds =
    type === 'countdown' ? getTimeDifference(time) : -getTimeDifference(time);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesString = minutes < 10 ? '0' + minutes : minutes;
  const secondsString =
    remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

  return minutesString + ':' + secondsString;
};

export const getTimeDifference = (time: Date | string): number => {
  return Math.trunc((new Date(time).getTime() - new Date().getTime()) / 1000);
};

export const notificationTimeFlag = 5 * 60;
export const notificationTimeout = 30000;
export const timerTimeout = 1000;
