import {useState, useEffect} from 'react'
import Overlay from './Overlay';
import Dashboard from './Dashboard';
import axios from 'axios';
import StickyNote from './StickyNote';
import dragElement from './drag';

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
// const Menu = require('electron').remote.Menu

function Home() {
  const [searchText, setSearchText] = useState('mountains')
  const [images, setImages] = useState([])
  const [url, setUrl] = useState('')
  const [clock, setClock] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [stickyNote, showStickyNote] = useState(false)
  const [userData, setUserData] = useState('')

  useEffect(() => {
    ipcRenderer.on('userData', (event, arg) => {
      console.log(arg)
      setUserData(arg)
    });
    console.log(userData)
    loadImages(searchText);
    showClock();
    setInterval(showClock, 60000);
  },[])

  useEffect(() => {
    if(stickyNote){
      dragElement(document.getElementById('mydiv'));
    }
  }, [stickyNote])

  const changeOverlay = () => {
    const imagesArray = images;
    const randomImage =
      imagesArray[Math.floor(Math.random() * imagesArray.length)];
      setUrl(randomImage.largeImageURL)
  }

  const loadImages = (searchTerm) => {
    const apiUrl = "https://pixabay.com/api/"
    const apiKey = process.env.REACT_APP_PIXABAY_KEY
    const limit = 15
    axios
      .get(
        `${apiUrl}/?key=${apiKey}&q=${searchTerm}&image_type=photo&per_page=${limit}&safeSearch=true`
      )
      .then((res) => {
        const imagesArray = res.data.hits;
        const randomImage =
          imagesArray[Math.floor(Math.random() * imagesArray.length)];
          setImages(imagesArray)
          setUrl(randomImage.largeImageURL)
      })
      .catch((err) => console.log(err));
  }

  const handleChange = (e) => {
    setSearchText(e.target.value)
  }

  const changeSearchTerm = () => {
    document.getElementById('searchText').value = '';
    loadImages(searchText);
  }

  const changeSettingsMenu = (e) => {
    const settingsMenu = e.currentTarget;
    const settingsMenuText = settingsMenu.innerText;
    if (settingsMenuText === 'Background') {
      document.querySelector('#settings-background').style.display = 'block';
      document.querySelector('#settings-preference').style.display = 'none';
      document.querySelector('#settings-account').style.display = 'none';
    } else if (settingsMenuText === 'Preferences') {
      document.querySelector('#settings-background').style.display = 'none';
      document.querySelector('#settings-preference').style.display = 'block';
      document.querySelector('#settings-account').style.display = 'none';
    } else {
      document.querySelector('#settings-background').style.display = 'none';
      document.querySelector('#settings-preference').style.display = 'none';
      document.querySelector('#settings-account').style.display = 'block';
    }
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
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

  return (
    <>
    {console.log(userData)}
     <Overlay
          imageUrl={url}
          changeOverlay={changeOverlay}
          userName={userData.hangarId}
          handleChange={handleChange}
          changeSearchTerm={changeSearchTerm}
          changeSettingsMenu={changeSettingsMenu}
          showSettings={showSettings}
          clock={clock}
        />
        {stickyNote ? <StickyNote /> : null}
        <Dashboard
          toggleSettings={toggleSettings}
          showStickyNote={toggleStickyNote}
        /> 
    </>
  )
}

export default Home

  // initMenu = () => {
  //   const menu = Menu.buildFromTemplate([
  //     {
  //       label: 'File',
  //       submenu: [
  //         {
  //           label: 'Settings',
  //           accelerator: 'CmdOrCtrl+,',
  //           click: () => {
  //             this.toggleSettings();
  //           },
  //         },
  //         { type: 'separator' },
  //         {
  //           label: 'Quit',
  //           accelerator: 'CmdOrCtrl+Q',
  //           click: () => {
  //             localStorage.clear();
  //             ipcRenderer.send('logout');
  //           },
  //         },
  //       ],
  //     },
  //   ]);
  //   Menu.setApplicationMenu(menu);
  // };
