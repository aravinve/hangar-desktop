function SidePane({handleChange, searchCity}) {
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
        <i className="fas fa-cloud mr-2"></i> Weather</p>
        <div className='flex flex-row p-4'>
          <div className="flex-1 inline-flex">
          <p className='text-primary text-sm inline-flex items-center'>
          <i className='fas fa-search mr-2'></i>
            <input
              className='rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none mr-2'
              type='text'
              name='city'
              placeholder='Search City'
              onChange={handleChange}
            />
          </p>
          <button
            className='bg-primary cursor-pointer text-secondary text-sm p-1 rounded-sm focus:outline-none'
            onClick={searchCity}>
            Search
          </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SidePane;
