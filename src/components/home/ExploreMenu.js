import { Link } from 'react-router-dom';

function ExploreMenu() {
    const fixedStyle = {
        bottom: '6rem',
        left: '1rem',
        zIndex: '30'
    }
    return (
        <div className='fixed w-auto h-auto bg-secondary flex flex-row text-primary text-center shadow-xl rounded-md p-2' style={fixedStyle}>
                  <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/news'>
                  <i className="fas fa-newspaper mr-2"></i> <span>News</span>
                  </Link>
                  <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/music'>
                  <i className="fas fa-music mr-2"></i> <span>Music</span>
                  </Link>
                  <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/cook'>
                  <i className="fas fa-cookie-bite mr-2"></i> <span>Cook</span>
                  </Link>
                  <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/gallery'>
                  <i className="fas fa-photo-video mr-2"></i> <span>Gallery</span>
                  </Link>
                  <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/maps'>
                  <i className="fas fa-map-marker-alt mr-2"></i> <span>Maps</span>
                  </Link>
                  <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/weather'>
                  <i className="fas fa-cloud mr-2"></i> <span>Weather</span>
                  </Link>
                </div>
    )
}

export default ExploreMenu
