function MusicFolder({handleChange,folderPath,getFolder}) {
    return (
        <div className='flex flex-row justify-center py-2 px-4'>
            <div className="flex-1 inline-flex">
          <p className='text-primary text-sm inline-flex items-center'>
            <span className='cursor-pointer' onClick={handleChange} title='Click Icon To Change Mode'>
              {folderPath ? (<i className='fas fa-folder mr-2'></i>) : (<i className='fas fa-music mr-2'></i>)}
            </span>
          </p>
          <button
            className='bg-primary cursor-pointer text-secondary text-sm p-1 rounded-sm focus:outline-none'
            onClick={getFolder}>
              {folderPath ? 'Import Album' : 'Import Songs'}
          </button>
          </div>
        </div>
    )
}

export default MusicFolder
