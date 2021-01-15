import Tools from './Tools'

function Overlay({imageUrl, userName, showSettings, handleChange, changeOverlay, clock, changeSearchTerm, changeSettingsMenu, currentTheme, enableSticky, stickyState, enableFinder, finderState}) {
  const styleOverlay = {
    width: '100%',
    height: '100vh',
    margin: '0px',
    backgroundImage: 'url(' + imageUrl + ')',
    backgroundSize: 'cover',
    backgroundClip: 'border-box',
    backgroundPosition: 'center',
    opacity: '90%',
    backgroundRepeat: 'no-repeat',
    WebkitAnimation: 'fadein 2s',
    MozAnimation: 'fadein 2s',
    animation: 'fadein 2s',
  };

  return (
    <div className="flex flex-row flex-wrap">
    <div className='flex-1 fadein' style={styleOverlay}>
      <div className='flex flex-col p-8 float-right'>
        <div className='flex-auto'>
          <div className='p-4 bg-secondary rounded-md shadow-md'>
            <h1 className='text-5xl text-primary'>
              Welcome, {userName}{' '}
            </h1>
            <p className='text-xl text-primary'>{clock}</p>
          </div>
        </div>
      </div>
    </div>
    {showSettings ? (
              <Tools
                handleChange={handleChange}
                changeOverlay={changeOverlay}
                changeSearchTerm={changeSearchTerm}
                changeSettingsMenu={changeSettingsMenu}
                currentTheme={currentTheme}
                enableSticky={enableSticky}
                stickyState={stickyState}
                enableFinder={enableFinder}
                finderState={finderState}
              />
            ) : (
              null
      )}
    </div>
  );
}

export default Overlay
