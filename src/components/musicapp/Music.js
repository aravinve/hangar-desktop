import {useState, useEffect} from 'react'
import Dashboard from '../home/Dashboard'
import MusicFolder from './MusicFolder'
import Player from './Player'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

function Music() {
  const [songs, setSongs] = useState([])
  const [baseMusicFolder, setBaseMusicFolder] = useState('')
  const [albumArt, setAlbumArt] = useState('')

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

  const handleChange = (e) => {
    const value = e.target.value.replaceAll("\\", "/")
    setBaseMusicFolder(value)
  }

  const getFolder = () => {
    let musicData = ipcRenderer.sendSync('get-folder', {baseMusicFolder})
    setSongs(musicData)
    musicData.map(music => {
      ipcRenderer.send("readSound", music)
    })
  }

  const playSong = (songLocation) => {
    
    
  }

  return (
    <>
        <div
          className='mt-16 text-center flex flex-col justify-center'>
            <MusicFolder handleChange={handleChange} getFolder={getFolder} />
            <Player baseMusicFolder={baseMusicFolder} albumArt={albumArt} songsList={songs} playSong={playSong} />
        </div>
        <Dashboard />
      </>
  )
}

export default Music
