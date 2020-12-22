import { Link } from 'react-router-dom'

function HangarMenu({shortListedMenu}) {
    const fixedStyle = {
        bottom: '6rem',
        left: '1rem',
        zIndex: '30'
    }
    const linkCards = shortListedMenu.length > 0 ? shortListedMenu.map((menu, index) => (
        <Link className='p-2 cursor-pointer transform hover:scale-y-105 inline-flex items-center text-primary text-md capitalize' to={menu.path} key={index}>
            <i className={`${menu.icon} mr-2`}></i> <span>{menu.title}</span>
        </Link>
    )) : null
    return (
        linkCards !== null ? (<div className='fixed w-auto h-auto bg-secondary flex flex-row text-primary text-center shadow-xl rounded-md p-2 m-auto' style={fixedStyle}>
        {linkCards}
   </div>) : null)
}

export default HangarMenu
