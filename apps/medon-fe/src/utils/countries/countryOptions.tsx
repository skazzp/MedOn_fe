import countries from 'utils/countries/countries.json';

export const countryOptions = countries.map((country) => ({
  value: country.name,
  label: country.name,
}));

export const countryOptionsWithCode = countries.map((country) => ({
  value: country.code,
  label: country.name,
}));
