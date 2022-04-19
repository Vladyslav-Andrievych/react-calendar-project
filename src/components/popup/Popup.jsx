import React from 'react';
import PropTypes from 'prop-types';

import './popup.scss';

const Popup = ({ id, onEventDelete, popupLocation, onPupupClose }) => {
  const styles = {
    top: `${popupLocation.clientY}px`,
    left: `${popupLocation.clientX}px`,
  };

  return (
    <div className="overlay">
      <div className="popup" style={styles}>
        <button
          className="button popup__delete-btn"
          onClick={() => onEventDelete(id)}
        >
          Delete
        </button>
        <button className="popup__close-btn" onClick={onPupupClose}>
          +
        </button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  id: PropTypes.string.isRequired,
  onEventDelete: PropTypes.func.isRequired,
  popupLocation: PropTypes.object.isRequired,
  onPupupClose: PropTypes.func.isRequired,
};

export default Popup;
