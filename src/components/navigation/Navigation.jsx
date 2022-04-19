import React from 'react';

import { days, defineToday as isToday } from '../../utils/dateUtils.js';

import classNames from 'classnames';
import PropTypes from 'prop-types';

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

Navigation.propTypes = {
  weekDates: PropTypes.array.isRequired,
};

export default Navigation;
