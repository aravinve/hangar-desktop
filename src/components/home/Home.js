import {useState, useEffect} from 'react'
import Overlay from './Overlay'
import Dashboard from './Dashboard'
import dragElement from './drag'
import StickyNotesList from './StickyNotesList'
import Finder from './Finder';
import hangarFetch from '../../HangarFetch'
import SplashLoader from '../../SplasherLoader'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
const Menu = electron.remote.Menu

function Home() {
  const [searchText, setSearchText] = useState('mountains')
  const [currentTheme, setCurrentTheme] = useState('mountains')
  const [images, setImages] = useState([])
  const [url, setUrl] = useState('')
  const [clock, setClock] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [showFinder, setShowFinder] = useState(false)
  const [finderValue, setFinderValue] = useState('')
  const [displaySticky, setDisplaySticky] = useState(false)
  const [displayFinder, setDisplayFinder] = useState(false)
  const [stickyNote, showStickyNote] = useState(false)
  const [userData, setUserData] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    ipcRenderer.on('userData', (event, arg) => {
      const {userArgs, preferences} = arg
      setUserData(userArgs)
      const prefBackground = preferences['background'] !== null ? preferences['background']: 'mountains'
      const prefSticky = preferences['stickyNotes'] !== null ? preferences['stickyNotes']: false
      const prefFinder = preferences['finder'] !== null ? preferences['finder']: false
      setCurrentTheme(prefBackground)
      setSearchText(prefBackground)
      setDisplayFinder(prefFinder)
      setDisplaySticky(prefSticky)
      loadImages(prefBackground)
      localStorage.setItem('userPreferedData', JSON.stringify(preferences))
    });
    // initMenu()
    showClock()
    setInterval(showClock, 60000)
    setLoading(false)
  },[])

  useEffect(() => {
    if(stickyNote){
      dragElement(document.getElementById('mydiv'));
    }
  }, [stickyNote])

  const initMenu = () => {
    const menu = Menu.buildFromTemplate([
      {
        label: 'HangarMenu',
        submenu: [
          {
            label: 'Finder',
            accelerator: 'CmdOrCtrl+F',
            click: () => {
              toggleFinder()
            },
          },
          {
            label: 'Settings',
            accelerator: 'CmdOrCtrl+S',
            click: () => {
              toggleSettings()
            },
          },
          { type: 'separator' },
          {
            label: 'Logout',
            accelerator: 'CmdOrCtrl+L',
            click: () => {
              localStorage.clear()
              ipcRenderer.send('logout')
            },
          },
          {
            label: 'Quit',
            accelerator: 'CmdOrCtrl+Q',
            click: () => {
              localStorage.clear()
              ipcRenderer.send('quit-app')
            },
          },
        ],
      },
    ]);
    Menu.setApplicationMenu(menu)
  }

  const changeOverlay = () => {
    const imagesArray = images
    const randomImage = imagesArray[Math.floor(Math.random() * imagesArray.length)];
    setUrl(randomImage.largeImageURL)
  }

  const loadImages = async (searchTerm) => {
    const apiUrl = "https://pixabay.com/api/"
    const apiKey = process.env.REACT_APP_PIXABAY_KEY
    const limit = 15
    const myRequest = `${apiUrl}/?key=${apiKey}&q=${searchTerm}&image_type=photo&per_page=${limit}&safeSearch=true`
    const imagesFetch = await hangarFetch(`pixabay-${searchTerm}`, myRequest)
    const imagesArray = await imagesFetch.hits
    const randomImage = imagesArray[Math.floor(Math.random() * imagesArray.length)]
    setImages(imagesArray)
    setUrl(randomImage.largeImageURL)
  }

  const handleChange = (e) => {
    setSearchText(e.target.value)
  }

  const changeSearchTerm = () => {
    document.getElementById('searchText').value = '';
    const userPreferredData = JSON.parse(localStorage.getItem('userPreferedData'))
    userPreferredData['background'] = searchText
    loadImages(searchText)
    setCurrentTheme(searchText)
    localStorage.setItem('userPreferedData', JSON.stringify(userPreferredData))
  }

  const changeSettingsMenu = (e) => {
    const settingsMenu = e.currentTarget;
    const settingsMenuText = settingsMenu.innerText;
    if (settingsMenuText === 'Display') {
      document.querySelector('#settings-background').style.display = 'block';
      document.querySelector('#display-set-li').classList.remove('bg-secondary', 'text-primary')
      document.querySelector('#display-set-li').classList.add('bg-primary', 'text-secondary')
      document.querySelector('#settings-preference').style.display = 'none';
      document.querySelector('#pref-set-li').classList.add('bg-secondary', 'text-primary')
      document.querySelector('#pref-set-li').classList.remove('bg-primary', 'text-secondary')
      document.querySelector('#settings-account').style.display = 'none';
      document.querySelector('#account-set-li').classList.add('bg-secondary', 'text-primary')
      document.querySelector('#account-set-li').classList.remove('bg-primary', 'text-secondary')
    } else if (settingsMenuText === 'Preferences') {
      document.querySelector('#settings-background').style.display = 'none';
      document.querySelector('#display-set-li').classList.add('bg-secondary', 'text-primary')
      document.querySelector('#display-set-li').classList.remove('bg-primary', 'text-secondary')
      document.querySelector('#settings-preference').style.display = 'block';
      document.querySelector('#pref-set-li').classList.remove('bg-secondary', 'text-primary')
      document.querySelector('#pref-set-li').classList.add('bg-primary', 'text-secondary')
      document.querySelector('#settings-account').style.display = 'none';
      document.querySelector('#account-set-li').classList.add('bg-secondary', 'text-primary')
      document.querySelector('#account-set-li').classList.remove('bg-primary', 'text-secondary')
    } else {
      document.querySelector('#settings-background').style.display = 'none';
      document.querySelector('#display-set-li').classList.add('bg-secondary', 'text-primary')
      document.querySelector('#display-set-li').classList.remove('bg-primary', 'text-secondary')
      document.querySelector('#settings-preference').style.display = 'none';
      document.querySelector('#pref-set-li').classList.add('bg-secondary', 'text-primary')
      document.querySelector('#pref-set-li').classList.remove('bg-primary', 'text-secondary')
      document.querySelector('#settings-account').style.display = 'block';
      document.querySelector('#account-set-li').classList.remove('bg-secondary', 'text-primary')
      document.querySelector('#account-set-li').classList.add('bg-primary', 'text-secondary')
    }
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  const toggleFinder = () => {
    setShowFinder(!showFinder)
  }

  const addZero = (n) => (n < 10 ? '0' + n : n)

  const showClock = () => {
    const dateObject = new Date();
    const date = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = addZero(dateObject.getMinutes());
    const timeString = `${date}-${month}-${year}  ${hours}:${minutes}`;
    setClock(timeString)
  }

  const toggleStickyNote = () => {
    showStickyNote(!stickyNote)
  }

  const handleChangeFinder = (e) => {
    const val = e.target.value
    setFinderValue(val.toLowerCase())
  }

  const enableSticky = () => {
    const userPreferredData = JSON.parse(localStorage.getItem('userPreferedData'))
    userPreferredData['stickyNotes'] = !displaySticky
    setDisplaySticky(!displaySticky)
    localStorage.setItem('userPreferedData', JSON.stringify(userPreferredData))
  }

  const enableFinder = () => {
    const userPreferredData = JSON.parse(localStorage.getItem('userPreferedData'))
    userPreferredData['finder'] = !displayFinder
    setDisplayFinder(!displayFinder)
    localStorage.setItem('userPreferedData', JSON.stringify(userPreferredData))
  }

    return (
    <>
    {!loading ? (<>
     <Overlay
          imageUrl={url}
          changeOverlay={changeOverlay}
          userName={userData.hangarId}
          handleChange={handleChange}
          changeSearchTerm={changeSearchTerm}
          changeSettingsMenu={changeSettingsMenu}
          showSettings={showSettings}
          clock={clock}
          currentTheme={currentTheme}
          enableSticky={enableSticky}
          stickyState={displaySticky}
          enableFinder={enableFinder}
          finderState={displayFinder}
        />
        {stickyNote && displaySticky ? <StickyNotesList /> : null}
        {showFinder && displayFinder ? <Finder handleChangeFinder={handleChangeFinder} /> : null}
        <Dashboard
          toggleSettings={toggleSettings}
          toggleFinder={toggleFinder}
          displaySticky={displaySticky}
          displayFinder={displayFinder}
          showStickyNote={toggleStickyNote}
          finderVal={finderValue}
        /> 
    </>) : <SplashLoader />}
    </>
  )
}

export default Home
