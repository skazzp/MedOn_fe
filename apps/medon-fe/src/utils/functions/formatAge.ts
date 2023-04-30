export function formatAge(dateOfBirth?: Date) {
  if (!dateOfBirth) {
    return { formattedAge: undefined };
  }

  const birthdate = new Date(dateOfBirth);
  const ageDiffMs = Date.now() - birthdate.getTime();
  const ageDate = new Date(ageDiffMs);
  const formattedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  return { formattedAge };
}
