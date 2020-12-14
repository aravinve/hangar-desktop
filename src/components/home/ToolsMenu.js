import { Link } from 'react-router-dom';

function ToolsMenu() {
    const fixedStyle = {
        bottom: '6rem',
        left: '1rem',
        zIndex: '30'
    }
    return (
        <div className='fixed w-auto h-auto bg-secondary flex flex-row text-primary text-center shadow-xl rounded-md p-2' style={fixedStyle}>
                <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/calculator'>
                <i className="fas fa-calculator mr-2"></i> <span>Calculator</span>
                </Link>
                <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/calendar'>
                <i className="fas fa-calendar-alt mr-2"></i> <span>Calendar</span>
                </Link>
                <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/clock'>
                <i className="fas fa-clock mr-2"></i> <span>Clock</span>
                </Link>
                <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/converter'>
                <i className="fas fa-balance-scale mr-2"></i> <span>Converter</span>
                </Link>
                <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/dictionary'>
                <i className="fas fa-spell-check mr-2"></i> <span>Dictionary</span>
                </Link>
                <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/todoist'>
                <i className="fas fa-check-square mr-2"></i> <span>Todoist</span>
                </Link>
                <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/notes'>
                <i className="fas fa-book mr-2"></i> <span>Notes</span>
                </Link>
                <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md' to='/board'>
                <i className="fas fa-chalkboard mr-2"></i> <span>Board</span>
                </Link>
              </div>
    )
}

export default ToolsMenu
