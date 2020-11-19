import React, { Component } from 'react';
import image from '../../img/Logo_Hangar.png';
import { Link } from 'react-router-dom';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Dashboard extends Component {
  showSplash = () => {
    localStorage.clear();
    ipcRenderer.send('logout');
  };

  toggleSettings = () => {
    this.props.toggleSettings();
  };

  createStickyNote = () => {
    this.props.showStickyNote();
  };

  render() {
    const flag = window.location.href.includes('/home');
    return (
      <nav className='navbar is-fixed-bottom' role='navigation'>
        <div className='navbar-brand'>
          <Link className='navbar-item' to='/home'>
            <img src={image} style={{ maxHeight: '3.75rem' }} />
          </Link>
        </div>
        <div className='navbar-menu'>
          <div className='navbar-start'>
            <div className='navbar-item has-dropdown has-dropdown-up is-hoverable'>
              <a className='navbar-link'>Explore</a>
              <div className='navbar-dropdown'>
                <Link className='navbar-item' to='/news'>
                  News
                </Link>
                <Link className='navbar-item' to='/music'>
                  Music
                </Link>
                <Link className='navbar-item' to='/cook'>
                  Cook
                </Link>
                <Link className='navbar-item' to='/gallery'>
                  Gallery
                </Link>
                <Link className='navbar-item' to='/maps'>
                  Maps
                </Link>
                <Link className='navbar-item' to='/weather'>
                  Weather
                </Link>
              </div>
            </div>
            <div className='navbar-item has-dropdown has-dropdown-up is-hoverable'>
              <a className='navbar-link'>Tools</a>
              <div className='navbar-dropdown'>
                <Link className='navbar-item' to='/calculator'>
                  Calculator
                </Link>
                <Link className='navbar-item' to='/calendar'>
                  Calendar
                </Link>
                <Link className='navbar-item' to='/clock'>
                  Clock
                </Link>
                <Link className='navbar-item' to='/converter'>
                  Converter
                </Link>
                <Link className='navbar-item' to='/dictionary'>
                  Dictionary
                </Link>
                <hr className='navbar-divider' />
                <Link className='navbar-item' to='/todoist'>
                  Todoist
                </Link>
                <Link className='navbar-item' to='/notes'>
                  Notes
                </Link>
                <Link className='navbar-item' to='/board'>
                  Board
                </Link>
              </div>
            </div>
            <div className='navbar-item has-dropdown has-dropdown-up is-hoverable'>
              <Link className='navbar-link'>Social</Link>
              <div className='navbar-dropdown'>
                <Link className='navbar-item' to='/reddit'>
                  Reddit
                </Link>
                <Link className='navbar-item' to='/wikipedia'>
                  Wikipedia
                </Link>
                <Link className='navbar-item' to='/hackernews'>
                  Hacker News
                </Link>
                <hr className='navbar-divider' />
                <Link className='navbar-item' to='/covid'>
                  Covid-19 Tracker
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              {flag ? (
                <React.Fragment>
                  <button className='button' onClick={this.createStickyNote}>
                    <i className='fas fa-sticky-note'></i>
                  </button>
                  <button className='button' onClick={this.toggleSettings}>
                    <i className='fas fa-cogs'></i>
                  </button>
                </React.Fragment>
              ) : null}

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

export default Dashboard;
