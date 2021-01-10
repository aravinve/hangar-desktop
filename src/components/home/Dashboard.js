import {useState, useEffect} from 'react'
import image from '../../img/Logo_Hangar.png'
import { Link } from 'react-router-dom'
import ExploreMenu from './ExploreMenu'
import ToolsMenu from './ToolsMenu'
import SocialMenu from './SocialMenu'
import HangarMenu from './HangarMenu'
import hangarMenu from './MenuMeta'

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function Dashboard({toggleSettings, toggleFinder, displaySticky, displayFinder, showStickyNote, finderVal}) {

  const [showExplore, setShowExplore] = useState(false)
  const [showTools, setShowTools] = useState(false)
  const [showSocial, setShowSocial] = useState(false)
  const [showHangarMenu, setShowHangarMenu] = useState(false)
  const [shortListedMenu, setShortListedMenu] = useState([])

  useEffect(() => {
    if(finderVal !== ''){
      const filterMenu = hangarMenu.filter(menu => menu.title.toLowerCase().includes(finderVal))
      setShowHangarMenu(true)
      setShortListedMenu(filterMenu)
    } else{
      setShowHangarMenu(false)
      setShortListedMenu([])
    }
  }, [finderVal])

  const handleMenuChange = (e) => {
    if(e.target.parentElement.id === "explore"){
      setShowExplore(!showExplore)
      setShowTools(false)
      setShowSocial(false)
    } else if(e.target.parentElement.id === "tools"){
      setShowExplore(false)
      setShowTools(!showTools)
      setShowSocial(false)
    }else if(e.target.parentElement.id === "social"){
      setShowExplore(false)
      setShowTools(false)
      setShowSocial(!showSocial)
    }else{
      setShowExplore(false)
      setShowTools(false)
      setShowSocial(false)
    }
  }

  const showSplash = () => {
    const userPreferredData = JSON.parse(localStorage.getItem('userPreferedData'))
    localStorage.clear()
    ipcRenderer.send('logout', userPreferredData)
  }

  const toggleSettingsFunction = () => {
    toggleSettings()
  }

  const toggleFinderFunction = () => {
    toggleFinder()
  }

  const createStickyNoteFunction = () => {
    showStickyNote()
  }

  const flag = window.location.href.includes('/home')

  const navbarStyle = {
    left: '0',
    bottom: '0',
    right: '0',
    zIndex: '30'
  }

  return (
    <>
    {showExplore ? <ExploreMenu  /> : null}
    {showTools ? <ToolsMenu  /> : null}
    {showSocial ? <SocialMenu  /> : null}
    {showHangarMenu ? <HangarMenu shortListedMenu={shortListedMenu} /> : null}
    <nav className='fixed bg-secondary text-primary w-full h-18 flex items-center' style={navbarStyle}>
       <div className='flex flex-auto justify-start items-center p-2'>
         <Link className="block" to='/home'><img src={image} className="cursor-pointer h-16" /></Link>
       </div>
        <div className='flex-auto justify-center'>
          <div className='flex flex-row text-center'>
            <div className='flex-1'>
              <p className='cursor-pointer inline-flex items-center text-primary text-md transform hover:scale-y-105' id="explore" onClick={handleMenuChange}><i className="fas fa-th-list mr-2"></i> <span>Explore</span></p>
            </div>
            <div className='flex-1'>
              <p className='cursor-pointer inline-flex items-center text-primary text-md transform hover:scale-y-105' id="tools" onClick={handleMenuChange}><i className="fas fa-tools mr-2"></i> <span>Tools</span></p>
            </div>
            <div className='flex-1'>
              <p className='cursor-pointer inline-flex items-center text-primary text-md transform hover:scale-y-105' id="social" onClick={handleMenuChange}><i className="fas fa-users mr-2"></i> <span>Social</span></p>
            </div>
          </div>
        </div>
        <div className='flex-auto flex justify-end'>
          <div className='flex'>
            <div className='flex-auto flex flex-row'>
              {flag ? (
                <>
                {displaySticky ? (<button className='flex-shrink-0 px-5 py-2 m-1 bg-primary shadow-md rounded-sm outline-none focus:outline-none text-secondary' onClick={createStickyNoteFunction}>
                    <i className='fas fa-sticky-note'></i>
                  </button>) : null}
                  {displayFinder ? (<button className='flex-shrink-0 px-5 py-2 m-1 bg-primary shadow-md rounded-sm outline-none focus:outline-none text-secondary' onClick={toggleFinderFunction}>
                    <i className='fas fa-search'></i>
                  </button>) : null}
                  <button className='flex-shrink-0 px-5 py-2 m-1 bg-primary shadow-md rounded-sm outline-none focus:outline-none text-secondary' onClick={toggleSettingsFunction}>
                    <i className='fas fa-cogs'></i>
                  </button>
                </>
              ) : null}
              <button className='flex-shrink-0 px-5 py-2 m-1 bg-primary shadow-md rounded-sm outline-none focus:outline-none text-secondary' onClick={showSplash}>
                <i className='fas fa-sign-out-alt'></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
      </>
  )
}

export default Dashboard
