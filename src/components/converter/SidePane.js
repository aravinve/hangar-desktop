function SidePane({loadSelectData}) {
  const paneStyle = {
    top: '2rem',
    left: '2rem'
  }
  return (
    <div
      className='absolute w-auto h-auto shadow-md rounded-md bg-secondary'
      style={paneStyle}
    >
      <nav>
        <p className='bg-primary w-full p-2 rounded-t-md inline-flex items-center text-secondary text-xl select-none'><i className="fas fa-balance-scale mr-2"></i>Converter</p>
        <div className='flex flex-row p-4'>
          <div className='flex-1 inline-flex'>
            <p className='text-primary text-sm inline-flex items-center mr-2'>
            <i className='fas fa-filter mr-2'></i>
              Filter</p>
          </div>
          <div className='inline-flex items-center m-1'>
            <select
              name='converterName'
              id='converter-name'
              className="rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none"
              onChange={loadSelectData}
            >
              <option value='' selected disabled hidden>
                Choose
              </option>
              <option value='length'>Length</option>
              <option value='mass'>Mass</option>
              <option value='area'>Area</option>
              <option value='volume'>Volume</option>
              <option value='temperature'>Temperature</option>
              <option value='time'>Time</option>
              <option value='frequency'>Frequency</option>
              <option value='speed'>Speed</option>
              <option value='pressure'>Pressure</option>
              <option value='digital'>Digital</option>
              <option value='illuminance'>Illuminance</option>
              <option value='partsPer'>Parts-Per</option>
              <option value='voltage'>Voltage</option>
              <option value='current'>Current</option>
              <option value='power'>Power</option>
              <option value='energy'>Energy</option>
              <option value='angle'>Angle</option>
            </select>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SidePane
