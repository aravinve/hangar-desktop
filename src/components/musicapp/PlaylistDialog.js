import {useState, useEffect} from 'react'

function PlaylistDialog({closeModal, songs, publishPlaylists, existingPlaylistData}) {
    const modalStyle = {
        top: '2.5rem',
        left: '0.5rem',
        zIndex: '9',
        height: '500px'
    }

    const [showCreateNew, setShowCreateNew] = useState(false)
    const [playListName, setPlayListName] = useState('Default')
    const [selectedPlaylistSongs, setSelectedPlaylistSongs] = useState([])
    const [selectedPlaylist, setSelectedPlayList] = useState('Default')
    const [playlists, setPlaylists] = useState([])
    const [alert, setAlert] = useState('')
    
    useEffect(() => {
        if(existingPlaylistData !== null && existingPlaylistData.length > 0){
            setPlaylists(existingPlaylistData)
            setSelectedPlayList(existingPlaylistData[0].name)
            setSelectedPlaylistSongs(existingPlaylistData[0].songs)
            setAlert(`${existingPlaylistData[0].name} playlist loaded successfully!`)
            resetAlert()
        } else {
            const initData = songs.filter(song => song.playlist.toLowerCase() === selectedPlaylist.toLowerCase())
            setPlaylists(playlists.concat({
                name: playListName,
                songs: initData
            }))
            setSelectedPlayList(playListName)
            setSelectedPlaylistSongs(initData)
            setAlert(`${playListName} playlist loaded successfully!`)
            resetAlert()
        }
    }, [])

    const handleShowCreate = () => {
        setShowCreateNew(!showCreateNew)
    }

    const handleChange = (e) => {
        setPlayListName(e.target.value)
    }

    const resetAlert = () => {
        setTimeout(() => {
            setAlert('')
        }, 4000)
    }

    const handleSave = () => {
        if(playListName !== ''){
            const target = playlists.find(pl => pl.name.toLowerCase() === playListName.toLowerCase())
            if(!target){
                setAlert(`${playListName} created successfully!`)
                resetAlert()
                setSelectedPlayList(playListName)
                setPlaylists(playlists.concat({
                    name: playListName,
                    songs: []
                }))
                setSelectedPlaylistSongs([])
                handleShowCreate()
            } else {
                setAlert(playListName.concat(' already exists!'))
                resetAlert()
            }
        } else {
            setAlert('Playlist Name Cannot Be Empty!')
            resetAlert()
        }
    }

    const handlePlaylistSelection = (playlistname) => {
        setSelectedPlayList(playlistname)
        const targetPlaylist = playlists.find(pl => pl.name.toLowerCase() === playlistname.toLowerCase())
        setSelectedPlaylistSongs(targetPlaylist.songs)
        setAlert(`${playlistname} playlist loaded successfully!`)
        resetAlert()
    }

    const handleCheckbox = (e, checkedSong) => {
        if(e.target.checked){
            const updatedPlaylistSongs = selectedPlaylistSongs.concat(checkedSong)
            setSelectedPlaylistSongs(updatedPlaylistSongs)
            setPlaylists(playlists.map(pl => {
                if(pl.name.toLowerCase() === selectedPlaylist.toLowerCase()){
                    pl.songs = updatedPlaylistSongs
                }
                return pl
            }))
        } else {
            const updatedPlaylistSongs = selectedPlaylistSongs.filter(song => song.id !== checkedSong.id)
            setSelectedPlaylistSongs(updatedPlaylistSongs)
            setPlaylists(playlists.map(pl => {
                if(pl.name.toLowerCase() === selectedPlaylist.toLowerCase()){
                    pl.songs = updatedPlaylistSongs
                }
                return pl
            }))
        }
    }

    const checkSongPresentCommon = (songId) => {
        return selectedPlaylistSongs.find(song => song.id === songId) !== undefined
    }

    const handlePublish = () => {
        publishPlaylists(playlists)
        setAlert('All Playlists Published Successfully!')
        resetAlert()
    }

    const deleteSelectedPlaylist = () => {
        if(selectedPlaylist.toLowerCase() === 'default'){
            setAlert(`Cannot delete ${selectedPlaylist} playlist!`)
            resetAlert()
        } else {
            setAlert(`${selectedPlaylist} playlist deleted successfully!`)
            resetAlert()
            setPlaylists(playlists.filter(pl => pl.name !== selectedPlaylist))
            setSelectedPlayList(playlists[0].name)
            setSelectedPlaylistSongs(playlists[0].songs)
        }
    }

    const alertMessage = alert !== '' ? (<>
        <div className='flex flex-row bg-secondary rounded-sm shadow-md mx-8 my-1 justify-center px-8'>
            <div className='flex-1 text-primary text-lg select-none'>
                {alert}
            </div>
        </div>
    </>) : null

    return (
        <div className="fixed w-screen bg-primary overflow-x-hidden overflow-y-auto" style={modalStyle}>
        <div className="flex flex-row justify-end mt-3 mr-8 mb-1">
            <div className="text-primary bg-secondary rounded-full h-10 w-10 items-center justify-center text-lg cursor-pointer flex" onClick={closeModal}>
                <i className="fas fa-times"></i>
            </div>
        </div>
        <div className="flex flex-row my-1">
            <div className="flex-1">
                <div className="text-2xl inline-flex flex-row items-center justify-start text-secondary mx-1 select-none">
                    <i className='fas fa-th-list mx-1'></i>
                    <span>Manage Playlists</span>
                </div>
            </div>
            <div className="flex-shrink-0 mr-8 ml-1 my-2 flex flex-row justify-end">
                <div className="px-2 py-1 bg-secondary text-primary text-sm cursor-pointer" title='Publish Playlists' onClick={handlePublish}>
                    <i className='fas fa-upload mx-1'></i>Publish
                </div>
            </div>
        </div>
       <div className="flex flex-row px-8">
           <div className="inline-flex flex-row justify-start flex-auto w-2/3 text-secondary border-t-2 border-b-2 border-l-2 border-gray-600 mx-1 my-1">
                <div className="text-lg text-secondary inline-flex items-center capitalize">
                    <i className='fas fa-music mx-1'></i> {selectedPlaylist} Playlist
                </div>
           </div>
            <div className='inline-flex flex-row justify-end flex-auto w-1/3 text-primary border-t-2 border-b-2 border-r-2 border-gray-600 my-1'>
                {showCreateNew ? (<>
                    <input
                        type='text'
                        className='rounded-l-sm shadow-md p-1 text-sm text-primary w-full outline-none focus:outline-none'
                        placeholder="Playlist Title"
                        value={playListName}
                        onChange={handleChange}
                    />
                    <div className='flex-shrink-0 m-1'>
                        <button
                            className='cursor-pointer text-secondary bg-primary text-sm px-1 py-2 rounded-r-sm focus:outline-none' onClick={handleSave}>
                            <i className='fas fa-save'></i> Save
                        </button>
                    </div>
                </>) : <>
                    <div className="flex-shrink-0 mr-2 flex flex-row justify-end">
                        <div className='text-secondary text-xl cursor-pointer' title='Create New Playlist' onClick={handleShowCreate}>
                            <i className="fas fa-plus-square"></i>
                        </div>
                    </div>
                    <div className="flex-shrink-0 mr-2 flex flex-row justify-end">
                        <div className='text-secondary text-xl cursor-pointer' title='Delete Selected Playlist' onClick={deleteSelectedPlaylist}>
                            <i className="fas fa-trash"></i>
                        </div>
                    </div>
                </>}
            </div>
       </div>
       {alertMessage}
        <div className="flex flex-row px-4">
            <div className="flex-auto grid grid-cols-3 p-2 rounded-sm shadow-md bg-secondary mb-8 mx-4">
                <div className='flex flex-col justify-start my-4'>
                    <div className="text-primary text-lg">
                        {`Playlist Count: ${playlists.length}`}
                    </div>
                    {playlists.length > 0 ? playlists.map((pl, index) => (
                        <div className={pl.name === selectedPlaylist ? 'bg-primary text-secondary text-sm shadow-md rounded-md p-1 m-1 cursor-pointer' : 'bg-white text-primary text-sm shadow-md rounded-md p-1 m-1 cursor-pointer'} key={index}>
                        <div className='flex flex-row items-center justify-start' onClick={() => handlePlaylistSelection(pl.name)}>
                            <div className='flex-1 text-sm truncate capitalize select-none'>
                                {pl.name}
                            </div>
                        </div>
                        </div>
                    )): <h2 className='text-primary text-xl'>No Playlists Created !!</h2>}
                </div>
                <div className="flex flex-col justify-start my-4">
                    <div className="text-primary text-lg">
                        {`All Imported Songs`}
                    </div>
                    {songs.length > 0 && playlists.length > 0 ? songs.map(song => (
                        <div key={song.id} className='bg-secondary text-primary text-sm shadow-md rounded-md p-1 m-1 cursor-pointer'>
                        <div className='flex flex-row items-center justify-start'>
                            <div className="flex-shrink-0"><input type="checkbox" className='m-2 rounded-sm' onChange={(e) => handleCheckbox(e, song)} checked={checkSongPresentCommon(song.id)} />
                            </div>
                            <div className='flex-1 text-primary text-sm truncate select-none'>
                                {song.name}
                            </div>
                        </div>
                    </div>
                    )): <div className='text-primary text-xl capitalize'>
                            {`Zero songs in Default playlist`}
                        </div>}
                </div>
                <div className="flex flex-col justify-start my-4">
                    <div className="text-primary text-lg">
                        {`${selectedPlaylist} Playlist Songs `}
                    </div>
                    {playlists.length > 0 && selectedPlaylistSongs.length > 0 ? selectedPlaylistSongs.map(song => (
                            <div key={song.id} className='bg-secondary flex flex-row text-primary text-sm m-1'>
                               <div className='flex-1 text-primary text-sm truncate select-none'>
                                    {song.name}
                                </div>
                            </div>
                        )): <div className='text-primary text-xl capitalize'>
                    {`${selectedPlaylist} playlist is empty!`}
                </div>}
                </div>
            </div>
        </div>
    </div>
    )
}

export default PlaylistDialog
