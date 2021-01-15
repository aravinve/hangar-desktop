import React from 'react'

function AlarmComponent({setAlarm, handleAlarmInputChange}) {
    return (
        <div className='bg-secondary mt-4 pt-2 px-4 pb-2 text-primary rounded-md shadow-md'>
            <div className="flex flex-row items-center justify-center">
                <div className="flex-1">
                    <p className="text-sm">
                        <i className='fas fa-bell mr-2'></i> Alarm
                    </p>
                </div>
                <div className="flex-1 mx-1">
                    <input
                    className='rounded-md w-full shadow-md p-1 text-sm text-primary outline-none focus:outline-none'
                    type='number'
                    min='1'
                    max='60'
                    name='minHand'
                    placeholder='mm'
                    onChange={handleAlarmInputChange}
                    id='min-hand'
                    />
                </div>
                <div className="flex-1 mx-1">
                    <input
                    className='rounded-md w-full shadow-md p-1 text-sm text-primary outline-none focus:outline-none'
                    type='number'
                    min='0'
                    max='60'
                    name='secHand'
                    placeholder='ss'
                    onChange={handleAlarmInputChange}
                    id='sec-hand'
                    />
                </div>
                <div className="flex-shrink-0 mx-1 my-1">
                    <button
                    className='bg-primary cursor-pointer text-secondary text-sm p-1 rounded-sm focus:outline-none'
                    onClick={(e) => {
                        setAlarm(e)
                    }}>
                        Set Alarm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AlarmComponent
