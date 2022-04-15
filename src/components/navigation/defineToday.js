export const isToday = (dayDate) => {
  const today = new Date();

  if (
    today.getDate() === dayDate.getDate() &&
    today.getMonth() === dayDate.getMonth() &&
    today.getFullYear() === dayDate.getFullYear()
  ) {
    return true;
  }

  return false;
};
