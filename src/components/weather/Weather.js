import  { useState } from 'react'
import SidePane from './SidePane'
import WeatherBar from './WeatherBar'
import Dashboard from '../home/Dashboard'
import hangarFetch from '../../HangarFetch'
import Loader from '../../Loader'

function Weather() {
  const [weatherData, setWeatherData] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)

  const loadWeather = async (searchCity) => {
    if(searchCity !== ''){
      const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = process.env.REACT_APP_WEATHER_KEY
    let testURL = `${apiUrl}?q=${searchCity}&units=metric&appid=${apiKey}`;
    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    const weatherDataFromFetch = await hangarFetch(`weather-${searchCity}`, myRequest)
    if(weatherDataFromFetch !== undefined && weatherDataFromFetch.cod !== "404"){
      await setWeatherData(weatherDataFromFetch)
      setAlert(false)
    } else {
      setWeatherData('')
      setAlert(true)
    }
    setLoading(false)
  }
}

  const handleChange = (e) => {
    setAlert(false)
    setCity(e.target.value.toLowerCase())
    if(e.target.value === ''){
      setWeatherData('')
    }
  }

  const searchCity = () => {
    if(city !== ''){
      setLoading(true)
      loadWeather(city)
    } else{
      setAlert(true)
    }
  }

  const alertMessage = alert ? (<div className='flex flex-col text-center justify-center mt-20'>
  <h2 className='text-2xl text-red-600'>{city !== '' ? city.concat(' not available!!!') : 'City is Empty. Cannot Search.'} </h2>
  <h2 className='text-4xl text-primary'> {'Try to search for a different city weather!!!'} </h2>
  </div>) : null

  return (
    <>
      <div className='flex flex-row mt-24 mb-24 px-4 py-6 justify-center'>
          <SidePane
            handleChange={handleChange}
            searchCity={searchCity}
          />
         {!loading ? 
            weatherData !== '' ? (
              <div
            className='flex-auto flex flex-col py-4 px-12 justify-center mt-4'>
              <WeatherBar weatherData={weatherData} />
              </div>
            ) : null : <Loader />}
          {alertMessage}
          </div>
        <Dashboard />
    </>
  )
}

export default Weather
