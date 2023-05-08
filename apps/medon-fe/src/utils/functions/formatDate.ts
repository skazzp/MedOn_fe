import i18next from 'i18next';

export const formatDate = (dateTimeStr: string): string => {
  const dateTime = new Date(dateTimeStr);
  const month = dateTime.toLocaleString(`${i18next.t('defaultLanguage')}`, {
    month: 'short',
  });
  const day = dateTime.getDate();
  const year = dateTime.getFullYear();

  return `${month} ${day}, ${year}`;
};
