import moment from 'moment';

export const getWeekStartDate = (date) => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference =
    dayOfWeek === 0
      ? -6 // for Sunday
      : 1 - dayOfWeek;

  const monday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = (startDate) => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

export const formatMins = (mins) => {
  return mins < 10 ? `0${mins}` : mins;
};

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getDisplayedMonth = (date) => {
  const weekStart = getWeekStartDate(date);
  const copyWeekStart = moment(weekStart);
  const weekEnd = new Date(copyWeekStart.add(6, 'days'));

  const monthStart = weekStart.getMonth();
  const yearStart = weekStart.getFullYear();
  const monthEnd = weekEnd.getMonth();
  const yearEnd = weekEnd.getFullYear();

  const isSameMonth = monthStart === monthEnd;
  if (isSameMonth) {
    return `${months[monthStart]} ${yearStart}`;
  }

  const isSameYear = yearStart === yearEnd;
  return isSameYear
    ? `${months[monthStart]} - ${months[monthEnd]} ${yearStart}`
    : `${months[monthStart]} ${yearStart} - ${months[monthEnd]} ${yearEnd}`;
};

export const defineToday = (dayDate) => {
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

export const getMinutesFromDayStart = () => {
  const time = new Date();

  return time.getHours() * 60 + time.getMinutes();
};

export const changeWeekDate = (currentWeekDate, motion) => {
  let copyDate = moment(new Date(currentWeekDate));

  if (motion === 'left') {
    copyDate.subtract(7, 'days');
  } else if (motion === 'right') {
    copyDate.add(7, 'days');
  } else {
    copyDate = new Date();
  }

  return new Date(copyDate);
};
