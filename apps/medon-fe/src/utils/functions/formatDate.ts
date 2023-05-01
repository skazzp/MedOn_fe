export const formatDate = (dateTimeStr: string): string => {
  const dateTime = new Date(dateTimeStr);
  const month = dateTime.toLocaleString('default', { month: 'short' });
  const day = dateTime.getDate();
  const year = dateTime.getFullYear();

  return `May ${day}, ${year}`;
};
