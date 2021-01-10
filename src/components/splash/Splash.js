import {useState} from 'react'
import image from '../../img/Splash_Frame.png'
const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

function Splash() {
  const [hangarId, setHangarId] = useState('')
  const [hangarPin, setHangarPin] = useState('')
  const [showForm, setShowForm] = useState(false)

  const styleSplash = {
    backgroundImage: 'url(' + image + ')',
  }

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const handleChange = (e) => {
    if(e.target.name === "hangarId"){
      setHangarId(e.target.value)
    } else {
      setHangarPin(e.target.value)
    }
  }

  const showHome = (e) => {
    e.preventDefault()
    ipcRenderer.send('login', {hangarId, hangarPin})
  }

  const exitApp = () => {
    ipcRenderer.send('quit-app')
  }
  
  return (
    <div className='container m-0 h-screen' style={styleSplash}>
    {showForm ? (
      <form
        className='p-4 shadow-lg bg-secondary rounded-md center-form-box'
        method='POST'
        onSubmit={showHome}>
        <div className='mt-1 mb-3 bg-white relative rounded-md shadow-md'>
          <div className='text-center bg-secondary text-md inline-flex justify-center'>
          <i className="fas fa-user mt-3 mb-2 ml-2 mr-2 text-primary"></i>
            <input
              type='text'
              id='hangarId'
              name='hangarId'
              placeholder='Hangar Id'
              onChange={handleChange}
              className='block w-full border-gray-300 px-4 py-2 focus:outline-none'
              required
            />
          </div>
        </div>
        <div className='mt-1 mb-3 bg-white relative rounded-md shadow-md'>
          <div className='text-center bg-secondary text-md inline-flex justify-center'>
          <i className="fas fa-key mt-3 mb-2 ml-2 mr-2 text-primary"></i>
            <input
              type='password'
              id='hangarPin'
              name='hangarPin'
              placeholder='Hangar Pin'
              maxLength='4'
              pattern='[0-9]{4}'
              onChange={handleChange}
              className='block w-full border-gray-300 px-4 py-2 focus:outline-none'
              required
            />
          </div>
        </div>
        <div className='mt-4 relative'>
          <div className='text-center text-md'>
            <button
              className='cursor-pointer py-2 px-4 rounded-md shadow-md focus:outline-none mr-8 is-h-blue is-outlined'
              onClick={toggleForm}>
              <i className="fas fa-arrow-circle-left mr-2"></i>Back
            </button>
            <button
              type='submit'
              className='cursor-pointer py-2 px-4 rounded-md shadow-md focus:outline-none ml-8 is-h-blue is-outlined'>
              Login <i className="fas fa-arrow-circle-right ml-2"></i>
            </button>
          </div>
        </div>
      </form>
    ) : (
      <div className='center-box'>
        <button className='bg-primary cursor-pointer text-secondary text-base py-2 px-4 rounded-md shadow-md focus:outline-none' onClick={toggleForm}>
        <i className="fas fa-plane-departure mr-2"></i> Enter
          </button>
          <br />
          <button className='bg-primary cursor-pointer text-secondary text-base py-2 px-4 rounded-md focus:outline-none' id='exit-app' onClick={exitApp}>
          <i className="fas fa-sign-out-alt mr-2"></i> Exit
          </button>
      </div>
    )}
  </div>
  )
}

export default Splash
