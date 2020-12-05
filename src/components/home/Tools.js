function Tools({changeSettingsMenu, changeOverlay, handleChange, changeSearchTerm, currentTheme}) {

  const styleOverlay = {
    width: '50%',
    height: '20vh',
    backgroundImage: 'url(' + require('../../img/under_construction.png') + ')',
    backgroundSize: 'cover',
    backgroundClip: 'border-box',
    backgroundPosition: 'center',
    opacity: '100%',
    backgroundRepeat: 'no-repeat',
    WebkitAnimation: 'fadein 2s',
    MozAnimation: 'fadein 2s',
    animation: 'fadein 2s',
  }

  const animationStyle = {
    webkitAnimation: 'fadein 2s',
    mozAnimation: 'fadein 2s',
    msAnimation: 'fadein 2s',
    animation: 'fadein 2s',
  }
  
  return (
    <div className='flex-shrink-0 fadein bg-white shadow-sm p-2' style={animationStyle}>
    <h2 className='ml-4 text-5xl text-primary mb-4 p-2'>Settings</h2>
      <div className='flex flex-row p-2 mb-2'>
        <ul className="flex-auto flex flex-col">
          <li className="flex-1 bg-secondary shadow-md rounded-sm cursor-pointer mb-2 px-1 py-1" onClick={changeSettingsMenu}>
            <div className='h-1 w-1 inline-flex items-center text-center text-primary'>
                <i className='fas fa-image m-2'></i> Display
              </div>
          </li>
          <li className="flex-1 bg-secondary shadow-md rounded-sm cursor-pointer mb-2 px-1 py-1" onClick={changeSettingsMenu}>
              <div className='flex-1 h-1 w-1 inline-flex items-center text-center text-primary'>
                <i className='fas fa-heart m-2'></i> Preferences
              </div>
          </li>
          <li className="flex-1 bg-secondary shadow-md rounded-sm cursor-pointer mb-2 px-1 py-1" onClick={changeSettingsMenu}>
            <div className='h-1 w-1 inline-flex items-center text-center text-primary'>
                <i className='fas fa-user-alt m-2'></i> Account
              </div>
          </li>
        </ul>
      </div>
      <div className='p-4 rounded-md shadow-sm bg-secondary text-primary fadein' id='settings-background'>
        <h4 className='text-primary text-3xl mb-4'>Display Settings</h4>
        <div className='flex flex-row mb-4'>
          <div className='flex-1'>
            <p className="text-sm text-black">Change Background</p>
          </div>
          <div className='flex-1'>
            <button
              className='bg-primary cursor-pointer text-sm text-secondary py-1 px-2 rounded-sm shadow-sm focus:outline-none'
              onClick={changeOverlay}
            >
              Change Now
            </button>
          </div>
        </div>
        <div className="flex flex-row mb-4">
          <div className="flex-1">
            <p className="text-sm text-black">Current Theme</p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-black">{currentTheme} </p>
          </div>
        </div>
        <div className='flex flex-row mb-4'>
          <div className='flex-1'>
            <p className="text-sm text-black">Modify Theme</p>
          </div>
          <div className='flex-1'>
            <input
              type='text'
              className='block w-full text-sm border-gray-300 shadow-sm rounded-sm px-1 py-1 focus:outline-none mb-2'
              name='searchText'
              onChange={handleChange}
              placeholder='Buzz Theme'
              id='searchText'
            />
            <button
              className='bg-primary cursor-pointer text-sm text-secondary py-1 px-2 rounded-sm shadow-sm focus:outline-none'
              onClick={changeSearchTerm}
            >
              Modify Theme
            </button>
          </div>
        </div>
      </div>
      <div
        className='p-4 rounded-md shadow-sm bg-secondary text-primary fadein'
        id='settings-preference'
      >
        <h4 className='text-secondary text-3xl mb-4'>Preferences</h4>
        <div className='container' style={{ textAlign: 'center' }}>
          <h6 className='is-size-5'>Under Construction</h6>
          <div className='container' style={styleOverlay}></div>
        </div>
      </div>
      <div
        className='p-4 rounded-md shadow-sm bg-secondary text-primary fadein'
        id='settings-account'
      >
        <h4 className='text-secondary text-3xl mb-4'>Account</h4>
        <div className='container' style={{ textAlign: 'center' }}>
          <h6 className='is-size-5'>Under Construction</h6>
          <div className='container' style={styleOverlay}></div>
        </div>
      </div>
    </div>
  );
}

export default Tools
