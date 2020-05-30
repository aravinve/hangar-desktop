import React, { Component } from 'react';
import Dashboard from '../../home/Dashboard';
import { Link } from 'react-router-dom';

class Hangman extends Component {
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
          </div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Hangman;
