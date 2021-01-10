import spashImage from './img/Splash_Frame.png'

function SplashLoader() {
    return (
        <div className='flex flex-col items-center justify-center mt-8'>
            <img src={spashImage} alt='Loading' className='rounded-md shadow-md' />
            <h1 className='text-4xl text-primary mt-4 shadow-md rounded-md'>Booting Hangar Now!!!</h1>
        </div>
    )
}

export default SplashLoader
