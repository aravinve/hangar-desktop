import overlayImage from '../../img/under_construction.png'

function Tools({changeSettingsMenu, changeOverlay, handleChange, changeSearchTerm, currentTheme}) {

  const styleOverlay = {
    width: '100%',
    height: '24vh',
    backgroundImage: 'url(' + overlayImage + ')',
    backgroundSize: 'cover',
    backgroundClip: 'border-box',
    backgroundPosition: 'center',
    opacity: '100%',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className='flex-shrink-0 fadein bg-white shadow-sm p-4'>
    <h2 className='ml-2 text-5xl text-primary mb-4 p-2'>
    <i className='fas fa-cogs'></i> Settings</h2>
      <div className='flex flex-row p-2 mb-2'>
        <ul className="flex-auto flex flex-col">
          <li className="flex-1 bg-secondary text-primary shadow-md rounded-sm cursor-pointer mb-2 px-1 py-1" id="display-set-li" onClick={changeSettingsMenu}>
            <div className='h-1 w-1 inline-flex items-center text-center'>
                <i className='fas fa-image m-2'></i> Display
              </div>
          </li>
          <li className="flex-1 bg-secondary text-primary shadow-md rounded-sm cursor-pointer mb-2 px-1 py-1" id="pref-set-li" onClick={changeSettingsMenu}>
              <div className='flex-1 h-1 w-1 inline-flex items-center text-center'>
                <i className='fas fa-heart m-2'></i> Preferences
              </div>
          </li>
          <li className="flex-1 bg-secondary text-primary shadow-md rounded-sm cursor-pointer mb-2 px-1 py-1" id="account-set-li" onClick={changeSettingsMenu}>
            <div className='h-1 w-1 inline-flex items-center text-center'>
                <i className='fas fa-user-alt m-2'></i> Account
              </div>
          </li>
        </ul>
      </div>
      <div className='p-4 rounded-md shadow-sm bg-secondary text-primary fadein' id='settings-background'
      style={{display: 'none'}}>
        <h4 className='text-primary text-3xl mb-4'><i className='fas fa-image m-2'></i> Display</h4>
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
            <p className="text-sm text-black capitalize">{currentTheme} </p>
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
        style={{display: 'none'}}
      >
        <h4 className='text-secondary text-3xl mb-4'>Preferences</h4>
        <div className='container' style={{ textAlign: 'center' }}>
          <h6 className='text-xl text-primary mb-4'>Under Construction</h6>
          <div className='container' style={styleOverlay}></div>
        </div>
      </div>
      <div
        className='p-4 rounded-md shadow-sm bg-secondary text-primary fadein'
        id='settings-account'
        style={{display: 'none'}}
      >
        <h4 className='text-secondary text-3xl mb-4'>Account</h4>
        <div className='container' style={{ textAlign: 'center' }}>
          <h6 className='text-xl text-primary mb-4'>Under Construction</h6>
          <div className='container' style={styleOverlay}></div>
        </div>
      </div>
    </div>
  );
}

export default Tools
