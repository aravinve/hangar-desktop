function SidePane({loadSelectData}) {
  return (
    <div
      className='column is-3'
      style={{ paddingLeft: '2rem', marginTop: '4rem' }}
    >
      <nav className='panel' style={{ position: 'fixed' }}>
        <p className='panel-heading'>Converter</p>
        <div className='panel-block'>
          <div className='panel-block'>
            <span className='icon is-left'>
              <i className='fas fa-filter'></i>
            </span>
            <p className='has-icons-left'>Filter</p>
          </div>
          <div className='select is-dark is-small'>
            <select
              name='converterName'
              id='converter-name'
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
