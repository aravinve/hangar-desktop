function SidePane({loadSelectData}) {
  const paneStyle = {
    top: '2rem',
    left: '2rem',
    zIndex: '10'
  }
  return (
    <div
      className='absolute w-auto h-auto shadow-md rounded-md bg-secondary'
      style={paneStyle}>
      <nav>
        <p className='bg-primary w-full p-2 rounded-t-md inline-flex items-center text-secondary text-xl select-none'>
        <i className="fas fa-map-marker-alt mr-2"></i> Maps</p>
        <div className='flex flex-row p-4'>
          <div className='flex-1 inline-flex'>
            <p className='text-primary text-sm inline-flex items-center mr-2'>
            <i className='fas fa-filter mr-2'></i>
              Filter</p>
          </div>
          <div className='inline-flex items-center m-1'>
            <select
              name='mapOptionName'
              id='map-option-name'
              className="cursor-pointer rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none"
              onChange={loadSelectData}
            >
              <option value='' selected disabled hidden>
                Choose
              </option>
              <option value='normal'>Explore</option>
              <option value='eo'>Earth Observatory</option>
            </select>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SidePane;
