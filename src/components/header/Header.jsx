import React from 'react';
import PropTypes from 'prop-types';

import { getDisplayedMonth } from '../../utils/dateUtils.js';

import './header.scss';

const Header = ({ onNavigationBtnClick, onModalOpen, todayDate }) => {
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={onModalOpen}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={() => onNavigationBtnClick('today')}
        >
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={() => onNavigationBtnClick('left')}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={() => onNavigationBtnClick('right')}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {getDisplayedMonth(todayDate)}
        </span>
      </div>
    </header>
  );
};

Header.propTypes = {
  onNavigationBtnClick: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  todayDate: PropTypes.object.isRequired,
};

export default Header;
