function SidePane({showGlobalStats, showCountriesList, handleChange}) {
  return (
    <div
      className='column is-3'
      style={{ paddingLeft: '2rem', marginTop: '4rem' }}
    >
      <nav className='panel' style={{ position: 'fixed' }}>
        <p className='panel-heading'>Covid-19 Tracker</p>
        <div className='panel-block'>
          <div className='panel-block'>
            <span className='icon is-left'>
              <i className='fas fa-globe'></i>
            </span>
            <p className='has-icons-left'>Worldwide</p>
          </div>
          <button
            className='button is-small is-dark'
            style={{ marginLeft: '0.5rem' }}
            onClick={showGlobalStats}
          >
            View
          </button>
        </div>

        <div className='panel-block'>
          <div className='panel-block'>
            <span className='icon is-left'>
              <i className='fas fa-flag'></i>
            </span>
            <p className='has-icons-left'>Filter</p>
          </div>
          <div className='select is-dark is-small'>
            <select
              name='countryName'
              id='country-name'
              onChange={handleChange}
            >
              {showCountriesList}
            </select>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SidePane;
