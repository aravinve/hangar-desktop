function Tools({changeSettingsMenu, changeOverlay, handleChange, changeSearchTerm, currentTheme, enableSticky, stickyState, enableFinder, finderState, enableDarkTheme, darkThemeState, userData, logoutHandler}) {

  return (
    <div className='flex-shrink-0 fadein bg-body shadow-sm p-4'>
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
        <h4 className='text-primary text-3xl mb-4'><i className='fas fa-image mr-2'></i> Display</h4>
        <div className='flex flex-row mb-4'>
          <div className='flex-1'>
            <p className="text-sm text-primary">Change Background</p>
          </div>
          <div className='flex-1'>
            <button
              className='bg-primary cursor-pointer text-sm text-secondary py-1 px-2 rounded-sm shadow-sm focus:outline-none'
              onClick={changeOverlay}>
              Change Now
            </button>
          </div>
        </div>
        <div className="flex flex-row mb-4">
          <div className="flex-1">
            <p className="text-sm text-primary">Current Theme</p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-primary capitalize">{currentTheme} </p>
          </div>
        </div>
        <div className='flex flex-row mb-4'>
          <div className='flex-1'>
            <p className="text-sm text-primary">Modify Theme</p>
          </div>
          <div className='flex-1'>
            <input
              type='text'
              className='block w-full text-sm shadow-sm rounded-sm px-1 py-1 focus:outline-none mb-2'
              name='searchText'
              onChange={handleChange}
              placeholder='Buzz Theme'
              id='searchText'
            />
            <button
              className='bg-primary cursor-pointer text-sm text-secondary py-1 px-2 rounded-sm shadow-sm focus:outline-none'
              onClick={changeSearchTerm}>
              Modify Theme
            </button>
          </div>
        </div>
      </div>
      <div
        className='p-4 rounded-md shadow-sm bg-secondary text-primary fadein'
        id='settings-preference'
        style={{display: 'none'}}>
        <h4 className='text-primary text-3xl mb-4'><i className='fas fa-heart mr-2'></i>Preferences</h4>
        <div className='flex flex-row items-center justify-center mb-4'>
          <div className='flex-1'>
            <p className="text-sm text-primary">Dark Theme</p>
          </div>
          <div className='flex-1'>
            <input type="checkbox" name="enableDarkTheme" className='bg-primary cursor-pointer text-sm text-secondary mt-2 rounded-sm shadow-sm focus:outline-none'
              onChange={enableDarkTheme} checked={darkThemeState} />  
          </div>
        </div>
        <div className='flex flex-row items-center justify-center mb-4'>
          <div className='flex-1'>
            <p className="text-sm text-primary">Hangar Finder</p>
          </div>
          <div className='flex-1'>
            <input type="checkbox" name="enableFinder" className='bg-primary cursor-pointer text-sm text-secondary mt-2 rounded-sm shadow-sm focus:outline-none'
              onChange={enableFinder} checked={finderState} />  
          </div>
        </div>
        <div className='flex flex-row items-center justify-center mb-4'>
          <div className='flex-1'>
            <p className="text-sm text-primary">Sticky Notes</p>
          </div>
          <div className='flex-1'>
          <input type="checkbox" name="enableSticky" className='bg-primary cursor-pointer text-sm text-secondary mt-2 rounded-sm shadow-sm focus:outline-none'
              onChange={enableSticky} checked={stickyState} />
          </div>
        </div>
      </div>
      <div
        className='p-4 rounded-md shadow-sm bg-secondary text-primary fadein'
        id='settings-account'
        style={{display: 'none'}}>
        <h4 className='text-primary text-3xl mb-2'><i className='fas fa-user-alt mr-2'></i>Account</h4>
        {userData && (<>
          <div className='flex flex-col items-center justify-center mb-1'>
          <div className='flex-1 my-1'>
            <p className="text-lg text-primary underline">Hangar Account Holder</p>
          </div>
          <div className='flex-1 my-0.5'>
            <p className="text-xs text-primary">
              {userData.hangarData.displayName}
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center mb-1'>
          <div className='flex-1 my-1'>
            <p className="text-lg text-primary underline">Hangar Account Email</p>
          </div>
          <div className='flex-1 my-0.5'>
            <p className="text-xs text-primary">
              {userData.hangarData.email}
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center my-1'>
          <div className='flex-1 my-1'>
            <p className="text-lg text-primary underline">Hangar Account Type</p>
          </div>
          <div className='flex-1 my-0.5'>
            <p className="text-xs text-primary">
              {userData.hangarData.planName}
            </p>
          </div>
        </div></>)}
        <div className='flex flex-row items-center justify-center mt-4 mb-1'>
            <button
              className='bg-primary cursor-pointer text-sm text-secondary py-1 px-2 rounded-sm shadow-sm focus:outline-none' onClick={logoutHandler}>
                Logout
            </button>
        </div>
      </div>
      <div className="flex flex-col select-none justify-center items-center mt-2">
      <div className="text-primary text-sm">
          V1.0
        </div>
        <div className="text-primary text-sm">
          Copyright 2020
        </div>
      </div>
    </div>
  );
}

export default Tools
