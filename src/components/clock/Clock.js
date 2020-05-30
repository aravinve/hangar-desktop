import React, { Component } from 'react';
import Dashboard from '../home/Dashboard';

class Clock extends Component {
  state = {
    timeString: '',
    dateString: '',
  };
  componentDidMount = () => {
    this.showClock();
    this.showDate();
    setInterval(this.showClock, 1000);
  };

  showDate = () => {
    const dateObject = new Date();
    const date = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const dateString = `${date}-${month}-${year}`;
    this.setState({ dateString: dateString });
  };

  addZero = (n) => (n < 10 ? '0' + n : n);

  showClock = () => {
    const dateObject = new Date();
    const hours = dateObject.getHours();
    const minutes = this.addZero(dateObject.getMinutes());
    const seconds = this.addZero(dateObject.getSeconds());
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const timeString = `${hours}:${minutes}:${seconds} ${amPm}`;
    this.setState({ timeString: timeString });
  };

  render() {
    return (
      <React.Fragment>
        <div className='container' style={{ marginTop: '4rem' }}>
          <div className='box has-background-light'>
            <h2 className='is-title'>{this.state.timeString}</h2>
            <p className='is-subtitle'>{this.state.dateString}</p>
          </div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Clock;
