import {useState, useEffect} from 'react'
import Dashboard from '../home/Dashboard'
import SidePane from './SidePane'
import Player from './Player'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

function Music() {
  const [songs, setSongs] = useState([])
  const [baseMusicFolder, setBaseMusicFolder] = useState(true)

  const soundLoadedHandler = (event, arg) => {
    const {id, dataStream} = arg
    const updatedSongs = songs.map(song => {
      if(song.id === id){
        song.songData = dataStream
      }
      return song
    })
    setSongs(updatedSongs)
  }

  useEffect(() => {
    ipcRenderer.on("soundLoaded", soundLoadedHandler)
    return () => ipcRenderer.removeListener("soundLoaded", soundLoadedHandler)
  }, [songs])

  const handleChange = () => {
    setBaseMusicFolder(!baseMusicFolder)
  }

  const getFolder = () => {
    let musicData = ipcRenderer.sendSync('get-folder', {baseMusicFolder})
    if(musicData.length > 0 && musicData !== null){
      setSongs(songs.concat(musicData))
      musicData.map(music => {
        ipcRenderer.send("readSound", music)
      })
    }
  }

  const clearSongs = () => {
    setSongs([])
  }

  return (
    <>
        <div
          className='mt-8 text-center flex flex-col justify-center'>
            <SidePane handleChange={handleChange} folderPath={baseMusicFolder} getFolder={getFolder} />
            <Player songsList={songs} clearSongs={clearSongs} />
        </div>
        <Dashboard />
      </>
  )
}

export default Music
