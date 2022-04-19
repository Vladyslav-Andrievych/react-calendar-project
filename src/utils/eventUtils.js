export const reformeEventObj = (event) => ({
  ...event,
  dateFrom: new Date(event.dateFrom),
  dateTo: new Date(event.dateTo),
});

export const eventValidation = (newEvent, eventsList) => {
  const { dateFrom, dateTo } = newEvent;

  for (let event of eventsList) {
    // validation on the two events in same time
    if (dateFrom < event.dateTo && dateTo > event.dateFrom) {
      return false;
    }
  }

  return true;
};
