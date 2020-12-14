import { Link } from 'react-router-dom';

function SocialMenu() {
    const fixedStyle = {
        bottom: '6rem',
        left: '1rem',
        zIndex: '30'
    }
    return (
        <div className='fixed w-auto h-auto bg-secondary flex flex-row text-primary text-center shadow-xl rounded-md p-2' style={fixedStyle}>
                <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/reddit'>
                <i className="fab fa-reddit mr-2"></i> <span>Reddit</span>
                </Link>
                <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/wikipedia'>
                <i className="fab fa-wikipedia-w mr-2"></i> <span>Wikipedia</span>
                </Link>
                <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/hackernews'>
                <i className="fab fa-hacker-news-square mr-2"></i> <span>Hackernews</span>
                </Link>
                <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/covid'>
                <i class="fas fa-biohazard mr-2"></i> <span>Covid-19 Tracker</span>
                </Link>
              </div>
    )
}

export default SocialMenu
