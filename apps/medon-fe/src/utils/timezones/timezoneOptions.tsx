import timezones from 'utils/timezones/timezones.json';

export const timezoneOptions = timezones.map((timezone) => ({
  value: timezone.text,
  label: timezone.text,
}));

export const DEFAULT_TIMEZONE = '(UTC) Coordinated Universal Time';
