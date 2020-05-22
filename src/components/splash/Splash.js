import React from 'react';
import image from '../../img/Splash_Frame.png';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

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
    console.log(this.state);
    ipcRenderer.send('ready-to-show');
  };
  render() {
    return (
      <div
        className='row justify-content-center align-items-center'
        style={styleSplash}
      >
        {this.state.showForm ? (
          <form className='card m-2' method='POST' onSubmit={this.showHome}>
            <div className='card-body'>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='hangarName'
                  name='hangarName'
                  placeholder='Hangar Name'
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  id='hangarEmail'
                  name='hangarEmail'
                  placeholder='Email'
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  id='hangarPin'
                  name='hangarPin'
                  placeholder='Pin'
                  maxLength='4'
                  pattern='[0-9]{4}'
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <button
                  type='submit'
                  className='btn btn-outline-primary btn-block mt-2'
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        ) : (
          <button className='btn btn-primary btn-sm' onClick={this.toggleForm}>
            Setup Hangar
          </button>
        )}
      </div>
    );
  }
}

const styleSplash = {
  width: '100%',
  height: '100vh',
  margin: '0px',
  backgroundImage: 'url(' + image + ')',
};

export default Splash;
