import {useState} from 'react'

function CalendarEventModal({closeModal, data, saveData, deleteEvent}) {
    const [eventTitle, setEventTitle] = useState(data.title)
    const [eventDate, setEventDate] = useState(data.date)
    const [eventColor, setEventColor] = useState(data.color)
    const [alert, setAlert] = useState(false)

    const handleSave = () => {
        if(eventTitle !== ''){
            setAlert(false)
            saveData({id: data.id, title: eventTitle, date: eventDate, color: eventColor})
        } else {
            setAlert(true)
        }
    }

    const modalStyle = {
        top: '10rem',
        left: '0rem',
        zIndex: '9',
        height: '420px'
    }

    const alertMessage = alert ? (<>
        <div className='flex flex-row bg-secondary rounded-b-sm shadow-md mx-16 justify-center p-4'>
            <div className='flex-1 text-red-600 text-lg'>
                Event Title Required!!!
            </div>
        </div>
    </>) : null

    const colorsArray = ['blue', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink']

    return (
        <div className="fixed w-screen overflow-hidden" style={modalStyle}>
            <div className="flex flex-row justify-end mt-1 mr-8 mb-3">
                <div className="text-secondary bg-primary rounded-full h-10 w-10 items-center justify-center text-lg cursor-pointer flex" onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </div>
            </div>
            <div className="flex flex-row bg-body rounded-t-sm shadow-md mx-16 justify-center p-8">
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 my-2">
                        <h2 className="text-3xl text-primary">
                        <i className='fas fa-calendar-plus mr-2'></i>Create Event
                        </h2>
                    </div>
                    <div className='flex-1 text-primary text-lg my-1'>
                        <input
                            type='text'
                            className='rounded-sm shadow-md p-2 text-sm text-primary w-full outline-none focus:outline-none'
                            placeholder="Event Title"
                            onChange={(e) => setEventTitle(e.target.value)}
                            value={eventTitle}
                        />
                    </div>
                    <div className='flex-1 text-primary text-lg my-1'>
                        <input
                            type='date'
                            className='cursor-pointer rounded-sm shadow-md p-2 text-sm text-primary w-full outline-none focus:outline-none'
                            onChange={(e) => setEventDate(e.target.value)}
                            value={eventDate}
                        />
                    </div>
                    <div className="flex-1 my-1 flex flex-row justify-center">
                        {colorsArray.map(color => (
                            <div key={color} className={color === eventColor ? `bg-${color}-600 w-10 h-10 px-1 py-2 mx-2 b-1 border border-gray-600 cursor-pointer`: `bg-${color}-600 w-8 h-8 px-1 py-2 mx-2 b-1 border border-gray-600 cursor-pointer`} onClick={() => setEventColor(color)}>
                                &nbsp;
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {alertMessage}
            <div className="flex flex-row bg-secondary rounded-b-sm shadow-md mx-16 p-4">
                <div className="flex-1 flex flex-row justify-start">
                <div className='flex-shrink-0 m-1'>
                    <button
                        className='cursor-pointer text-secondary bg-red-600 text-md p-2 rounded-sm focus:outline-none'
                        onClick={() => deleteEvent(data.id)}>
                        <i className='fas fa-trash ml-1 mr-1'></i>
                        Delete
                    </button>
                </div>
                </div>
                <div className="flex-1 flex flex-row justify-end">
                    <div className='flex-shrink-0 m-1'>
                        <button
                            className='cursor-pointer text-secondary bg-gray-600 text-md p-2 rounded-sm focus:outline-none'
                            onClick={closeModal}>
                            <i className='fas fa-times ml-1 mr-1'></i>
                            Cancel
                        </button>
                    </div>
                    <div className='flex-shrink-0 m-1'>
                        <button
                            className='cursor-pointer text-secondary bg-primary text-md p-2 rounded-sm focus:outline-none'
                            onClick={handleSave}>
                            <i className='fas fa-save ml-1 mr-1'></i>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarEventModal
