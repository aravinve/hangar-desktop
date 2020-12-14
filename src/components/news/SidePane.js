function SidePane({handleSearchChange, handleSelectChange, searchArticle, activateContentFrame, toggleFrame}) {
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
        <i className="fas fa-newspaper mr-2"> </i>News</p>
        <div className='flex flex-row pl-4 pt-4 pr-4 pb-2'>
          <div className="flex-1 inline-flex">
          <p className='text-primary text-sm inline-flex items-center'>
          <i className='fas fa-search mr-2'></i>
            <input
              className='rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none mr-2'
              type='text'
              name='searchArticle'
              placeholder='Search'
              onChange={handleSearchChange}
            />
          </p>
          <button
            className='bg-primary cursor-pointer text-secondary text-sm p-1 rounded-sm focus:outline-none'
            onClick={searchArticle}>
            Search
          </button>
          </div>
        </div>
        <div className='flex flex-row p-4'>
          <div className="flex-1 inline-flex">
          <p className='text-primary text-sm inline-flex items-center'>
          <i className='fas fa-flag mr-2'></i></p>
            <div className='inline-flex items-center m-1'>
              <select onChange={handleSelectChange} name='searchCountry' className="rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none">
                <option value='us'>Select dropdown</option>
                <option value='us'>USA</option>
                <option value='in'>India</option>
                <option value='au'>Australia</option>
                <option value='sg'>Singapore</option>
              </select>
            </div>
          <button
            className='bg-primary cursor-pointer text-secondary text-sm p-1 rounded-sm focus:outline-none'
            onClick={searchArticle}>
            Filter
          </button>
          </div>
        </div>
        <div className="flex flex-row p-4">
          <button
              className='flex-shrink-0 bg-primary cursor-pointer text-secondary text-sm p-1 rounded-sm focus:outline-none'
              onClick={activateContentFrame}>
              {!toggleFrame ? 'Detailed News' : 'Headlines'}
            </button>
        </div>
      </nav>
    </div>
  );
}

export default SidePane
