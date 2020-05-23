import React, { Component } from 'react';
import image from '../../img/Logo_Hangar.png';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export default class Dashboard extends Component {
  showSplash = () => {
    localStorage.clear();
    ipcRenderer.send('logout');
  };
  render() {
    return (
      <nav className='navbar is-fixed-bottom' role='navigation'>
        <div className='navbar-brand'>
          <a className='navbar-item' href='#'>
            <img src={image} style={{ maxHeight: '3.75rem' }} />
          </a>
        </div>
        <div className='navbar-menu'>
          <div className='navbar-start'>
            <div className='navbar-item has-dropdown has-dropdown-up is-hoverable'>
              <a className='navbar-link'>Explore</a>
              <div className='navbar-dropdown'>
                <a className='navbar-item' href='#'>
                  Read
                </a>
                <a className='navbar-item' href='#'>
                  Listen
                </a>
                <a className='navbar-item' href='#'>
                  Watch
                </a>
                <a className='navbar-item' href='#'>
                  Cook
                </a>
                <a className='navbar-item' href='#'>
                  Exercise
                </a>
                <a className='navbar-item' href='#'>
                  Play
                </a>
              </div>
            </div>
            <div className='navbar-item has-dropdown has-dropdown-up is-hoverable'>
              <a className='navbar-link'>Tools</a>
              <div className='navbar-dropdown'>
                <a className='navbar-item' href='#'>
                  Calculator
                </a>
                <a className='navbar-item' href='#'>
                  Calendar
                </a>
                <a className='navbar-item' href='#'>
                  Clock
                </a>
                <a className='navbar-item' href='#'>
                  Converter
                </a>
                <hr className='navbar-divider' />
                <a className='navbar-item' href='#'>
                  Todoist
                </a>
              </div>
            </div>
            <div className='navbar-item has-dropdown has-dropdown-up is-hoverable'>
              <a className='navbar-link'>Social</a>
              <div className='navbar-dropdown'>
                <a className='navbar-item' href='#'>
                  Reddit
                </a>
                <a className='navbar-item' href='#'>
                  Oxford Dictionary
                </a>
                <a className='navbar-item' href='#'>
                  Wikipedia
                </a>
                <a className='navbar-item' href='#'>
                  Hacker News
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <a className='button' href='#'>
                <i className='fas fa-cog'></i>
              </a>
              <button className='button' onClick={this.showSplash}>
                <i className='fas fa-sign-out-alt'></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
