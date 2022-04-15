import React, { useState, useEffect, useRef } from 'react';

import Popup from '../popup/Popup.jsx';

import './event.scss';

const Event = ({ height, marginTop, title, time, onEventDelete, id }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const [isVisiablePopup, setIsVisiablePopup] = useState(false);
  function onPupupClose() {
    setIsVisiablePopup(false);
  }

  const eventElem = useRef(null);
  const popupLocation = useEventListenerOnEventClick(eventElem);

  return (
    <>
      <div
        ref={eventElem}
        style={eventStyle}
        className="event"
        onClick={() => setIsVisiablePopup(!isVisiablePopup)}
      >
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
      {isVisiablePopup && (
        <Popup
          id={id}
          onEventDelete={onEventDelete}
          onPupupClose={onPupupClose}
          popupLocation={popupLocation}
        />
      )}
    </>
  );
};

export default Event;

function useEventListenerOnEventClick(eventRef) {
  const [popupLocation, setPopupLocation] = useState({
    clientX: null,
    clientY: null,
  });

  useEffect(() => {
    function onEventClick(event) {
      setPopupLocation(() => ({
        clientX: event.clientX,
        clientY: event.clientY,
      }));
    }

    eventRef.current.addEventListener('click', onEventClick);

    //memory leak?? when i tries to call removeEventListener i gets error "cannot read
    //properties of null (reading 'removeEventListener')

    // return () => {
    //   eventRef.current.removeEventListener('click', onEventClick);
    // };
  }, []);

  return popupLocation;
}
