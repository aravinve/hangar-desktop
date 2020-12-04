function SidePane({handleSearchChange, handleSelectChange, searchArticle}) {
  return (
    <div
      className='column is-3'
      style={{ paddingLeft: '2rem', marginTop: '4rem' }}
    >
      <nav className='panel' style={{ position: 'fixed' }}>
        <p className='panel-heading'>News</p>
        <div className='panel-block'>
          <p className='control has-icons-left'>
            <input
              className='input is-small'
              type='text'
              name='searchArticle'
              placeholder='Search'
              onChange={handleSearchChange}
            />
            <span className='icon is-left'>
              <i className='fas fa-search'></i>
            </span>
          </p>
          <button
            className='button is-small is-dark'
            style={{ marginLeft: '0.5rem' }}
            onClick={searchArticle}
          >
            Search
          </button>
        </div>
        <div className='panel-block'>
          <p className='control has-icons-left'>
            <div className='select is-small'>
              <select onChange={handleSelectChange} name='searchCountry'>
                <option value='us'>Select dropdown</option>
                <option value='us'>USA</option>
                <option value='in'>India</option>
                <option value='au'>Australia</option>
                <option value='sg'>Singapore</option>
              </select>
            </div>
            <span className='icon is-left'>
              <i className='fas fa-flag'></i>
            </span>
          </p>
          <button
            className='button is-small is-dark'
            style={{ marginLeft: '0.5rem' }}
            onClick={searchArticle}
          >
            Filter
          </button>
        </div>
      </nav>
    </div>
  );
}

export default SidePane
