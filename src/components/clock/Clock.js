import  { useState } from 'react';
import Dashboard from '../home/Dashboard';
import useTime from './useTime';
import timezones from 'moment-timezone'
import SidePane from './SidePane'
import TimezoneSelect from './TimezoneSelect';
import displayNotification from '../../Notification';

function Clock() {
  const [timezone, setTimezone] = useState(timezones.tz.guess())
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

  return (
    <>
       <div className='flex flex-row items-center mt-40 mb-8 px-4 py-6 justify-center'>
         <SidePane timezoneList={timezoneList} handleChange={handleChange} />
          <div className='bg-primary p-4 text-secondary rounded-md shadow-md'>
            <p className='text-4xl select-none'>{now}</p>
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Clock
