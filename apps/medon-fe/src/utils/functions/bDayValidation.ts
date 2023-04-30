export function bDayValidation() {
  const dt = new Date();

  return new Date(dt.setFullYear(dt.getFullYear() - 18));
}
