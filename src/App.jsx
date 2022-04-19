import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';

import {
  getWeekStartDate,
  generateWeekRange,
  getDateTime,
  changeWeekDate,
} from '../src/utils/dateUtils.js';
import { eventValidation } from './utils/eventUtils.js';
import { createEvent, fetchEvents, deleteEvent } from './gateway/gateway.js';

import './common.scss';

const App = () => {
  const [events, updateEvents] = useEventsState();
  const [todayDate, setTodayDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onNavigationBtnClick(motion) {
    setTodayDate(() => changeWeekDate(todayDate, motion));
  }

  function onModalVisibleChange() {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  }

  function onEventCreate(formData) {
    const { title, date, startTime, endTime, description } = formData;

    const dateFrom = getDateTime(date, startTime);
    const dateTo = getDateTime(date, endTime);

    const newEvent = {
      title,
      dateFrom,
      dateTo,
      description,
    };

    const isEventValid = eventValidation(newEvent, events);

    if (isEventValid) {
      createEvent(newEvent)
        .then(() => {
          updateEvents();
          setIsModalOpen((isModalOpen) => !isModalOpen);
        })
        .catch((error) => alert(error.message));
    } else {
      alert('Error! Event at this time already exist!');
    }
  }

  function onEventDelete(eventId) {
    deleteEvent(eventId)
      .then(() => updateEvents())
      .catch((error) => alert(error.message));
  }

  const weekDates = generateWeekRange(getWeekStartDate(todayDate));

  return (
    <>
      <Header
        todayDate={todayDate}
        onNavigationBtnClick={onNavigationBtnClick}
        onModalOpen={onModalVisibleChange}
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        onEventDelete={onEventDelete}
      />
      {isModalOpen && (
        <Modal
          onModalClose={onModalVisibleChange}
          onEventCreate={onEventCreate}
        />
      )}
    </>
  );
};

export default App;

function useEventsState() {
  const [events, setEvents] = useState([]);

  function getEvents() {
    fetchEvents()
      .then((eventsList) => setEvents(() => eventsList))
      .catch((error) => alert(error.message));
  }

  useEffect(() => {
    getEvents();
  }, []);

  return [events, getEvents];
}
