import MusicFolder from './MusicFolder'

function SidePane({handleChange, folderPath, getFolder}) {
  const paneStyle = {
    top: '0.5rem',
    left: '0rem'
  }

  return (
    <div
      className='absolute w-auto h-auto shadow-md rounded-md bg-secondary'
      style={paneStyle}>
      <nav>
        <p className='bg-primary w-full py-1 px-2 rounded-t-md inline-flex items-center text-secondary text-xl select-none'>
        <i className="fas fa-music mr-2"> </i>Music</p>
        <MusicFolder handleChange={handleChange} folderPath={folderPath} getFolder={getFolder} />
      </nav>
    </div>
  );
}

export default SidePane
