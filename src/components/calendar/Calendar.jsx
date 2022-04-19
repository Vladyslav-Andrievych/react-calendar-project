import React from 'react';
import Navigation from './../navigation/Navigation.jsx';
import Week from '../week/Week.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';

import PropTypes from 'prop-types';

import './calendar.scss';

const Calendar = ({ weekDates, events, onEventDelete }) => {
  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            onEventDelete={onEventDelete}
          />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  weekDates: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  onEventDelete: PropTypes.func.isRequired,
};

export default Calendar;
