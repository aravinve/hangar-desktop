import React, { Component } from 'react';
import Dashboard from '../../home/Dashboard';
import { Link } from 'react-router-dom';
import Snake from './Snake';

class SnakeApp extends Component {
  state = {
    snakeDots: [
      [0, 0],
      [2, 0],
    ],
  };
  render() {
    return (
      <React.Fragment>
        <div
          className='container'
          style={{ margin: 'auto', marginTop: '4rem' }}
        >
          <div className='columns'>
            <Link className='button is-dark is-small' to='/play'>
              Back
            </Link>
            <div style={gameArea}>
              <Snake snakeDots={this.state.snakeDots} />
            </div>
          </div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

const gameArea = {
  position: 'fixed',
  margin: '50px auto',
  width: '1200px',
  height: '500px',
  border: '2px solid #000',
};

export default SnakeApp;
