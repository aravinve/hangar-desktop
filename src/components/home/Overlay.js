import Tools from './Tools'
import targetLoader from '../../img/under_construction_light.png'

function Overlay({userData, showSettings, handleChange, changeOverlay, clock, changeSearchTerm, changeSettingsMenu, currentTheme, enableSticky, stickyState, enableFinder, finderState, enableDarkTheme, darkThemeState, subloading, logoutHandler}) {

  const styleOverlay = {
    width: '100%',
    height: '100vh',
    margin: '0px',
    backgroundImage: 'url(' + subloading || targetLoader + ')',
    backgroundSize: 'cover',
    backgroundClip: 'border-box',
    backgroundPosition: 'center',
    opacity: '90%',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div className="flex flex-row flex-wrap">
    <div className='flex-1 fadein' style={styleOverlay}>        
        <div className="flex-1">
          {userData && (<div className='flex flex-col p-8 float-right'>
            <div className='flex-auto'>
              <div className='px-2 py-4 bg-secondary rounded-md shadow-md flex flex-row'>
              <div className="flex-shrink-0">
                <img className="select-none w-24 h-24 rounded-sm mx-2" src={userData.hangarData.photoUrl} alt="Profile DP" />
              </div>
               <div className="flex-auto mx-2">
                <h1 className='text-5xl text-primary'>
                      Welcome, {userData.hangarData.displayName}{' '}
                    </h1>
                  <p className='text-xl text-primary select-none mx-4'>{clock}</p>
               </div>
              </div>
            </div>
        </div>)}
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
                enableDarkTheme={enableDarkTheme}
                darkThemeState={darkThemeState}
                userData={userData}
                logoutHandler={logoutHandler}
              />
            ) : (
              null
      )}
    </div>
  );
}

export default Overlay
