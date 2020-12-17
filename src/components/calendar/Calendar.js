import Dashboard from '../home/Dashboard';
import overlayImage from '../../img/under_construction.png'

function Calendar() {
  const styleOverlay = {
    width: '60vw',
    height: '50vh',
    backgroundImage: 'url(' + overlayImage + ')',
    backgroundSize: 'cover',
    backgroundClip: 'border-box',
    backgroundPosition: 'center',
    opacity: '100%',
    backgroundRepeat: 'no-repeat',
    top: '10rem',
    left: '18rem'
  };
  return (
    <>
        <div
          className='mt-16 text-center flex flex-col justify-center'
        >
          <h1 className='text-5xl text-primary mb-4'>Under Construction</h1>
          <div className='fixed' style={styleOverlay}></div>
        </div>
        <Dashboard />
      </>
  )
}

export default Calendar
