import  { useState } from 'react';
import Dashboard from '../home/Dashboard';
import useTime from './useTime';
import timezones from 'moment-timezone'
import SidePane from './SidePane'
import TimezoneSelect from './TimezoneSelect';
import displayNotification from '../../Notification';

function Clock() {
  const [timezone, setTimezone] = useState(timezones.tz.guess())
  const [alarmMinTime, setAlarmMinTime] = useState(0)
  const [alarmSecTime, setAlarmSecTime] = useState(0)
  const [alert, setAlert] = useState(false)

  const now = useTime(1000, timezone)

  const handleChange = (e) => {
    setTimezone(e.target.value)
    displayNotification('Time Zone Changed Successfully',
    `Time Zone has been modified to ${e.target.value}`, true)
  }

  const timezoneList =
        timezones.tz.names().length > 0
        ? timezones.tz.names().map((zone) => (
          <>
            <TimezoneSelect zone={zone} key={zone} />
            </>
          ))
        : null

  const setAlarm = (e) => {
      const targetBtn = e.target
      const alarmTotalTime = ((alarmMinTime * 60) + (alarmSecTime)) * 1000
      if(alarmTotalTime > 0){
        targetBtn.style.display = 'none'
        setTimeout(() => {
          displayNotification('Hangar Alarm', 'Alarm !!!!', false)
          targetBtn.style.display = 'flex'
          setAlarmMinTime(0)
          setAlarmSecTime(0)
          setAlert(false)
          document.getElementById('min-hand').value = 0
          document.getElementById('sec-hand').value = 0
        }, alarmTotalTime, targetBtn)
      } else {
        setAlert(true)
      }
  }

  const handleAlarmInputChange = (e) => {
    if(e.target.name === 'minHand' && e.target.value > 0){
      setAlarmMinTime(e.target.value)
      setAlert(false)
    } else if(e.target.name === 'secHand' && e.target.value >= 0) {
      setAlarmSecTime(e.target.value)
      setAlert(false)
    } else{
      setAlert(true)
    }
  }

  const alertMessage = alert ? (<div className='flex flex-col text-center justify-center mt-2'>
  <h2 className='text-2xl text-red-600'> {'Please add a valid Alarm Time!!!'} </h2>
</div>) : null

  return (
    <>
       <div className='flex flex-row items-center mt-48 mb-8 px-4 py-6 justify-center'>
         <SidePane timezoneList={timezoneList} handleChange={handleChange}
         alarmMinTime={alarmMinTime} setAlarm={setAlarm} handleAlarmInputChange={handleAlarmInputChange} />
          <div className="flex flex-col">
            <div className='bg-primary p-4 text-secondary rounded-md shadow-md'>
              <p className='text-4xl select-none'>{now}</p>
            </div>
            {alertMessage}
            
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Clock
