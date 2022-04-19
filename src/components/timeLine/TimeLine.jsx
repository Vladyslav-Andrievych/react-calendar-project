import React, { Component } from 'react';

import { getMinutesFromDayStart } from '../../utils/dateUtils.js';

import './time-line.scss';

class TimeLine extends Component {
  state = {
    minutes: getMinutesFromDayStart(),
    seconds: new Date().getSeconds(),
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      const { minutes, seconds } = this.state;

      if (seconds === 59) {
        this.setState({
          minutes: minutes + 1,
          seconds: 0,
        });
      } else {
        this.setState({
          seconds: seconds + 1,
        });
      }
    }, 1000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.minutes === nextState.minutes) {
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { minutes } = this.state;

    const styles = {
      top: `${minutes - 5}px`,
    };

    return (
      <div className="time-line" style={styles}>
        <span className="time-line__circle"></span>
        <hr className="time-line__line" />
      </div>
    );
  }
}

export default TimeLine;
