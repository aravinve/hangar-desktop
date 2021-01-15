import {useState} from 'react'

function SidePane({handleChange, searchText, searchKeyword, loadSelectData}) {
  const [showSearch, setShowSearch] = useState(false)
  const paneStyle = {
    top: '2rem',
    left: '2rem'
  }
  return (
    <div
      className='absolute w-auto h-auto shadow-md rounded-md bg-secondary'
      style={paneStyle}>
      <nav>
        <p className='bg-primary w-full p-2 rounded-t-md inline-flex items-center text-secondary text-xl select-none'>
        <i className="fas fa-photo-video mr-2"></i> Gallery</p>
        <div className='flex flex-row px-4 py-2'>
          <div className='flex-1 inline-flex'>
            <p className='text-primary text-sm inline-flex items-center mr-2'>
            <i className='fas fa-filter mr-2'></i>
              Filter</p>
          </div>
          <div className='inline-flex items-center m-1'>
            <select
              name='galleryOptionSelect'
              id='gallery-option-select'
              className="cursor-pointer rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none"
              onChange={(e) => {
                setShowSearch(true)
                loadSelectData(e)
              }}>
              <option value='' selected disabled hidden>
                Choose
              </option>
              <option value='photo'>Photos</option>
              <option value='video'>Videos</option>
            </select>
          </div>
        </div>
        {showSearch ? (<div className='flex flex-row pl-4 pt-2 pr-4 pb-4'>
          <div className="flex-1 inline-flex">
          <p className='text-primary text-sm inline-flex items-center'>
          <i className='fas fa-search mr-2'></i>
            <input
              className='rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none mr-2'
              type='text'
              name='searchWord'
              placeholder='Search'
              value={searchText}
              onChange={handleChange}
            />
          </p>
          <button
            className='bg-primary cursor-pointer text-secondary text-sm p-1 rounded-sm focus:outline-none'
            onClick={searchKeyword}>
            Search
          </button>
          </div>
        </div>) : null}
      </nav>
    </div>
  );
}

export default SidePane
