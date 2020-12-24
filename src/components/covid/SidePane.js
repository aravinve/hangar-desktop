function SidePane({showGlobalStats, showCountriesList, handleChange}) {
  const paneStyle = {
    top: '2rem',
    left: '2rem'
  }
  return (
    <div className='absolute w-auto h-auto shadow-md rounded-md bg-secondary' style={paneStyle}>
      <nav>
        <p className='bg-primary w-full p-1 rounded-t-md inline-flex items-center text-secondary text-xl select-none'> 
        <i className="fas fa-biohazard m-2"></i> Covid-19 Tracker</p>
        <div className='flex flex-row p-2'>
          <div className='flex-1 inline-flex'>
            <p className='text-primary text-sm inline-flex items-center'>
            <i className='fas fa-globe m-1'></i> Worldwide</p>
          </div>
          <button
            className='bg-primary cursor-pointer text-secondary text-sm p-1 rounded-sm focus:outline-none'
            onClick={showGlobalStats}
          >
            View
          </button>
        </div>
        <div className='flex flex-row p-2'>
          <div className='flex-1 inline-flex'>
            <p className='text-primary text-sm inline-flex items-center'>
            <i className='fas fa-flag m-1'></i> Filter</p>
          </div>
          <div className='inline-flex items-center m-1'>
            <select
              name='countryName'
              id='country-name'
              className="rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none"
              onChange={handleChange}>
              <option value='' selected disabled hidden>
                Choose
              </option>
              {showCountriesList}
            </select>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SidePane;
