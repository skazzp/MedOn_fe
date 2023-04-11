import timezones from 'utils/timezones/timezones.json';

export const timezoneOptions = timezones.map((timezone) => {
  const option = {
    value: timezone.text,
    label: timezone.text,
    offset: timezone.offset,
  };
  return option;
});

export const DEFAULT_TIMEZONE = '(UTC) Coordinated Universal Time';
