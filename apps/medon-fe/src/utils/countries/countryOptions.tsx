import countries from 'utils/countries/countries.json';

export const countryOptions = countries.map((country) => {
  const option = { value: country.name, label: country.name };
  return option;
});
