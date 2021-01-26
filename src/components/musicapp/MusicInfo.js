function MusicInfo({songsMetaList, playSong, nowPlaying, isPlaying, showPlaylist, modifyShowPlaylist, activeColor, clearPlaylist, managePlaylist, handlePlaylistChange, playlistMeta}) {
    return (
        <>
           {showPlaylist ? (<div className={`col-span-1 flex flex-col justify-start bg-${activeColor}-200 rounded-sm shadow-sm border b-2 border-grey-600 overflow-x-hidden overflow-y-auto`} style={{height: '540px'}}>
                <div className="flex flex-row justify-center items-center">
                    <div className="flex-auto flex flex-row justify-center">
                        <h2 className='text-primary mt-2 ml-8 mb-1 text-2xl'>
                            <i className="fas fa-music mr-2"></i>
                            <select name='playlistSelect' className="rounded-sm shadow-sm px-1 text-2xl text-primary outline-none focus:outline-none mr-1 cursor-pointer" onChange={handlePlaylistChange}>
                                {playlistMeta.length > 0 ? playlistMeta.map(pl => (
                                      <option key={pl.name} value={pl.name} className='text-primary text-lg'>
                                          {pl.name}
                                      </option>
                                )) :  <option value='' selected disabled hidden>
                                Choose
                              </option>}
                            </select>
                            <span>
                                Playlist
                            </span>
                        </h2>
                    </div>
                    <div className="flex-shrink-0 mr-2 flex flex-row justify-end">
                        <div className='text-primary text-xl cursor-pointer' title='Manage Playlist' onClick={managePlaylist}>
                            <i className="fas fa-list"></i>
                        </div>
                    </div>
                    <div className="flex-shrink-0 mr-2 flex flex-row justify-end">
                        <div className='text-primary text-xl cursor-pointer' title='Clear Playlist' onClick={clearPlaylist}>
                            <i className="fas fa-ban"></i>
                        </div>
                    </div>
                    <div className="flex-shrink-0 mr-2 flex flex-row justify-end">
                        <div className='text-primary text-xl cursor-pointer' title='Close' onClick={modifyShowPlaylist}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                </div>
                {songsMetaList.length > 0 ? (<div className="flex inline-flex flex-row justify-center mr-8">
                        <div className='text-primary my-2 text-lg select-none'>
                            Total Tracks: {songsMetaList.length}
                        </div>
                    </div>) : null}
                {songsMetaList.length > 0 ? (<div className='cursor-pointer grid grid-cols-2 gap-2 mt-4 mb-16 px-4 rounded-b-sm'>
                    {songsMetaList.map((song, index) => (
                        <div key={index} className={nowPlaying === index && isPlaying ? `bg-${activeColor}-600 text-secondary rounded-sm shadow-sm my-2 w-full px-4 py-2 cursor-pointer` : 'bg-secondary text-primary rounded-sm shadow-sm my-2 w-full px-4 py-2 cursor-pointer'} id={song.id}>
                            <div className="grid grid-cols-1 gap-2">
                                <div className="colspan-1" onClick={() => playSong(song.id, index)}>
                                    <p className="text-xl truncate select-none">
                                        {song.name}
                                    </p>
                                    <p className="text-xs truncate select-none capitalize">
                                        {song.tags.common.album !== undefined ? song.tags.common.album : null} {song.tags.common.year !== undefined ? `[${song.tags.common.year}]` : null}
                                    </p>
                                    <p className="text-xs truncate select-none capitalize">
                                        {song.tags.common.composer !== undefined ? song.tags.common.composer + ', ' : null}{song.tags.common.artist !== undefined ? song.tags.common.artist : null}
                                    </p>
                                    {nowPlaying === index && isPlaying ? (<p className="text-sm select-none">
                                        Now Playing ...
                                    </p>) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>):(<div className="flex-auto flex flex-row justify-center">
                        <h2 className='text-primary mt-2 mr-8 mb-1 text-xl'>
                            No Music Added
                        </h2>
                    </div>)}
           </div>) : <div className='flex flex-row justify-center my-auto'><div className={`flex-shrink-0 bg-${activeColor}-200 text-primary px-2 py-4 cursor-pointer rounded-sm shadow-sm transform hover:scale-105`} onClick={modifyShowPlaylist}>
                        {showPlaylist ? 'Hide Playlist' : 'Show Playlist'}
               </div></div>}
        </>
    )
}

export default MusicInfo
