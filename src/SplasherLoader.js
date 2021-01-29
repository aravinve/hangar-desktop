import splashDark from './img/splash_frame_dark.png'
import splashLight from './img/splash_frame_light.png'

function SplashLoader() {
    const userPreferredData = JSON.parse(localStorage.getItem('userPreferedData'))
    const targetSplash = userPreferredData['theme'] ? splashDark : splashLight
    return (
        <div className='flex flex-col items-center justify-center mt-8'>
            <img src={targetSplash} alt='Loading' className='rounded-md shadow-md' />
            <h1 className='text-4xl text-primary mt-4 shadow-md rounded-md'>Booting Hangar Now!!!</h1>
        </div>
    )
}

export default SplashLoader
