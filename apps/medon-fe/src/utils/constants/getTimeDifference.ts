export const getTimeDifference = (time: Date | string): string => {
  const seconds = Math.trunc(
    (new Date(time).getTime() - new Date().getTime()) / 1000
  );

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesString = minutes < 10 ? '0' + minutes : minutes;
  const secondsString =
    remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

  return minutesString + ':' + secondsString;
};
