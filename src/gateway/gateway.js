import { reformeEventObj } from '../utils/eventUtils.js';

const baseUrl = 'https://61ea82407bc0550017bc67cb.mockapi.io/api/v1/events';

export const fetchEvents = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    const errorText =
      response.status >= 500
        ? `Internal Server Error. Can't display events`
        : 'Failed to load data';
    throw new Error(errorText);
  }

  const eventsList = await response.json();
  const reformedEventsList = eventsList.map((event) => reformeEventObj(event));

  return reformedEventsList;
};

export const createEvent = async (newEvent) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(newEvent),
  });

  if (!response.ok) {
    const errorText =
      response.status >= 500
        ? 'Internal Server Error'
        : 'Failed to create event';
    throw new Error(errorText);
  }
};

export const deleteEvent = async (eventId) => {
  const response = await fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText =
      response.status >= 500
        ? 'Internal Server Error'
        : 'Failed to delete event';
    throw new Error(errorText);
  }
};
