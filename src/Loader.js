import loaderDark from './img/loader_dark.gif'
import loaderLight from './img/loader_light.gif'

function Loader() {
    const userPreferredData = JSON.parse(localStorage.getItem('userPreferedData'))
    const targetLoader = userPreferredData['theme'] ? loaderDark : loaderLight
    return (
        <div className='flex flex-col items-center justify-center mt-32'>
            <img src={targetLoader} alt='Loading' className='mt-4 w-16 h-16 rounded-md shadow-md' />
            <h1 className='text-4xl text-primary mt-4'>Loading Now!!!</h1>
        </div>
    )
}

export default Loader
