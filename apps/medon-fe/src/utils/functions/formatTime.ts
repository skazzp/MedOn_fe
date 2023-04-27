export const formatTime = (dateTimeStr: string): string => {
  const dateTime = new Date(dateTimeStr);
  const hour = dateTime.toLocaleString('default', {
    hour: 'numeric',
    hour12: false,
  });
  const minute = dateTime.getMinutes().toString().padStart(2, '0');

  return `${hour}:${minute}`;
};
