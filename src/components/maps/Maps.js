import React, { Component } from 'react';
import Dashboard from '../home/Dashboard';

class Maps extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className='container'
          style={{ marginTop: '4rem', textAlign: 'center' }}
        >
          <h1 className='is-title'>Under Construction</h1>
          <div className='container' style={styleOverlay}></div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

const styleOverlay = {
  width: '50%',
  height: '60vh',
  backgroundImage: 'url(' + require('../../img/under_construction.png') + ')',
  backgroundSize: 'cover',
  backgroundClip: 'border-box',
  backgroundPosition: 'center',
  opacity: '100%',
  backgroundRepeat: 'no-repeat',
  WebkitAnimation: 'fadein 2s',
  MozAnimation: 'fadein 2s',
  animation: 'fadein 2s',
};

export default Maps;
