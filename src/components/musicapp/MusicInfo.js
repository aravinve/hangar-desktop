function MusicInfo({baseMusicFolder, albumArt, songsMetaList, playSong, nowPlaying}) {
    return (
        <>
            {baseMusicFolder === '' ? <h2 className='text-secondary mt-2 text-2xl'>No Music Folder Selected!</h2> : <h2 className='text-secondary mt-2 text-2xl'>{baseMusicFolder} Selected as Music Folder</h2>}
            {albumArt !== '' ? <img src={albumArt} alt="Album Art" /> : null}
            <div className='grid grid-cols-2 gap-2 mt-4 mb-4 px-4'>
                {songsMetaList.map((song, index) => (
                    <div key={index} className={nowPlaying === index ? 'bg-primary text-secondary rounded-sm shadow-sm my-2 w-full px-4 py-2 cursor-pointer' : 'bg-secondary text-primary rounded-sm shadow-sm my-2 w-full px-4 py-2 cursor-pointer'} id={index} onClick={() => playSong(song.location)}>
                        <p className="text-xl select-none">
                            {song.name}
                        </p>
                        <p className="text-sm select-none">
                            {new Date(song.date).toDateString()}
                        </p>
                        {nowPlaying === index ? (<p className="text-sm select-none">
                            Now Playing ...
                        </p>) : null}
                    </div>
                ))}
            </div>
        </>
    )
}

export default MusicInfo
