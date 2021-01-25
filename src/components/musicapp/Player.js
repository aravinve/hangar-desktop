import {useState, useEffect, useRef} from 'react'
import MusicInfo from './MusicInfo'
import nilImage from '../../img/Nil_Image.png'
import PlaylistDialog from './PlaylistDialog'

function Player({songsList, clearSongs}) {

    const [isPlaying, setIsPlaying] = useState(false)
    const [activePlaylist, setActivePlaylist] = useState('Default')
    const [playlists, setPlaylists] = useState([])
    const [songs, setSongs] = useState([])
    const [index, setIndex] = useState(0)
    const [showPlaylist, setShowPlayList] = useState(true)
    const [showPlaylistDialog, setShowPlaylistDialog] = useState(false)
    const [volumeValue, setVolumeValue] = useState(0.5)
    const [seeking, setSeeking] = useState(false)
    const [seekTimeVal, setSeekTimeVal] = useState(0)
    const [songTotalTime, setSongTotalTime] = useState('00:00')
    const [songCurrentTime, setSongCurrentTime] = useState('00:00')
    const [playerGif, setPlayerGif] = useState('https://media.giphy.com/media/l1J9PnuDqssiDjSve/giphy.gif')
    const [activeColor, setActiveColor] = useState('gray')
    const playerGifArray = ['https://media.giphy.com/media/l1J9PnuDqssiDjSve/giphy.gif', 'https://media.giphy.com/media/24FQKrld82giZfXVcu/giphy.gif', 'https://media.giphy.com/media/l3vR8iPOwKry6hcD6/giphy.gif', 'https://media.giphy.com/media/3o7TKRV3MuEfhOtEas/giphy.gif', 'https://media.giphy.com/media/26u4jNRRHk3SVtZ5K/giphy.gif']
    const playerRef = useRef({src: songs.length > 0 ? songs[index].songData : null, volume: 0.5, duration: 0, currentTime: 0})
    const colorsArray = ['gray','blue', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink']

    const playerStyle = {
        bottom: '5rem',
        left: '0'
    }

    const styleOverlay = {
        width: playerGif === nilImage ? '4rem': '480px',
        height: playerGif === nilImage ? '4rem': '400px',
        margin: playerGif === nilImage ? '14rem auto' : '4rem auto',
        boxShadow: playerGif === nilImage ? 'none' : '1px 2px 10px 1px #030303',
        borderRadius: '4px',
        backgroundImage: 'url(' + playerGif + ')',
        backgroundSize: 'cover',
        backgroundClip: 'border-box',
        backgroundPosition: 'center',
        opacity: '1',
        backgroundRepeat: 'no-repeat'
      };

    useEffect(() => {
       setPlayerGif(nilImage)
       setActiveColor(colorsArray[0])
       setPlaylists(playlists.concat(
        {
            name: activePlaylist,
            songs: []
        }
    ))
    }, [])

    useEffect(() => {
        if(songsList.length > 0){
            setPlaylists(playlists.map(pl => {
                if(pl.name.toLowerCase() === activePlaylist.toLowerCase()){
                    pl.songs = songsList
                }
                return pl
            }))
            setSongs(songsList)
        }
    }, [songsList])

    useEffect(() => {
        if(songs.length > 0){
            playerRef.current.src = songs[index].songData
            playerRef.current.play()
            setIsPlaying(true)
        }
    }, [index])

    useEffect(() => {
        playerRef.current.volume = volumeValue
    }, [volumeValue])

    useEffect(() => {
        if(!isPlaying){
            playerRef.current.pause()
        } else {
            playerRef.current.src = songs[index].songData
            playerRef.current.play()
        }
        handlePlayerGif()
    }, [isPlaying])
    
    const handlePlaySong = () => {
        if(songs.length > 0){
            setIsPlaying(!isPlaying)
        }
    }

    const changeSong = (changedIndex) => {
        if(changedIndex < 0){
            setIndex(songs.length - 1)
        } else if (changedIndex < songs.length) {
            setIndex(changedIndex)
        } else {
            setIndex(0)
        }
    }   

    const handlePlayerGif = () => {
        if(songsList.length > 0){
            if(isPlaying){
                setPlayerGif(playerGifArray[Math.floor(Math.random() * playerGifArray.length)])
            } else {
                setPlayerGif(nilImage)
            }
        }
    }

    const modifyActiveColor = () => {
        setActiveColor(colorsArray[Math.floor(Math.random() * colorsArray.length)])
    }

    const playSong = (songId, songIndex) => {
        const targetSong = songs.find(song => song.id === songId)
        if(targetSong){
            playerRef.current.src = targetSong.songData
            playerRef.current.play()
            setIsPlaying(true)
            setIndex(songIndex)
        }
    }

    const modifyShowPlaylist = () => {
        setShowPlayList(!showPlaylist)
    }

    const songEndedHandler = () => {
        if(index === 0 && songs.length === 1){
            playerRef.current.play()
        } else {
            changeSong(index + 1)
        }
    }

    const handleVolume = (e) => {
        const rangeVal = e.target.value
        setVolumeValue(rangeVal)
    }

    const clearPlaylist = () => {
        setIsPlaying(false)
        setIndex(0)
        setSongs([])
        setVolumeValue(0.5)
        setSeekTimeVal(0)
        setSeeking(false)
        setSongCurrentTime("00:00")
        setSongCurrentTime("00:00")
        setPlayerGif(nilImage)
        setPlaylists([])
        setActivePlaylist('Default')
        clearSongs()
    }

    const handleSongSeek = (e) => {
        if(seeking && songs.length > 0 && isPlaying){
            const currentSeekTime = e.target.value
            setSeekTimeVal(currentSeekTime)
            const moveSeekTime = Math.ceil(playerRef.current.duration * (currentSeekTime / 100))
            playerRef.current.currentTime = moveSeekTime
        }
    }

    const timeUpdateHandler = () => {
        if(isPlaying && songs.length > 0 &&  !Number.isNaN(playerRef.current.duration)){
            const newTime =  playerRef.current.currentTime * (100 / playerRef.current.duration)
            setSeekTimeVal(newTime)
            let currentMins = Math.floor(playerRef.current.currentTime / 60)
            let currentSecs = Math.floor(playerRef.current.currentTime - currentMins * 60)
            let durationMins = Math.floor(playerRef.current.duration / 60)
            let durationSecs = Math.floor(playerRef.current.duration - durationMins * 60)
            currentMins = currentMins < 10 ? '0' + currentMins : currentMins
            currentSecs = currentSecs < 10 ? '0' + currentSecs : currentSecs
            durationMins = durationMins < 10 ? '0' + durationMins : durationMins
            durationSecs = durationSecs < 10 ? '0' + durationSecs : durationSecs
            setSongCurrentTime(`${currentMins}:${currentSecs}`)
            setSongTotalTime(`${durationMins}:${durationSecs}`)
        }
    }

    const managePlaylistDialog = () => {
        setShowPlaylistDialog(!showPlaylistDialog)
    }

    const publishPlaylists = (playlistData) => {
        setIsPlaying(false)
        setIndex(0)
        setPlaylists(playlistData)
    }

    const handlePlaylistChange = (e) => {
        const activePlaylist = e.target.value
        const targetPlaylist = playlists.find(pl => pl.name.toLowerCase() === activePlaylist.toLowerCase())
        if(targetPlaylist){
            setIsPlaying(false)
            setIndex(0)
            setActivePlaylist(targetPlaylist.name)
            setSongs(targetPlaylist.songs)
        }
    }


    return (
        <>
            <div className="grid grid-cols-2 gap-2 mt-2 mb-2">
                <div className='col-span-1 flex flex-row cursor-pointer' onClick={handlePlayerGif} style={styleOverlay}>&nbsp;</div>
                <MusicInfo songsMetaList={songs} playSong={playSong} nowPlaying={index} isPlaying={isPlaying} showPlaylist={showPlaylist} modifyShowPlaylist={modifyShowPlaylist} activeColor={activeColor} clearPlaylist={clearPlaylist} managePlaylist={managePlaylistDialog} handlePlaylistChange={handlePlaylistChange} playlistMeta={playlists} />
            </div>
            {showPlaylistDialog ? <PlaylistDialog closeModal={managePlaylistDialog} songs={songs} publishPlaylists={publishPlaylists} existingPlaylistData={playlists} /> : null}
           <audio ref={playerRef} src={songs.length > 0 ? songs[index].songData : null} hidden onEnded={songEndedHandler} onTimeUpdate={timeUpdateHandler}></audio>
           <div className={`bg-${activeColor}-200 fixed w-full rounded-sm shadow-sm outline-none focus:outline-none cursor-pointer`} style={playerStyle} onClick={modifyActiveColor}>
                <div className="flex flex-row items-center mt-1 py-2">
                    {songs.length > 0 ? (  <div className="flex-1 flex-col py-2 px-4 mx-2">
                        <p className="text-xl truncate select-none">
                                {songs[index].name}
                        </p>
                        <p className="text-xs truncate select-none capitalize">
                            {songs[index].tags.common.album !== undefined ? songs[index].tags.common.album : null} {songs[index].tags.common.year !== undefined ? `[${songs[index].tags.common.year}] ` : null} 
                            {songs[index].tags.common.composer !== undefined ? songs[index].tags.common.composer + ', ' : null}{songs[index].tags.common.artist !== undefined ? songs[index].tags.common.artist : null}
                        </p>
                    </div>) : null}
                    <div className="flex-shrink-0 mx-2">
                        <button className='px-2 py-1 rounded-sm shadow-sm bg-primary text-secondary focus:outline-none outline-none cursor-pointer' onClick={handlePlaySong}>
                            {isPlaying ? (<i className='fas fa-stop'></i>) : <i className='fas fa-play'></i>}
                        </button>
                    </div>
                    <div className="flex-1 cursor-pointer px-2 py-1 inline-flex items-center justify-center">
                        <input type="range" className="slider" min={0} max={100} step={1} 
                        value={seekTimeVal}
                        onChange={(e) => {
                            handleSongSeek(e)
                        }}
                        onMouseDown={(e) => {
                            setSeeking(true)
                            handleSongSeek(e)
                        }}
                        onMouseUp={() => {
                            setSeeking(false)
                        }}
                        /> 
                        <span className="inline-flex justify-center mx-1 text-sm text-primary">
                            <span>{songCurrentTime}</span>
                            <span>/ </span>
                            <span>{songTotalTime}</span>
                        </span>
                    </div>
                    <div className="flex-shrink-0 mx-2">
                        <button className='px-2 py-1 mx-1 rounded-sm shadow-sm bg-primary text-secondary focus:outline-none outline-none cursor-pointer' onClick={() => changeSong(index - 1)}>
                            <i className='fas fa-backward'></i>
                        </button>
                        <button className='px-2 py-1 mx-1 rounded-sm shadow-sm bg-primary text-secondary focus:outline-none outline-none cursor-pointer' onClick={() => changeSong(index + 1)}>
                            <i className='fas fa-forward'></i>
                        </button>
                    </div>
                    <div className="flex-shrink-0 px-2 py-1 inline-flex items-center justify-center">
                        <i className={volumeValue > 0 ? 'fas fa-volume-up mx-1 text-primary' : 'fas fa-volume-off mx-1 text-primary'}></i>
                        <input type="range" className="slider" value={volumeValue} min={0} max={1} step={0.1} onChange={handleVolume} onMouseMove={(e) => {
                           const element = e.target
                           element.style.background = `linear-gradient(90deg, #172b4d ${Math.ceil((volumeValue) * 100)}%, #f2f2f2 ${Math.ceil((volumeValue) * 100)}%)`
                       }} /> <span className="mx-1 text-md text-primary">{volumeValue * 100}</span>
                    </div>
                </div>
           </div>
        </>
    )
}

export default Player
