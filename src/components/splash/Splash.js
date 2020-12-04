import React from 'react'
import image from '../../img/Splash_Frame.png'
const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
const currRemote = electron.remote

class Splash extends React.Component {
  state = {
    hangarName: '',
    hangarEmail: '',
    hangarPin: '',
    isDarkMode: false,
    showForm: false,
  };
  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  showHome = (e) => {
    e.preventDefault();
    localStorage.setItem('loginData', JSON.stringify(this.state));
    ipcRenderer.send('login', this.state);
  };
  exitApp = () => {
    let currentWindow = currRemote.getCurrentWindow();
    currentWindow.close();
  };
  render() {
    return (
      <div className='container' style={styleSplash}>
        {this.state.showForm ? (
          <form
            className='box center-form-box'
            method='POST'
            onSubmit={this.showHome}
          >
            <div className='field'>
              <div className='control'>
                <input
                  type='text'
                  id='hangarName'
                  name='hangarName'
                  placeholder='Hangar Name'
                  onChange={this.handleChange}
                  className='input'
                  required
                />
              </div>
            </div>
            <div className='field'>
              <div className='control'>
                <input
                  type='email'
                  id='hangarEmail'
                  name='hangarEmail'
                  placeholder='Email'
                  onChange={this.handleChange}
                  className='input'
                  required
                />
              </div>
            </div>
            <div className='field'>
              <div className='control'>
                <input
                  type='password'
                  id='hangarPin'
                  name='hangarPin'
                  placeholder='4 Digit Pin'
                  maxLength='4'
                  pattern='[0-9]{4}'
                  onChange={this.handleChange}
                  className='input'
                  required
                />
              </div>
            </div>
            <div className='field'>
              <div className='control'>
                <button
                  className='button is-h-blue is-outlined'
                  onClick={this.toggleForm}
                  style={{ marginRight: '1.5rem' }}
                >
                  Back
                </button>
                <button
                  type='submit'
                  className='button is-h-blue is-outlined'
                  style={{ marginLeft: '1.5rem' }}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className='center-box'>
            <button className='button is-h-blue' onClick={this.toggleForm}>
              Setup Hangar
            </button>
            <br />
            <button className='button is-h-blue' onClick={this.exitApp}>
              Exit
            </button>
          </div>
        )}
      </div>
    );
  }
}

const styleSplash = {
  height: '100vh',
  margin: '0px',
  backgroundImage: 'url(' + image + ')',
};

export default Splash;
