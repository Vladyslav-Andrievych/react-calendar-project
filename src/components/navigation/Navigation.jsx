import React from 'react';

import { days } from '../../utils/dateUtils.js';

import { isToday } from './defineToday.js';
import classNames from 'classnames';

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        const classes = classNames('calendar__day-label', 'day-label', {
          'day-label_today': isToday(dayDate),
        });

        return (
          <div className={classes} key={dayDate.getDate()}>
            <span className="day-label__day-name">
              {days[dayDate.getDay()]}
            </span>
            <span className="day-label__day-number">{dayDate.getDate()}</span>
          </div>
        );
      })}
    </header>
  );
};

export default Navigation;
