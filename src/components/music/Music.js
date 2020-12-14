import React, { Component } from 'react';
import Dashboard from '../home/Dashboard';
import overlayImage from '../../img/under_construction.png'

class Music extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className='container mt-16 text-center'
        >
          <h1 className='text-5xl text-primary mb-4'>Under Construction</h1>
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
  backgroundImage: 'url(' + overlayImage + ')',
  backgroundSize: 'cover',
  backgroundClip: 'border-box',
  backgroundPosition: 'center',
  opacity: '100%',
  backgroundRepeat: 'no-repeat',
};

export default Music;
