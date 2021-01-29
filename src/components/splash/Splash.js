import {useState} from 'react'
import firebase from '../../firebase'
import splashDark from '../../img/splash_frame_dark.png'
import splashLight from '../../img/splash_frame_light.png'
const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

function Splash() {
  const [hangarEmail, setHangarEmail] = useState('')
  const [hangarId, setHangarId] = useState('')
  const [hangarPin, setHangarPin] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [targetSplashImage, setTargetSplashImage] = useState(splashLight)
  const [alert, setAlert] = useState('')

  const resetAlert = () => {
    setTimeout(() => {
        setAlert('')
    }, 4000)
  }

  ipcRenderer.on('userData', (event, arg) => {
    const preferences = arg
    const prefTheme = preferences !== null && preferences['theme'] && preferences['theme'] !== null
    document.documentElement.setAttribute('data-theme', prefTheme ? 'dark' : 'light')
    const targetSplash = prefTheme ? splashDark : splashLight
    setTargetSplashImage(targetSplash)
  });

  const alertMessage = alert !== '' ? (<>
      <div className='flex flex-row bg-secondary rounded-sm shadow-md my-2 justify-center px-8'>
          <div className='flex-1 text-primary text-lg select-none'>
              {alert}
          </div>
      </div>
  </>) : null

  const styleSplash = {
    backgroundImage: 'url(' + targetSplashImage + ')',
  }

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const handleChange = (e) => {
    if(e.target.name === "hangarId"){
      setHangarId(e.target.value)
    } else if(e.target.name === "hangarPin") {
      setHangarPin(e.target.value)
    } else {
      setHangarEmail(e.target.value)
    }
  }

  const validateData = (hangarData) => {
    if(hangarData !== null){
      if(hangarData.hangarData.length > 0){
        const targetAccount = hangarData.hangarData.find(hd => hd.hangarId === hangarId && hd.hangarPin === hangarPin)
        if(targetAccount !== undefined){
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    } else {
      return false
    }
  }

  const showHome = (e) => {
    e.preventDefault()
    firebase.firestore().collection('hangaruser').onSnapshot(serverUpdate => {
        serverUpdate.docs.forEach(doc => {
            const hangarDataFromStore = doc.data()
            if(hangarDataFromStore['email'] === hangarEmail){
              if(validateData(hangarDataFromStore)){
                setAlert('Hangar: [Login Success]')
                resetAlert()
                const hangarData = {
                  displayName: hangarDataFromStore.displayName,
                  email: hangarDataFromStore.email,
                  photoUrl: hangarDataFromStore.photoUrl,
                  planName: hangarDataFromStore.planName
                }
                ipcRenderer.send('login', {hangarId, hangarPin, hangarEmail, hangarData})
              } else {
                setAlert('Hangar: [Login Error]')
                resetAlert()
              }
            }
        })
    })
   
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
        <div className='mt-1 mb-3 bg-body relative border-primary rounded-md shadow-md'>
        <div className='text-center bg-secondary text-md rounded-md inline-flex justify-center'>
        <i className="fas fa-envelope mt-3 mb-2 ml-2 mr-2 text-primary"></i>
          <input
            type='text'
            id='hangarEmail'
            name='hangarEmail'
            placeholder='Hangar Email'
            onChange={handleChange}
            className='block w-full border-0 px-4 py-2 focus:outline-none'
            required
          />
        </div>
        </div>
        <div className='mt-1 mb-3 bg-body relative border-primary rounded-md shadow-md'>
          <div className='text-center bg-secondary text-md rounded-md inline-flex justify-center'>
          <i className="fas fa-user mt-3 mb-2 ml-2 mr-2 text-primary"></i>
            <input
              type='text'
              id='hangarId'
              name='hangarId'
              placeholder='Hangar Id'
              onChange={handleChange}
              className='block w-full border-0 px-4 py-2 focus:outline-none'
              required
            />
          </div>
        </div>
        <div className='mt-1 mb-3 bg-body relative border-primary rounded-md shadow-md'>
          <div className='text-center bg-secondary text-md rounded-md inline-flex justify-center'>
          <i className="fas fa-key mt-3 mb-2 ml-2 mr-2 text-primary"></i>
            <input
              type='password'
              id='hangarPin'
              name='hangarPin'
              placeholder='Hangar Pin'
              maxLength='4'
              pattern='[0-9]{4}'
              onChange={handleChange}
              className='block w-full border-0 px-4 py-2 focus:outline-none'
              required
            />
          </div>
        </div>
        {alertMessage}
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
