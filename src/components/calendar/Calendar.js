import {useState, useEffect} from 'react'
import Dashboard from '../home/Dashboard'
import CalendarEventModal from './CalendarEventModal'
import moment from 'moment'
import firebase from '../../firebase'
import Loader from '../../Loader';

function Calendar() {
    const generateDays = (year, month) => {
    let daysArray = []
    let date = new Date(year, month, 1);
    let initialZeroCountLimit = date.getDay()
    while(initialZeroCountLimit > 0){
      daysArray.push(0)
      initialZeroCountLimit--
    }
    while (date.getMonth() === month) {
        daysArray.push(new Date(date))
        date.setDate(date.getDate() + 1)
    }
    let lastZeroCountLimit = daysArray[daysArray.length-1].getDay()
    while(lastZeroCountLimit < 6){
      daysArray.push(0)
      lastZeroCountLimit++
    }
    return daysArray
  }
  
  const getToday = () =>{
    return new Date()
  }
  
  const getCurrentMonth = () => {
    return new Date().getMonth()
  }
  
  const getCurrentYear = () => {
    return new Date().getFullYear()
  }
  
  const daysArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
  const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const [month, setMonth] = useState(getCurrentMonth())
  const [year, setYear] = useState(getCurrentYear())
  const [events, setEvents] = useState([])
  const [modal, setModal] = useState({
    display: false,
    data: null
  })
  const [viewEventsGrid, setViewEventsGrid] = useState(true)
  const [loading, setLoading] = useState(false)
  const today = getToday().toDateString()

  useEffect(() => {
    setLoading(true)
    firebase.firestore().collection('calendar').onSnapshot(serverUpdate => {
      const calendarEventsFromStore = serverUpdate.docs.map(doc => {
        const data = doc.data()
        data['id'] = doc.id
        return data
      })
      if(calendarEventsFromStore.length > 0){
        setEvents(calendarEventsFromStore)
        setLoading(false)
      } else {
        setEvents([])
        setLoading(false)
      }
    })
  }, [])

  const saveData = async (data) => {
    const {id, title, date, color} = data
    const updateEvent = events.find(ev => ev.id === id)
    setModal({
      display: false,
      data: null
    })
    if(updateEvent && id){
      firebase.firestore().collection('calendar').doc(id).update({
        title, date, color
      })
      setEvents(events.map(ev => {
        if(ev.id === id){
          ev.title = title
          ev.date = date
          ev.color = color
        }
        return ev
      }))
    } else {
      const returnData = await firebase.firestore().collection('calendar').add({
        title, date, color
      })
      await setEvents(events.concat({
        id: returnData.id, title, date, color
      }))
    }
  }

  const deleteEvent = (targetId) => {    
    setModal({
      display: false,
      data: null
    })
    if(targetId !== undefined){
      setEvents(events.filter(ev => ev.id !== targetId))
      firebase.firestore().collection('calendar').doc(targetId).delete()
    }
  }

  const openModal = (dayObject) => {    
    setModal({
      display: true,
      data: {
        title: '',
        date: moment(dayObject).format("YYYY-MM-DD"),
        color: 'red'
      }
    })
  }

  const openModalEditMode = (targetEvent) => {
    setModal({
      display: true,
      data: {
        id: targetEvent.id,
        title: targetEvent.title,
        date: targetEvent.date,
        color: targetEvent.color
      }
    })
  }

  const closeModal = () => {
    setModal({
      display: false,
      data: null
    })
  }

  const displayTargetEvents = (dayString) => {
    const targetEvents = events.filter(ev => ev.date === moment(dayString).format("YYYY-MM-DD"))
    if(targetEvents !== undefined && targetEvents.length > 0){
      const limitTargetEvents = targetEvents.slice(0,2)
      const remainingEvents = targetEvents.length - 2
      return (
        <>
        {limitTargetEvents.map(targetEvent => (
            <>
              <div className={`flex-1 my-0.5 w-full bg-${targetEvent.color}-600 text-secondary text-sm cursor-pointer`} id={targetEvent.id} key={targetEvent.id} onClick={() => openModalEditMode(targetEvent)}>
                {targetEvent.title}
              </div>
            </>
          ))}
        {remainingEvents > 0 ? (<div className="flex-1 my-0.5 bg-primary text-secondary text-sm w-full">
        {`${remainingEvents}+ More`}
        </div>): null }
        </>
      )
    } else {
      return (
        null
      )
    }
  }

  const days = daysArray.map(day => (
    <>
      <div className="flex flex-row bg-primary items-center justify-center border b-l-0.5 b-r-0.5 border-gray-200" key={day}>
        <div className="flex-1 text-secondary px-6 py-3">
          {day}
        </div>
      </div>
    </>
  ))

  const dates = generateDays(year, month).map(day => (
    <>
      <div className="flex flex-col bg-secondary items-center justify-center b-l-0.5 b-r-0.5 border border-gray-200" key={day === 0 ? Math.ceil(Math.random * 10) : day.toDateString()}>
        <div className="flex-1 text-primary p-6">
          {day === 0 ? (<span>&nbsp;</span>) : (<span className={today === day.toDateString() ? 'bg-primary text-secondary rounded-full px-2 py-1 cursor-pointer': 'bg-secondary text-primary rounded-none cursor-pointer'} onClick={() => openModal(day.toString())}>{day.getDate().toString()}</span>)}
        </div>
        {viewEventsGrid ? day === 0 ? null : displayTargetEvents(day.toString()) : null}
      </div>
    </>
  ))

  return (
    <>
        <div
          className='mt-4 text-center flex flex-col justify-center'>
            <div className="flex-auto flex flex-row items-center justify-center">
              <h2 className='text-primary text-4xl whitespace-nowrap'>
                {`${monthsArray[month]} ${year}`}
              </h2>
            </div>
            <div className="flex-auto flex flex-row mt-1 mb-1">
            <div className="flex-auto flex flex-row justify-end">
                <button className='bg-primary cursor-pointer text-secondary text-md px-2 py-1 rounded-md shadow-sm focus:outline-none mx-1' onClick={() => {
                    setYear(getCurrentYear())
                    setMonth(getCurrentMonth())
                  }}>
                  <i className="fas fa-calendar-day mr-1"></i> Today
                </button>
                <button className='bg-primary cursor-pointer text-secondary text-md px-2 py-1 rounded-md shadow-sm focus:outline-none mx-1' onClick={() => {
                    setViewEventsGrid(!viewEventsGrid)
                  }}>
                  <i className="fas fa-calendar-alt mr-1"></i> {viewEventsGrid ? 'Hide Events' : 'Show Events'}
                </button>
                <div className='bg-primary text-secondary px-2 py-1 rounded-sm shadow-sm text-xl mx-1'>
                      <i className='fas fa-arrow-down cursor-pointer' onClick={() => {
                      if(month < 11){
                        setMonth(month + 1)
                      } else {
                        setMonth(0)
                        setYear(year + 1)
                      }
                    }}></i>
                </div>
                <div className='bg-primary text-secondary px-2 py-1 rounded-sm shadow-sm text-xl mx-1'>
                  <i className='fas fa-arrow-up cursor-pointer' onClick={() => {
                    if(month > 0){
                      setMonth(month - 1)
                    } else {
                      setMonth(11)
                      setYear(year - 1)
                    }
                  }}></i>
                </div>
             </div>
            </div>
            <div className="flex-auto grid grid-cols-7 shadow-sm rounded-sm">
              {days}
            </div>
            {!loading ? ( <div className="flex-auto grid grid-cols-7 shadow-sm rounded-sm">
              {dates}
            </div>) : <Loader />}
            {modal.display && modal.data ? <CalendarEventModal closeModal={closeModal} data={modal.data} saveData={saveData} deleteEvent={deleteEvent} /> : null}
        </div>
        <Dashboard />
      </>
  )
}

export default Calendar
