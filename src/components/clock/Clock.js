import  { useState, useEffect } from 'react';
import Dashboard from '../home/Dashboard';

function Clock() {
  const [timeString, setTimeString] = useState('')
  const [dateString, setDateString] = useState('')

  useEffect(() => {
    showClock();
    showDate();
    setInterval(showClock, 1000);
  }, [])

  const showDate = () => {
    const dateObject = new Date();
    const date = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const dateString = `${date}-${month}-${year}`;
    setDateString(dateString)
  };

  const addZero = (n) => (n < 10 ? '0' + n : n)

  const showClock = () => {
    const dateObject = new Date();
    const hours = dateObject.getHours();
    const minutes = addZero(dateObject.getMinutes());
    const seconds = addZero(dateObject.getSeconds());
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const timeString = `${hours}:${minutes}:${seconds} ${amPm}`;
    setTimeString(timeString)
  };

  return (
    <>
       <div className='m-4'>
          <div className='bg-primary p-4 text-secondary rounded-md shadow-md'>
            <h2 className='text-4xl select-none'>{timeString}</h2>
            <p className='text-xl select-none'>{dateString}</p>
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Clock
