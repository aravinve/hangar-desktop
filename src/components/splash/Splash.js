import {useState} from 'react'
import image from '../../img/Splash_Frame.png'
const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
const currRemote = electron.remote

function Splash() {
  const [hangarId, setHangarId] = useState('')
  const [hangarPin, setHangarPin] = useState('')
  const [showForm, setShowForm] = useState(false)
  const toggleForm = () => {
    setShowForm(!showForm)
  };
  const handleChange = (e) => {
    if(e.target.name === "hangarId"){
      setHangarId(e.target.value)
    } else {
      setHangarPin(e.target.value)
    }
  };
  const showHome = (e) => {
    e.preventDefault();
    ipcRenderer.send('login', {hangarId, hangarPin});
  };
  const exitApp = () => {
    let currentWindow = currRemote.getCurrentWindow();
    currentWindow.close();
  };
  return (
    <div className='container' style={styleSplash}>
    {showForm ? (
      <form
        className='box center-form-box'
        method='POST'
        onSubmit={showHome}
      >
        <div className='field'>
          <div className='control'>
            <input
              type='text'
              id='hangarId'
              name='hangarId'
              placeholder='Hangar Id'
              onChange={handleChange}
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
              onChange={handleChange}
              className='input'
              required
            />
          </div>
        </div>
        <div className='field'>
          <div className='control'>
            <button
              className='button is-h-blue is-outlined'
              onClick={toggleForm}
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
        <button className='button is-h-blue' onClick={toggleForm}>
          Setup Hangar
        </button>
        <br />
        <button className='button is-h-blue' onClick={exitApp}>
          Exit
        </button>
      </div>
    )}
  </div>
  )
}

export default Splash

const styleSplash = {
  height: '100vh',
  margin: '0px',
  backgroundImage: 'url(' + image + ')',
};
