import React, { Component } from 'react';
import Overlay from './Overlay';
import Dashboard from './Dashboard';

class Home extends Component {
  render() {
    const data = JSON.parse(localStorage.getItem('loginData'));
    return (
      <React.Fragment>
        <Overlay imageUrl={require('../../img/home.jpg')} />
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Home;
