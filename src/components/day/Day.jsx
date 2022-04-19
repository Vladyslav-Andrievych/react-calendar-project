import React from 'react';
import Hour from '../hour/Hour.jsx';
import TimeLine from '../timeLine/TimeLine.jsx';

import PropTypes from 'prop-types';

import { defineToday as isToday } from '../../utils/dateUtils.js';

import './day.scss';

const Day = ({ dataDay, dayEvents, onEventDelete }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay.getDate()}>
      {isToday(dataDay) && <TimeLine />}
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            onEventDelete={onEventDelete}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.object.isRequired,
  dayEvents: PropTypes.array.isRequired,
  onEventDelete: PropTypes.func.isRequired,
};

export default Day;
