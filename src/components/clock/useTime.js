import  { useState, useEffect } from 'react';
import timezones from 'moment-timezone'

const useTime = (refreshRate = 1000, timezone = timezones.tz.guess()) => {

    const getDateTime = () => {
        return timezones.tz(timezone).format("MMMM Do YYYY, h:mm:ss a")
      }
      
    const [dateTimeString, setDateTimeString] = useState(getDateTime())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTimeString(getDateTime())
        }, refreshRate)

        return () => clearInterval(intervalId)
    }, [refreshRate, setInterval, clearInterval, setDateTimeString, getDateTime, timezone])

    return dateTimeString
}

export default useTime;