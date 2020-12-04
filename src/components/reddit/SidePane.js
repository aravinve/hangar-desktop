function SidePane({handleChange, searchArticle}) {
  return (
    <div
      className='column is-3'
      style={{ paddingLeft: '2rem', marginTop: '4rem' }}
    >
      <nav className='panel' style={{ position: 'fixed' }}>
        <p className='panel-heading'>Reddit</p>
        <div className='panel-block'>
          <p className='control has-icons-left'>
            <input
              className='input is-small'
              type='text'
              name='searchArticle'
              placeholder='Subreddit'
              onChange={handleChange}
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
      </nav>
    </div>
  );
}

export default SidePane
