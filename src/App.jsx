import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';

import {
  getWeekStartDate,
  generateWeekRange,
  getDateTime,
} from '../src/utils/dateUtils.js';

import eventsList from './gateway/events.js';

import moment from 'moment';

import './common.scss';

const App = () => {
  const [events, setEvents] = useState(eventsList);
  const [todayDate, setTodayDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const weekDates = generateWeekRange(getWeekStartDate(todayDate));

  function onNavigationBtnClick(motion) {
    let copyDate = moment(new Date(todayDate));

    if (motion === 'left') {
      copyDate.subtract(7, 'days');
    } else if (motion === 'right') {
      copyDate.add(7, 'days');
    } else {
      copyDate = new Date();
    }

    setTodayDate(() => new Date(copyDate));
  }

  function onModalVisibleChange() {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  }

  function onEventCreate(formData) {
    const { title, date, startTime, endTime, description } = formData;

    const dateFrom = getDateTime(date, startTime);
    const dateTo = getDateTime(date, endTime);

    setEvents((prevEvents) => [
      ...prevEvents,
      {
        id: Math.random(),
        title,
        dateFrom,
        dateTo,
        description,
      },
    ]);

    setIsModalOpen(false);
  }

  function onEventDelete(eventId) {
    const filteredEventsList = events.filter(({ id }) => id !== eventId);

    setEvents(() => filteredEventsList);
  }

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
