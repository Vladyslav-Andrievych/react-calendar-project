import React, { useState } from 'react';

import './modal.scss';

const Modal = ({ onModalClose, onEventCreate }) => {
  const [formInputs, setFormInputs] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
  });

  function onInputChange(event) {
    const { name, value } = event.target;

    setFormInputs((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={onModalClose}>
            +
          </button>
          <form
            className="event-form"
            onSubmit={(event) => {
              event.preventDefault();
              onEventCreate(formInputs);
            }}
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={formInputs.title}
              onChange={onInputChange}
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={formInputs.date}
                onChange={onInputChange}
                required
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={formInputs.startTime}
                onChange={onInputChange}
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={formInputs.endTime}
                onChange={onInputChange}
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={formInputs.description}
              onChange={onInputChange}
            />
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
