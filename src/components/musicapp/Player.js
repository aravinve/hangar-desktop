import {useState, useEffect, useRef} from 'react'
import MusicInfo from './MusicInfo'
import imageUrl from '../../img/gif.gif'

function Player({baseMusicFolder, albumArt, songsList, playSong}) {

    const playerStyle = {
        bottom: '5rem',
        left: '0'
    }

    const [isPlaying, setIsPlaying] = useState(false)
    const [songs, setSongs] = useState([])
    const [index, setIndex] = useState(0)
    const playerRef = useRef({src: songs[index].songData})

    useEffect(() => {
        if(songsList.length > 0){
            setSongs(songsList)
        }
    }, [songsList])

    useEffect(() => {
        if(songs.length > 0){
            console.log(index, songs[index])
            playerRef.current.src = songs[index].songData
            playerRef.current.play()
            setIsPlaying(true)
        }
    }, [index])

    useEffect(() => {
        if(!isPlaying){
            console.log("Pause")
            playerRef.current.pause()
        } else {
            console.log("Playing")
            playerRef.current.src = songs[index].songData
            playerRef.current.play()
        }
    }, [isPlaying])
    
    const handlePlaySong = () => {
        if(songs.length > 0){
            setIsPlaying(!isPlaying)
        }
    }

    const changeSong = (changedIndex) => {
        if(changedIndex < songs.length){
            setIndex(changedIndex)
        } else if (changedIndex < 0) {
            setIndex(songs.length)
        } else {
            setIndex(0)
        }
    }   

    const styleOverlay = {
        width: '100%',
        height: '30vh',
        margin: '0px',
        backgroundImage: 'url(' + imageUrl + ')',
        backgroundSize: 'cover',
        backgroundClip: 'border-box',
        backgroundPosition: 'center',
        opacity: '1',
        backgroundRepeat: 'no-repeat',
        WebkitAnimation: 'fadein 2s',
        MozAnimation: 'fadein 2s',
        animation: 'fadein 2s',
      };

    return (
        <>
           {/* <audio controls autoPlay className='bg-secondary fixed w-full rounded-sm shadow-sm outline-none focus:outline-none' style={playerStyle}>
               {songListData.length > 0 && songListData.map((song, index) => (
                   <source key={index} src={song} type="audio/mp3" />
               ))}
           </audio>  */}
           {console.log("Songs Metadata", songsList.length)}
            <MusicInfo baseMusicFolder={baseMusicFolder} albumArt={albumArt} songsMetaList={songsList} playSong={playSong} nowPlaying={index} />
            <div className='flex flex-row' style={styleOverlay}>&nbsp;</div>
           <audio ref={playerRef} src={songs[index].songData} hidden></audio>
           <div className='bg-secondary fixed w-full rounded-sm shadow-sm outline-none focus:outline-none' style={playerStyle}>
                <div className="flex flex-row mt-1 py-2">
                    <div className="flex-1">
                        <button className='px-2 py-1 rounded-sm shadow-sm bg-primary text-secondary focus:outline-none outline-none cursor-pointer' onClick={handlePlaySong}>
                            {isPlaying ? (<i className='fas fa-pause'></i>) : <i className='fas fa-play'></i>}
                        </button>
                    </div>
                    <div className="flex-1">
                        <button className='px-2 py-1 mx-1 rounded-sm shadow-sm bg-primary text-secondary focus:outline-none outline-none cursor-pointer' onClick={() => changeSong(index - 1)}>
                            <i className='fas fa-backward'></i>
                        </button>
                        <button className='px-2 py-1 mx-1 rounded-sm shadow-sm bg-primary text-secondary focus:outline-none outline-none cursor-pointer' onClick={() => changeSong(index + 1)}>
                            <i className='fas fa-forward'></i>
                        </button>
                    </div>
                </div>
           </div>
        </>
    )
}

export default Player
