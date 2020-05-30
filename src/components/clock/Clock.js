import React, { Component } from 'react';
import Dashboard from '../home/Dashboard';

class Clock extends Component {
  render() {
    return (
      <React.Fragment>
        <div>Clock</div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Clock;
