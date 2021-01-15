function SidePane({timezoneList, handleChange}) {
  const paneStyle = {
    top: '2rem',
    left: '2rem'
  }
  return (
    <div className='absolute w-auto h-auto shadow-md rounded-md bg-secondary' style={paneStyle}>
      <nav>
        <p className='bg-primary w-full p-1 rounded-t-md inline-flex items-center text-secondary text-xl select-none'> 
        <i className="fas fa-clock m-2"></i> Clock</p>
        <div className='flex flex-row p-2'>
          <div className='flex-1 inline-flex'>
            <p className='text-primary text-sm inline-flex items-center'>
            <i className='fas fa-flag m-1'></i> Filter</p>
          </div>
          <div className='inline-flex items-center m-1'>
            <select
              name='timeZones'
              id='time-zones'
              className="rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none"
              onChange={handleChange}>
              <option value='' selected disabled hidden>
                Choose
              </option>
              {
               timezoneList
              }
            </select>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SidePane;
