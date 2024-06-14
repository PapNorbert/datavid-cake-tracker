/**
 * Checks if a person is older than a specified age based on their birth date.
 */
export function isOlderThen(birthDateString: string, requiredAge: number) {
  const today = new Date();
  const birthDate = new Date(birthDateString);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust age based on months
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= requiredAge;
}