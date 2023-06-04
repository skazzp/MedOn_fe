export const formatTimeDifference = (time: Date | string): string => {
  const seconds = getTimeDifference(time);

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

export const currentAppointmentTimeFlag = 9 * 60;
export const currentAppointmentTimeout = 30000;
export const countDownTimeout = 1000;
