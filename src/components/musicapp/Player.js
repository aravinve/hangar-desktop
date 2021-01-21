import {useState, useEffect, useRef} from 'react'
import MusicInfo from './MusicInfo'
import nilImage from '../../img/Nil_Image.png'

function Player({songsList, clearSongs}) {

    const [isPlaying, setIsPlaying] = useState(false)
    const [songs, setSongs] = useState([])
    const [index, setIndex] = useState(0)
    const [showPlaylist, setShowPlayList] = useState(true)
    const [volumeValue, setVolumeValue] = useState(0.5)
    const [playerGif, setPlayerGif] = useState('https://media.giphy.com/media/l1J9PnuDqssiDjSve/giphy.gif')
    const [activeColor, setActiveColor] = useState('blue')
    const playerGifArray = ['https://media.giphy.com/media/l1J9PnuDqssiDjSve/giphy.gif', 'https://media.giphy.com/media/24FQKrld82giZfXVcu/giphy.gif', 'https://media.giphy.com/media/l3vR8iPOwKry6hcD6/giphy.gif', 'https://media.giphy.com/media/3o7TKRV3MuEfhOtEas/giphy.gif', 'https://media.giphy.com/media/26u4jNRRHk3SVtZ5K/giphy.gif']
    const playerRef = useRef({src: songs.length > 0 ? songs[index].songData : null, volume: 0.5})
    const colorsArray = ['blue', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink']

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
    }, [])

    useEffect(() => {
        if(songsList.length > 0){
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
        changeSong(index + 1)
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
        setPlayerGif(nilImage)
        clearSongs()
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-2 mt-2 mb-2">
                <div className='col-span-1 flex flex-row cursor-pointer' onClick={handlePlayerGif} style={styleOverlay}>&nbsp;</div>
                <MusicInfo songsMetaList={songs} playSong={playSong} nowPlaying={index} isPlaying={isPlaying} showPlaylist={showPlaylist} modifyShowPlaylist={modifyShowPlaylist} activeColor={activeColor} clearPlaylist={clearPlaylist} />
            </div>
           <audio ref={playerRef} src={songs.length > 0 ? songs[index].songData : null} hidden onEnded={songEndedHandler}></audio>
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
