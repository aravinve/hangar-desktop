import React from 'react'

function MusicFolder({handleChange, getFolder}) {
    return (
        <div className='flex flex-row justify-center p-4'>
            <div className="flex-1 inline-flex">
          <p className='text-primary text-sm inline-flex items-center'>
          <i className='fas fa-folder mr-2'></i>
            <input
              className='rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none mr-2'
              type='text'
              name='folderName'
              placeholder='Music Folder Path'
              onChange={handleChange}
            />
          </p>
          <button
            className='bg-primary cursor-pointer text-secondary text-sm p-1 rounded-sm focus:outline-none'
            onClick={getFolder}>
                Set Music Folder
          </button>
          </div>
        </div>
    )
}

export default MusicFolder
