import React from 'react'

function Finder({handleChangeFinder}) {
    const finderStyle = {
        bottom: '10rem',
        left: '1rem',
        zIndex: '30'
    }
    return (
        <div className='fixed bg-secondary text-primary rounded-md shadow-md' style={finderStyle}>
        <div className='mt-1 mb-1 bg-white relative'>
          <div className='text-center bg-secondary text-md inline-flex justify-center'>
          <i className="fas fa-search mt-3 mb-2 ml-2 mr-2 text-primary"></i>
            <input
              type='text'
              id='hangarFinder'
              name='hangarFinder'
              placeholder='Hangar Finder'
              onChange={handleChangeFinder}
              className='block w-full border-gray-300 px-4 py-2 focus:outline-none' />
          </div>
        </div>
        </div>
    )
}

export default Finder
